export interface IdeaRecord {
  author: string
  avatar?: string // 可选属性，头像可以不提供
  content: string
  date: string 
}

export const ideas: IdeaRecord[] = [
  {
    author: '马德里西语霸王',
    avatar: 'https://avatars.githubusercontent.com/u/59469010?v=4',
    content: '今天亏钱了😩',
    date: '2025-06-12 21:44', 
  },
  {
    author: '马德里西语霸王',
    avatar: 'https://avatars.githubusercontent.com/u/59469010?v=4',
    content: '新增了碎碎念的页面！',
    date: '2025-06-11 12:44', 
  },
  {
    author: '马德里西语霸王',
    avatar: 'https://avatars.githubusercontent.com/u/59469010?v=4',
    content: '新版博客上线辽',
    date: '2025-06-10 18:56', 
  },
]