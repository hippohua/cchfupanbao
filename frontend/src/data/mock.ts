// 所有静态数据

export const indexData = [
  { name: '上证', code: '000001', value: 2997.56, change: -0.93 },
  { name: '深证', code: '399001', value: 10649.05, change: -0.98 },
  { name: '创业', code: '399006', value: 1203.49, change: -0.86 },
  { name: '科创50', code: '000688', value: 1215.90, change: -1.36 },
  { name: '北证50', code: '899050', value: 1137.35, change: -1.66 },
]

export const limitUpLadder = [
  { board: 5, name: '赢通通讯', reason: '5G+通信', time: '09:25', seal: '2.1亿', concepts: ['5G', '通信'] },
  { board: 4, name: '湘邮科技', reason: '无人驾驶+智能物流', time: '09:30', seal: '1.8亿', concepts: ['无人驾驶', '智能物流'] },
  { board: 3, name: '新亚强', reason: '有机硅+半导体', time: '09:32', seal: '1.5亿', concepts: ['有机硅', '半导体'] },
  { board: 3, name: '光华科技', reason: 'PCB+锂电', time: '09:35', seal: '1.2亿', concepts: ['PCB', '锂电'] },
  { board: 3, name: '青岛金王', reason: '跨境电商+金融科技', time: '09:40', seal: '0.9亿', concepts: ['跨境电商', '金融科技'] },
  { board: 3, name: '罗欣药业', reason: '医药', time: '09:45', seal: '0.8亿', concepts: ['医药'] },
  { board: 2, name: '远大智能', reason: '工业母机', time: '09:25', seal: '0.6亿', concepts: ['工业母机'] },
  { board: 2, name: '显盈科技', reason: '消费电子', time: '09:30', seal: '0.5亿', concepts: ['消费电子'] },
  { board: 2, name: '英派斯', reason: '健身器材', time: '09:35', seal: '0.4亿', concepts: ['健身器材'] },
  { board: 2, name: '华菱线缆', reason: '智能电网', time: '09:38', seal: '0.4亿', concepts: ['智能电网'] },
  { board: 2, name: '恒银科技', reason: '金融科技', time: '09:42', seal: '0.3亿', concepts: ['金融科技'] },
]

export const shortMarketData = [
  { label: '涨停', value: '25家', color: 'red' as const },
  { label: '跌停', value: '5家', color: 'green' as const },
  { label: '非ST涨停', value: '22家', color: 'red' as const },
  { label: '非ST跌停', value: '3家', color: 'green' as const },
  { label: '一字板', value: '5家', color: 'red' as const },
  { label: 'T字板', value: '6家', color: 'orange' as const },
  { label: '炸板', value: '11家', color: 'green' as const },
  { label: '封板率', value: '69.44%', color: 'blue' as const },
  { label: '连板数', value: '10家', color: 'red' as const },
  { label: '最高连板', value: '5板', color: 'red' as const },
  { label: '昨涨停表现', value: '-1.16%', color: 'green' as const },
  { label: '昨连板表现', value: '-0.82%', color: 'green' as const },
]

export const sectorRanks = [
  { name: '电机 II', change: 3.47, limitUp: 2 },
  { name: '种植业与林业', change: 3.33, limitUp: 1 },
  { name: '贵金属', change: 3.25, limitUp: 1 },
  { name: '林业', change: 3.15, limitUp: 0 },
  { name: '电机 I', change: 2.98, limitUp: 1 },
  { name: '自动化设备', change: 2.87, limitUp: 2 },
  { name: '厨卫电器', change: 2.76, limitUp: 0 },
  { name: '汽车零部件', change: 2.65, limitUp: 3 },
  { name: '专用设备', change: 2.54, limitUp: 1 },
  { name: '通用设备', change: 2.43, limitUp: 1 },
]

export const sectorLimitUpRanks = [
  { name: '计算机应用', count: 8, change: 1.85 },
  { name: '电力设备', count: 5, change: 2.12 },
  { name: '化学制品', count: 4, change: 1.56 },
  { name: '专用设备', count: 3, change: 2.54 },
  { name: '汽车零部件', count: 3, change: 2.65 },
  { name: '通信设备', count: 3, change: 1.23 },
  { name: '自动化设备', count: 2, change: 2.87 },
  { name: '消费电子', count: 2, change: 1.45 },
  { name: '电机 II', count: 2, change: 3.47 },
  { name: '半导体', count: 2, change: 0.98 },
]

export const shortMarketCategories = [
  {
    title: '一字板',
    count: 5,
    items: [
      { name: '*ST和佳', code: '300273', price: 2.15, change: 20.01, reason: 'ST板块' },
      { name: '科达科技', code: '002816', price: 15.32, change: 10.01, reason: '5G+通信' },
      { name: '*ST银亿', code: '000981', price: 1.85, change: 5.11, reason: 'ST板块' },
      { name: '亚威股份', code: '002559', price: 8.92, change: 10.01, reason: '工业母机' },
      { name: '光华科技', code: '002741', price: 12.56, change: 10.02, reason: 'PCB+锂电' },
    ]
  },
  {
    title: 'T字板',
    count: 6,
    items: [
      { name: '赢通通讯', code: '002861', price: 18.45, change: 10.01, reason: '5G+通信' },
      { name: '湘邮科技', code: '600476', price: 22.30, change: 10.00, reason: '无人驾驶' },
      { name: '新亚强', code: '603155', price: 15.80, change: 10.02, reason: '有机硅' },
      { name: '远大智能', code: '002689', price: 4.52, change: 10.02, reason: '工业母机' },
      { name: '显盈科技', code: '301067', price: 28.60, change: 20.02, reason: '消费电子' },
      { name: '英派斯', code: '002899', price: 16.80, change: 10.02, reason: '健身器材' },
    ]
  },
  {
    title: '天地板',
    count: 0,
    items: []
  },
  {
    title: '地天板',
    count: 0,
    items: []
  },
  {
    title: '反包',
    count: 6,
    items: [
      { name: '大位科技', code: '600728', price: 8.45, change: 10.02, reason: '数据中心' },
      { name: '国药现代', code: '600420', price: 12.30, change: 10.01, reason: '医药' },
      { name: '中科磁业', code: '301141', price: 35.60, change: 20.01, reason: '稀土永磁' },
      { name: '恒银科技', code: '603106', price: 6.80, change: 10.02, reason: '金融科技' },
      { name: '华菱线缆', code: '001208', price: 9.50, change: 10.02, reason: '智能电网' },
      { name: '青岛金王', code: '002094', price: 7.20, change: 10.01, reason: '跨境电商' },
    ]
  },
  {
    title: '大面股',
    count: 5,
    items: [
      { name: '某股A', code: '000001', price: 12.50, change: -15.20, reason: '冲高回落' },
      { name: '某股B', code: '000002', price: 8.30, change: -12.80, reason: '炸板回落' },
      { name: '某股C', code: '000003', price: 15.60, change: -11.50, reason: '高开低走' },
      { name: '某股D', code: '000004', price: 6.80, change: -10.20, reason: '冲高回落' },
      { name: '某股E', code: '000005', price: 22.40, change: -9.80, reason: '炸板回落' },
    ]
  },
  {
    title: '大长腿',
    count: 4,
    items: [
      { name: '某股F', code: '000006', price: 10.20, change: 8.50, reason: '大长腿' },
      { name: '某股G', code: '000007', price: 15.80, change: 7.20, reason: '大长腿' },
      { name: '某股H', code: '000008', price: 8.60, change: 6.80, reason: '大长腿' },
      { name: '某股I', code: '000009', price: 12.40, change: 5.50, reason: '大长腿' },
    ]
  },
  {
    title: '断板',
    count: 22,
    items: [
      { name: '某股J', code: '000010', price: 18.50, change: -2.30, reason: '断板' },
      { name: '某股K', code: '000011', price: 9.80, change: -3.50, reason: '断板' },
      { name: '某股L', code: '000012', price: 22.60, change: -1.80, reason: '断板' },
      { name: '某股M', code: '000013', price: 15.40, change: -4.20, reason: '断板' },
      { name: '某股N', code: '000014', price: 7.80, change: -2.10, reason: '断板' },
    ]
  },
]

export const dragonTigerData = {
  institution: [
    { name: '大位科技', code: '600728', buy: 0, sell: 7985.87, net: -7985.87, reason: '数据中心' },
    { name: '国药现代', code: '600420', buy: 5230.45, sell: 1260.13, net: 3970.32, reason: '医药' },
    { name: '中科磁业', code: '301141', buy: 3420.80, sell: 5343.80, net: -1923.00, reason: '稀土永磁' },
    { name: '恒银科技', code: '603106', buy: 1850.20, sell: 2100.50, net: -250.30, reason: '金融科技' },
    { name: '华菱线缆', code: '001208', buy: 1200.60, sell: 850.40, net: 350.20, reason: '智能电网' },
  ],
  youzi: [
    { name: '光华科技', code: '002741', buy: 5230.00, sell: 16350.00, net: -11120.00, reason: 'PCB+锂电' },
    { name: '中科磁业', code: '301141', buy: 4200.50, sell: 6123.50, net: -1923.00, reason: '稀土永磁' },
    { name: '赢通通讯', code: '002861', buy: 3850.30, sell: 2100.20, net: 1750.10, reason: '5G+通信' },
    { name: '湘邮科技', code: '600476', buy: 2100.60, sell: 3200.80, net: -1100.20, reason: '无人驾驶' },
    { name: '新亚强', code: '603155', buy: 1850.40, sell: 950.30, net: 900.10, reason: '有机硅' },
  ]
}

// 大盘走势数据（模拟最近20个交易日）
export const marketTrendData = Array.from({ length: 20 }, (_, i) => {
  const up = Math.random() > 0.45
  return {
    date: `07/${String(i + 1).padStart(2, '0')}`,
    upCount: up ? Math.floor(2000 + Math.random() * 1500) : Math.floor(500 + Math.random() * 1000),
    downCount: up ? Math.floor(500 + Math.random() * 1000) : Math.floor(2000 + Math.random() * 1500),
  }
})

// 情绪走势数据
export const emotionTrendData = Array.from({ length: 20 }, (_, i) => ({
  date: `07/${String(i + 1).padStart(2, '0')}`,
  limitUpRate: 50 + Math.random() * 40,
  sealRate: 60 + Math.random() * 30,
  boardRate: 30 + Math.random() * 50,
}))

// K线数据
export const klineData = Array.from({ length: 30 }, (_, i) => {
  const base = 3000
  const open = base + (Math.random() - 0.5) * 100
  const close = open + (Math.random() - 0.5) * 80
  const high = Math.max(open, close) + Math.random() * 30
  const low = Math.min(open, close) - Math.random() * 30
  const volume = Math.floor(Math.random() * 5000) + 1000
  const up = close >= open
  return { date: i, open, close, high, low, volume, up }
})
