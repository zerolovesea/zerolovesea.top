export interface IdeaRecord {
  author: string
  avatar?: string
  content: string
  date: string 
  images?: string[]
}

export const ideas: IdeaRecord[] = [
  {
    author: '马德里西语霸王',
    content: 'alist连不上阿里云盘了 结果发现是项目卖给无良公司了 裂开',
    date: '2025-06-15 20:12', 
    images: [
      'https://images.zerolovesea.top/blog/250615-1.png',
    ],
  },
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
    content: '新版博客上线辽 使用了Vue3 + UNOCSS <b style="color:#D777B1;">以及最最重要的ChatGPT</b>！😋',
    date: '2025-06-10 18:56', 
  },
]