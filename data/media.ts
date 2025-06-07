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
    name: 'Factorio',
    creator: 'Wube Software',
    date: '2013',
  },
  {
    name: 'Zelda: Breath of the Wild',
    creator: 'Nintendo',
    date: '2017',
  },
  {
    name: 'Pokémon Sword',
    creator: 'Game Freak',
    date: '2019',
  },
  {
    name: 'Pokémon Brilliant Diamond',
    creator: 'Game Freak',
    date: '2021',
  },
  {
    name: 'Pokémon Legends Arceus',
    creator: 'Game Freak',
    date: '2022',
  },
  {
    name: 'Fire Emblem: Three Houses',
    creator: 'Intelligent Systems',
    date: '2019',
  },
  {
    name: 'Life is Strange',
    creator: 'Dontnod Entertainment',
    date: '2015',
  },
  {
    name: 'Catherine Full Body',
    creator: 'Atlus',
    date: '2021',
  },
  {
    name: 'Disco Elysium',
    creator: 'Zachary Hill',
    date: '2019',
  },
  {
    name: '13 Sentinels: Aegis Rim',
    creator: 'Atlus',
    date: '2021',
  },
  {
    name: 'Octopath Traveler',
    creator: 'Square Enix',
    date: '2018',
  },
  {
    name: 'To the Moon',
    creator: 'Freebird Games',
    date: '2011',
  },
  {
    name: 'Undertale',
    creator: 'Toby Fox',
    date: '2015',
  },
  {
    name: 'Just Dance 2025',
    creator: 'Ubisoft',
    date: '2024',
  },
]

export const media: Record<MediaType, MediaRecord[]> = {
  book,
  movie,
  series,
  anime,
  game,
}
