export type MediaType = 'anime' | 'book' | 'movie' | 'series' | 'game'
export type MediaState = 'done' | 'doing' | 'todo'

export interface MediaRecord {
  name: string
  creator?: string
  state?: MediaState
  date?: string
  note?: string
  lang?: string
}

export const anime: MediaRecord[] = [
  {
    name: '英雄联盟：双城之战',
    creator: 'Riot Games',
    date: '2021',
  }
]

export const book: MediaRecord[] = [
  {
    name: '博弈论',
    creator: '冯-诺依曼',
  },
  {
    name: '统计学习方法',
    creator: '李航',
  },
  {
    name: '互联网大厂推荐算法实战',
    creator: '赵传霖',
  },
  {
    name: '深度学习推荐系统',
    creator: '王喆',
  },
  {
    name: '贝叶斯的博弈-数学，思维与人工智能',
    creator: '黄黎原',
  },
  {
    name: '深入浅出Embedding：原理解析与应用实践',
    creator: '吴茂贵',
  },
]

export const movie: MediaRecord[] = [
  {
    name: '奥本海默',
    creator: '克里斯托弗·诺兰',
    date: '2023',
  },
  {
    name: '社交网络',
    creator: '大卫·芬奇',
    date: '2010',
  },
  {
    name: '模仿游戏',
    creator: '莫滕·泰杜姆',
    date: '2014',
  },
  {
    name: '爆裂鼓手',
    creator: '达米恩·查泽雷',
    date: '2014',
  },
  {
    name: '绿皮书',
    creator: '彼得·法雷利',
    date: '2018',
  },
  {
    name: '猫鼠游戏',
    creator: '史蒂文·斯皮尔伯格',
    date: '2002',
  },
  {
    name: '美丽心灵',
    creator: '朗·霍华德',
    date: '2001',
  },
  {
    name: '盗梦空间',
    creator: '克里斯托弗·诺兰',
    date: '2010',
  },
]

export const series: MediaRecord[] = [
  {
    name: '西部世界',
    date: '2016',
  },
  {
    name: 'Love, Death & Robots',
    date: '2019',
  },
  {
    name: '老友记',
    date: '1994',
  },
  {
    name: '琅琊榜',
    date: '2015',
  }
]

export const game: MediaRecord[] = [
  {
    name: '巫师三：狂猎',
    creator: 'CD Projekt Red',
    date: '2015',
  },
  {
    name: '赛博朋克2077',
    creator: 'CD Projekt Red',
    date: '2020',
  },
  {
    name: '最后生还者',
    creator: 'Naughty Dog',
    date: '2013',
  },
  {
    name: '最后生还者2',
    creator: 'Naughty Dog',
    date: '2020',
  },
  {
    name: '神秘海域4：盗贼遗产',
    creator: 'Naughty Dog',
    date: '2016',
  },
  {
    name: '对马岛之魂',
    creator: 'Sucker Punch Productions',
    date: '2021',
  },
  {
    name: '极限竞速：地平线4',
    creator: 'Playground Games',
    date: '2018',
  },
  {
    name: '极限竞速：地平线5',
    creator: 'Playground Games',
    date: '2021',
  },
  {
    name: '量子破碎',
    creator: 'Remedy Entertainment',
    date: '2016',
  },
  {
    name: '控制',
    creator: 'Remedy Entertainment',
    date: '2019',
  },
  {
    name: '光环：士官长合集',
    creator: '343 Industries',
    date: '2014',
  },
  {
    name: '光环：无限',
    creator: '343 Industries',
    date: '2021',
  },
  {
    name: '冰汽时代',
    creator: '11 bit studios',
    date: '2018',
  },
  {
    name: '这是我的战争',
    creator: '11 bit studios',
    date: '2014',
  },
  {
    name: '使命召唤4：现代战争',
    creator: 'Infinity Ward',
    date: '2007',
  },
  {
    name: '使命召唤6：现代战争2',
    creator: 'Infinity Ward',
    date: '2009',
  },
  {
    name: '使命召唤8：现代战争3',
    creator: 'Infinity Ward',
    date: '2011',
  },
  {
    name: '使命召唤7：黑色行动',
    creator: 'Treyarch',
    date: '2010',
  },
  {
    name: '使命召唤12：黑色行动2',
    creator: 'Treyarch',
    date: '2012',
  },
  {
    name: '使命召唤：现代战争',
    creator: 'Infinity Ward',
    date: '2019',
  },
]

export const media: Record<MediaType, MediaRecord[]> = {
  book,
  movie,
  series,
  anime,
  game,
}
