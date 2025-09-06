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
    content: "公司里来了一只小猫🐱",
    date: '2025-09-06 18:15',
    images: [
      'https://images.zerolovesea.top/blog/250906-16.jpeg',
    ],
  },
  {
    author: '马德里西语霸王',
    content: "最近入手了Switch2，电子ED的症状暂时得到了缓解。三周已经打通了宝可梦紫，接下来潜水员戴夫也快通了，同步还在打路易吉洋馆。",
    date: '2025-08-02 11:44',
  },
  {
    author: '马德里西语霸王',
    content: "DNN在工业推荐里的标准化操作：1. 对于所有特征，使用哈希映射成id。2. 对于每个id，使用embedding层映射成向量。3. 将所有向量拼接。4. 进入DNN。这样的范式，很早就出现在谷歌的Deep Neural Networks for Youtube Recommendations一文中。",
    date: '2025-08-02 11:29',
  },
  {
    author: '马德里西语霸王',
    content: "Today has been a pretty good day actually, i had a decent day at work, it was long, it felt longer than usual, the day was just going by a little too slow. But you know there's days that are like that some days just go by slow, some days go by fast. But whatever, we are off now.",
    date: '2025-07-15 22:00',
  },
  {
    author: '马德里西语霸王',
    content: '推荐算法能和CV一样给出确定性判断吗？答案是否定的：不像CV里图像识别的目标那么精确，推荐算法的结果是未知的，当观测到一个点击时，无法归因到是因为用户的点击倾向高，还是物料的质量好，还是因为某种巧合。',
    date: '2025-07-05 19:48',
  },
  {
    author: '马德里西语霸王',
    content: '科目二居然挂了，而且两次都死在侧方停车，阴沟翻船了属于是🫠好烦',
    date: '2025-07-02 15:35',
  },
  {
    author: '马德里西语霸王',
    content: '疲惫烦躁的一周 ',
    date: '2025-06-21 21:44',
    images: [
      'https://images.zerolovesea.top/blog/250621-1.jpeg',
    ],
  },
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