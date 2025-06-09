// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
import { remove } from 'diacritics'

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

export function slugify(str: string): string {
  return (
    remove(str)
      .replace(rControl, '')
      .replace(rSpecial, '-') // 替换特殊字符
      .replace(/-{2,}/g, '-') // 移除连续的分隔符
      .replace(/^-+|-+$/g, '') // 移除前后多余的分隔符
      .replace(/^(\d)/, '_$1') // 确保不以数字开头
      .toLowerCase()
  )
}
