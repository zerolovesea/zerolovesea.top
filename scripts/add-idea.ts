import fs from 'node:fs/promises'
import path from 'node:path'
import prompts from 'prompts'

function formatNow(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
}

async function resolveContent(argv: string[]): Promise<string> {
  const contentFromArgs = argv.join(' ').trim()
  if (contentFromArgs)
    return contentFromArgs

  const res = await prompts({
    type: 'text',
    name: 'content',
    message: '输入 idea 内容',
    validate: value => value.trim() ? true : '内容不能为空',
  })

  return (res.content || '').trim()
}

async function run() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const contentArgs = args.filter(arg => arg !== '--dry-run')
  const content = await resolveContent(contentArgs)

  if (!content) {
    console.error('未提供内容，已取消。')
    process.exit(1)
  }

  const file = path.resolve(process.cwd(), 'data/ideas.ts')
  const source = await fs.readFile(file, 'utf8')
  const marker = 'export const ideas: IdeaRecord[] = ['
  const markerIndex = source.indexOf(marker)

  if (markerIndex < 0) {
    console.error('未找到 ideas 数组定义，终止。')
    process.exit(1)
  }

  const insertPos = markerIndex + marker.length
  const entry = `\n  {\n    author: '马德里西语霸王',\n    content: ${JSON.stringify(content)},\n    date: '${formatNow()}',\n  },`
  const output = `${source.slice(0, insertPos)}${entry}${source.slice(insertPos)}`

  if (!dryRun)
    await fs.writeFile(file, output, 'utf8')

  console.log(dryRun ? 'Dry run: 未写入文件。' : '已写入 data/ideas.ts')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
