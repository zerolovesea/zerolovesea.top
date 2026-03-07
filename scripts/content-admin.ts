import fs from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

type JsonRecord = Record<string, unknown>

const cwd = process.cwd()
const ideasFile = path.resolve(cwd, 'data/ideas.ts')
const pagesDir = path.resolve(cwd, 'pages')
const avatarFile = path.resolve(cwd, 'public/avatar.webp')

function formatDateTime(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

function parseDateInput(input?: string): Date {
  const raw = (input || '').trim()
  if (!raw)
    return new Date()

  const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const dateTime = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/)
  if (!dateOnly && !dateTime)
    throw new Error('日期格式必须是 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss')

  const y = Number.parseInt((dateOnly?.[1] || dateTime?.[1])!, 10)
  const mm = Number.parseInt((dateOnly?.[2] || dateTime?.[2])!, 10)
  const d = Number.parseInt((dateOnly?.[3] || dateTime?.[3])!, 10)
  const hh = Number.parseInt(dateTime?.[4] || '0', 10)
  const mi = Number.parseInt(dateTime?.[5] || '0', 10)
  const ss = Number.parseInt(dateTime?.[6] || '0', 10)
  const dt = new Date(y, mm - 1, d, hh, mi, ss)
  if (
    dt.getFullYear() !== y
    || dt.getMonth() !== mm - 1
    || dt.getDate() !== d
    || dt.getHours() !== hh
    || dt.getMinutes() !== mi
    || dt.getSeconds() !== ss
  ) {
    throw new Error('日期不合法')
  }
  return dt
}

function formatDay(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  return dd
}

function parseArg(name: string, fallback: string): string {
  const idx = process.argv.indexOf(name)
  if (idx !== -1 && process.argv[idx + 1])
    return process.argv[idx + 1]
  return fallback
}

function hasArg(name: string): boolean {
  return process.argv.includes(name)
}

function htmlEscape(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}

function estimateDuration(content: string): string {
  const zhChars = (content.match(/[\u3400-\u9FFF]/g) || []).length
  const enWords = (content.replace(/```[\s\S]*?```/g, ' ').match(/\w+/g) || []).length
  const minutes = Math.max(1, Math.ceil(zhChars / 300 + enWords / 200))
  return `${minutes}min`
}

function parseTags(input?: string): string[] {
  return (input || '')
    .split(/\r?\n|,/g)
    .map(i => i.trim())
    .filter(Boolean)
}

function sendJson(res: any, code: number, payload: JsonRecord) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

async function sendAvatar(res: any) {
  try {
    const bin = await fs.readFile(avatarFile)
    res.writeHead(200, {
      'Content-Type': 'image/webp',
      'Cache-Control': 'no-store',
    })
    res.end(bin)
  }
  catch {
    sendJson(res, 404, { error: 'avatar.webp not found in public/' })
  }
}

async function readBody(req: any): Promise<JsonRecord> {
  return await new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString('utf8')
      if (body.length > 1024 * 1024)
        reject(new Error('Body too large'))
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      }
      catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

async function appendIdea(data: {
  content: string
  author?: string
  avatar?: string
  images?: string[]
}) {
  const source = await fs.readFile(ideasFile, 'utf8')
  const marker = 'export const ideas: IdeaRecord[] = ['
  const markerIndex = source.indexOf(marker)

  if (markerIndex < 0)
    throw new Error('未找到 ideas 数组定义')

  const author = data.author?.trim() || '马德里西语霸王'
  const content = data.content.trim()
  const avatar = data.avatar?.trim()
  const images = (data.images || []).map(i => i.trim()).filter(Boolean)
  const date = formatDateTime()

  const extraLines: string[] = []
  if (avatar)
    extraLines.push(`    avatar: ${JSON.stringify(avatar)},`)
  if (images.length) {
    extraLines.push('    images: [')
    for (const image of images)
      extraLines.push(`      ${JSON.stringify(image)},`)
    extraLines.push('    ],')
  }

  const entry
    = `\n  {\n`
      + `    author: ${JSON.stringify(author)},\n`
      + `    content: ${JSON.stringify(content)},\n`
      + `    date: '${date}',\n`
      + `${extraLines.length ? `${extraLines.join('\n')}\n` : ''}`
      + '  },'

  const insertPos = markerIndex + marker.length
  const output = `${source.slice(0, insertPos)}${entry}${source.slice(insertPos)}`
  await fs.writeFile(ideasFile, output, 'utf8')
  return { date }
}

async function createMarkdownPage(data: {
  title: string
  content: string
  date?: string
  tags?: string[]
  categories?: string
  excerpt?: string
  lang?: string
  description?: string
  overwrite?: boolean
}) {
  const parsedDate = parseDateInput(data.date)
  const year = String(parsedDate.getFullYear())
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const dayStamp = formatDay(parsedDate)
  const targetDir = path.resolve(pagesDir, 'zh', year, month)
  await fs.mkdir(targetDir, { recursive: true })

  const files = await fs.readdir(targetDir, { withFileTypes: true })
  const usedNums = files
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .map((name) => {
      const match = name.match(new RegExp(`^${dayStamp}-(\\d+)\\.md$`))
      return match ? Number.parseInt(match[1], 10) : undefined
    })
    .filter((n): n is number => Number.isInteger(n) && n > 0)
  const nextNum = usedNums.length ? Math.max(...usedNums) + 1 : 1
  const filename = `${dayStamp}-${nextNum}.md`
  const absPath = path.resolve(targetDir, filename)

  if (!data.overwrite) {
    try {
      await fs.access(absPath)
      throw new Error(`文件已存在: pages/zh/${year}/${month}/${filename}`)
    }
    catch {
      // file not exists
    }
  }

  const frontmatter: string[] = ['---']
  frontmatter.push(`title: ${JSON.stringify(data.title.trim())}`)
  frontmatter.push(`date: ${JSON.stringify(formatDateTime(parsedDate))}`)
  if (data.tags?.length) {
    frontmatter.push('tags:')
    for (const tag of data.tags)
      frontmatter.push(`  - ${JSON.stringify(tag)}`)
  }
  if (data.categories?.trim())
    frontmatter.push(`categories: ${JSON.stringify(data.categories.trim())}`)
  if (data.excerpt?.trim())
    frontmatter.push(`excerpt: ${JSON.stringify(data.excerpt.trim())}`)
  if (data.lang?.trim())
    frontmatter.push(`lang: ${JSON.stringify(data.lang.trim())}`)
  frontmatter.push(`duration: ${JSON.stringify(estimateDuration(data.content))}`)
  if (data.description?.trim())
    frontmatter.push(`description: ${JSON.stringify(data.description.trim())}`)
  frontmatter.push('---', '')

  const markdown = `${frontmatter.join('\n')}${data.content.trim()}\n`
  await fs.writeFile(absPath, markdown, 'utf8')
  return { relativePath: `pages/zh/${year}/${month}/${filename}` }
}

function adminHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/avatar.webp" type="image/webp" />
  <title>Content Admin</title>
  <style>
    :root {
      --bg: #fff;
      --fg: #374151;
      --muted: #6b7280;
      --card: #fff;
      --line: #e5e7eb;
      --line-strong: #d1d5db;
      --accent: #4b5563;
      --ok: #166534;
      --err: #b91c1c;
    }
    html.dark {
      --bg: #050505;
      --fg: #e5e7eb;
      --muted: #9ca3af;
      --card: #0f0f0f;
      --line: #1f2937;
      --line-strong: #374151;
      --accent: #d1d5db;
      --ok: #4ade80;
      --err: #f87171;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: var(--bg); color: var(--fg); }
    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      transition: background-color .2s ease, color .2s ease;
    }
    .wrap { max-width: 1040px; margin: 0 auto; padding: 24px 20px 40px; }
    .card {
      background: color-mix(in srgb, var(--card) 92%, transparent);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .hero { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 999px;
      border: 1px solid var(--line-strong);
      object-fit: cover;
    }
    h1 { margin: 0; font-size: 1.25rem; font-weight: 650; letter-spacing: .01em; }
    h2 { margin: 0 0 10px; font-size: 1.05rem; font-weight: 600; color: var(--fg); }
    p.meta { margin: 4px 0 0; color: var(--muted); font-size: 13px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; }
    .field { margin-bottom: 10px; }
    label { display: block; font-size: 13px; margin-bottom: 6px; color: var(--muted); }
    input, textarea {
      width: 100%;
      background: transparent;
      color: inherit;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 9px 11px;
      font: inherit;
      outline: none;
      transition: border-color .15s ease, background-color .15s ease;
    }
    input:focus, textarea:focus {
      border-color: var(--line-strong);
      background: color-mix(in srgb, var(--card) 80%, var(--bg));
    }
    textarea { min-height: 110px; resize: vertical; }
    button {
      background: transparent;
      color: var(--accent);
      border: 1px solid var(--line-strong);
      border-radius: 10px;
      padding: 9px 14px;
      font: inherit;
      cursor: pointer;
      transition: all .15s ease;
    }
    button:hover {
      border-color: var(--accent);
      color: var(--fg);
      transform: translateY(-1px);
    }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .checkbox-row { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 13px; }
    .checkbox-row input { width: auto; }
    .status {
      margin-top: 8px;
      font-size: 13px;
      white-space: pre-wrap;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid transparent;
    }
    .ok {
      color: var(--ok);
      border-color: color-mix(in srgb, var(--ok) 35%, transparent);
      background: color-mix(in srgb, var(--ok) 10%, transparent);
    }
    .err {
      color: var(--err);
      border-color: color-mix(in srgb, var(--err) 35%, transparent);
      background: color-mix(in srgb, var(--err) 10%, transparent);
    }
    code.inline {
      font-family: "DM Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: 12px;
      color: var(--muted);
      border: 1px solid var(--line);
      padding: 2px 6px;
      border-radius: 6px;
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .wrap { padding: 16px 14px 26px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="hero">
        <img class="avatar" src="/avatar.webp" alt="avatar" />
        <div>
          <h1>Content Admin</h1>
          <p class="meta">管理 ideas 与 pages markdown</p>
        </div>
      </div>
      <p class="meta">Project: <code class="inline">${htmlEscape(cwd)}</code></p>
    </div>

    <div class="grid">
      <div class="card">
        <h2>新增 Idea</h2>
        <form id="idea-form">
          <div class="field">
            <label>作者</label>
            <input name="author" value="马德里西语霸王" />
          </div>
          <div class="field">
            <label>内容</label>
            <textarea name="content" required placeholder="输入 idea 内容"></textarea>
          </div>
          <div class="field">
            <label>头像 URL（可选）</label>
            <input name="avatar" placeholder="https://..." />
          </div>
          <div class="field">
            <label>图片 URL（可选，多行）</label>
            <textarea name="images" placeholder="每行一个 URL"></textarea>
          </div>
          <button type="submit">写入 data/ideas.ts</button>
          <div id="idea-status" class="status"></div>
        </form>
      </div>

      <div class="card">
        <h2>新增 Markdown 页面</h2>
        <form id="page-form">
          <div class="field">
            <label>标题</label>
            <input name="title" required />
          </div>
          <div class="field">
            <label>日期（默认当前时间，格式 YYYY-MM-DD HH:mm:ss）</label>
            <input name="date" placeholder="2026-03-07 12:18:41" />
          </div>
          <p class="meta">路径自动生成：<code class="inline">pages/zh/YYYY/MM/DD-N.md</code></p>
          <div class="field">
            <label>tags（可选，逗号或换行分隔）</label>
            <textarea name="tags" placeholder="随笔, 生活"></textarea>
          </div>
          <div class="field">
            <label>categories（可选）</label>
            <input name="categories" placeholder="随笔" />
          </div>
          <div class="field">
            <label>excerpt（可选）</label>
            <input name="excerpt" placeholder="总结一下2024年。" />
          </div>
          <div class="field">
            <label>lang（默认 zh）</label>
            <input name="lang" value="zh" />
          </div>
          <div class="field">
            <label>描述（可选）</label>
            <input name="description" />
          </div>
          <div class="field">
            <label>Markdown 内容</label>
            <textarea name="content" required placeholder="# 开始写正文"></textarea>
          </div>
          <div class="field">
            <label class="checkbox-row"><input type="checkbox" name="overwrite" /> 允许覆盖已有文件</label>
          </div>
          <button type="submit">写入 pages/*.md</button>
          <div id="page-status" class="status"></div>
        </form>
      </div>
    </div>
  </div>

  <script>
    ;(function () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.add('dark')
    })()

    function setStatus(el, ok, text) {
      el.className = 'status ' + (ok ? 'ok' : 'err')
      el.textContent = text
    }

    async function postJSON(url, payload) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || ('HTTP ' + res.status))
      return data
    }

    document.getElementById('idea-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const form = e.currentTarget
      const status = document.getElementById('idea-status')
      const fd = new FormData(form)
      const images = String(fd.get('images') || '')
        .split(/\\r?\\n/)
        .map(s => s.trim())
        .filter(Boolean)
      const payload = {
        author: String(fd.get('author') || ''),
        content: String(fd.get('content') || ''),
        avatar: String(fd.get('avatar') || ''),
        images,
      }
      try {
        const data = await postJSON('/api/ideas', payload)
        setStatus(status, true, '写入成功\\n时间: ' + data.date)
        form.reset()
        form.author.value = '马德里西语霸王'
      } catch (err) {
        setStatus(status, false, '写入失败\\n' + err.message)
      }
    })

    document.getElementById('page-form').addEventListener('submit', async (e) => {
      e.preventDefault()
      const form = e.currentTarget
      const status = document.getElementById('page-status')
      const fd = new FormData(form)
      const payload = {
        title: String(fd.get('title') || ''),
        date: String(fd.get('date') || ''),
        tags: String(fd.get('tags') || ''),
        categories: String(fd.get('categories') || ''),
        excerpt: String(fd.get('excerpt') || ''),
        lang: String(fd.get('lang') || ''),
        description: String(fd.get('description') || ''),
        content: String(fd.get('content') || ''),
        overwrite: Boolean(fd.get('overwrite')),
      }
      try {
        const data = await postJSON('/api/pages', payload)
        setStatus(status, true, '写入成功\\n文件: ' + data.path + '\\n预计阅读时长: ' + data.duration)
        form.reset()
        form.lang.value = 'zh'
        form.date.value = getNowString()
      } catch (err) {
        setStatus(status, false, '写入失败\\n' + err.message)
      }
    })

    function getNowString() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = String(dt.getMonth() + 1).padStart(2, '0')
      const d = String(dt.getDate()).padStart(2, '0')
      const hh = String(dt.getHours()).padStart(2, '0')
      const mm = String(dt.getMinutes()).padStart(2, '0')
      const ss = String(dt.getSeconds()).padStart(2, '0')
      return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    document.querySelector('#page-form input[name="date"]').value = getNowString()
  </script>
</body>
</html>`
}

async function main() {
  if (hasArg('--help') || hasArg('-h')) {
    console.log('Usage: pnpm content-admin [--host 127.0.0.1] [--port 4321]')
    process.exit(0)
  }

  const host = parseArg('--host', '127.0.0.1')
  const port = Number.parseInt(parseArg('--port', '4321'), 10)
  if (Number.isNaN(port) || port <= 0) {
    console.error('Invalid port')
    process.exit(1)
  }

  const server = createServer(async (req, res) => {
    try {
      const method = req.method || 'GET'
      const url = new URL(req.url || '/', `http://${host}:${port}`)

      if (method === 'GET' && url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' })
        res.end(adminHtml())
        return
      }

      if (method === 'GET' && url.pathname === '/avatar.webp')
        return sendAvatar(res)

      if (method === 'POST' && url.pathname === '/api/ideas') {
        const body = await readBody(req)
        const content = String(body.content || '').trim()
        if (!content)
          return sendJson(res, 400, { error: 'content 不能为空' })

        const result = await appendIdea({
          content,
          author: String(body.author || ''),
          avatar: String(body.avatar || ''),
          images: Array.isArray(body.images) ? body.images.map(String) : [],
        })
        return sendJson(res, 200, { ok: true, date: result.date })
      }

      if (method === 'POST' && url.pathname === '/api/pages') {
        const body = await readBody(req)
        const title = String(body.title || '').trim()
        const content = String(body.content || '').trim()
        if (!title || !content)
          return sendJson(res, 400, { error: 'title/content 不能为空' })

        const result = await createMarkdownPage({
          title,
          content,
          date: String(body.date || ''),
          tags: parseTags(String(body.tags || '')),
          categories: String(body.categories || ''),
          excerpt: String(body.excerpt || ''),
          lang: String(body.lang || 'zh'),
          description: String(body.description || ''),
          overwrite: Boolean(body.overwrite),
        })

        return sendJson(res, 200, { ok: true, path: result.relativePath, duration: estimateDuration(content) })
      }

      return sendJson(res, 404, { error: 'Not found' })
    }
    catch (error: any) {
      const message = error?.message || 'Unknown error'
      const code = message.includes('已存在') || message.includes('不合法') || message.includes('越界') ? 400 : 500
      return sendJson(res, code, { error: message })
    }
  })

  server.listen(port, host, () => {
    console.log(`Content admin running at http://${host}:${port}`)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
