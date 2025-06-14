export interface IdeaRecord {
  author: string
  avatar?: string
  content: string
  date: string 
}

export const ideas: IdeaRecord[] = [
  {
    author: '马德里西语霸王',
    content: '下了一周的雨 今天打球被暴虐 🤤',
    date: '2025-06-13 21:44', 
  },
  {
    author: '马德里西语霸王',
    content: '新增了碎碎念的页面！',
    date: '2025-06-11 12:44', 
  },
  {
    author: '马德里西语霸王',
    content: '新版博客上线辽 使用了Vue3 + TailwindCSS + UNOCSS <b style="color:#D777B1;">以及最最重要的ChatGPT</b>！😋',
    date: '2025-06-10 18:56', 
  },
]