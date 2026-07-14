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

export const thsThemeFundInflow = [
  { name: '芯片概念', amount: 813, change: 3.22, marketValue: '37.90万亿' },
  { name: '融资融券', amount: 690, change: 0.78, marketValue: '120.79万亿' },
  { name: '半导体', amount: 396, change: 6.52, marketValue: '15.15万亿' },
  { name: '存储芯片', amount: 376, change: 6.10, marketValue: '13.86万亿' },
  { name: '5G', amount: 356, change: 2.44, marketValue: '18.92万亿' },
  { name: '深股通', amount: 355, change: 0.71, marketValue: '44.54万亿' },
  { name: '汽车电子', amount: 349, change: 2.65, marketValue: '13.85万亿' },
  { name: '消费电子概念', amount: 331, change: 2.60, marketValue: '14.26万亿' },
  { name: '共封装光学(CPO)', amount: 325, change: 4.35, marketValue: '13.57万亿' },
  { name: '先进封装', amount: 299, change: 5.53, marketValue: '9.95万亿' },
]

export const thsThemeFundOutflow = [
  { name: '风电', amount: -55, change: 0.26, marketValue: '11.33万亿' },
  { name: '小金属概念', amount: -45, change: -0.52, marketValue: '6.02万亿' },
  { name: '高股息精选', amount: -43, change: -0.90, marketValue: '30.11万亿' },
  { name: '核电', amount: -28, change: 0.61, marketValue: '7.43万亿' },
  { name: '煤化工概念', amount: -25, change: -0.67, marketValue: '4.15万亿' },
  { name: '金属铜', amount: -25, change: -0.63, marketValue: '3.54万亿' },
  { name: '氢能源', amount: -22, change: 0.40, marketValue: '10.81万亿' },
  { name: '雅下水电概念', amount: -22, change: -0.94, marketValue: '2.39万亿' },
  { name: '电力', amount: -21, change: -0.18, marketValue: '3.71万亿' },
  { name: '黄金概念', amount: -20, change: -0.15, marketValue: '3.04万亿' },
]

export const eastMoneyThemeFlow = [
  { name: '电子', inflow: 438.80, outflowName: '电池技术', outflow: -159.27 },
  { name: '国产芯片', inflow: 397.01, outflowName: '锂电池概念', outflow: -131.83 },
  { name: '半导体概念', inflow: 341.41, outflowName: '电力设备', outflow: -96.76 },
  { name: '半导体', inflow: 318.68, outflowName: '固态电池', outflow: -93.41 },
  { name: '存储芯片', inflow: 294.62, outflowName: '有色金属', outflow: -91.43 },
  { name: '通信技术', inflow: 261.69, outflowName: '小金属概念', outflow: -78.36 },
  { name: '人工智能', inflow: 211.52, outflowName: '储能概念', outflow: -66.47 },
  { name: '算力概念', inflow: 203.05, outflowName: '风能', outflow: -60.65 },
  { name: '物联网', inflow: 199.44, outflowName: '光伏概念', outflow: -54.87 },
  { name: '5G概念', inflow: 194.89, outflowName: '新能源汽车', outflow: -50.92 },
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

// 大盘趋势数据（近10个交易日复盘对比）
export const marketTrendTableData = [
  { date: '6月26日', phase: '震荡期', forecast: '-', actual: '批量跌停', boardHeight: 3, limitUp: 109, firstLimit: 100, continued: 9, limitDown: 41, upRate: 45.70, turnover: '3.52万亿', volumeChange: -0.98, comment: '平量强分歧' },
  { date: '6月27日', phase: '震荡期', forecast: '强分歧', actual: '弱修复', boardHeight: 3, limitUp: 121, firstLimit: 106, continued: 15, limitDown: 16, upRate: 51.82, turnover: '3.44万亿', volumeChange: -2.27, comment: '缩量修复' },
  { date: '6月30日', phase: '震荡期', forecast: '弱转强', actual: '弱转强', boardHeight: 3, limitUp: 141, firstLimit: 120, continued: 21, limitDown: 7, upRate: 56.38, turnover: '3.27万亿', volumeChange: -6.94, comment: '大幅缩量' },
  { date: '7月1日', phase: '震荡期', forecast: '弱分歧', actual: '弱转强', boardHeight: 3, limitUp: 154, firstLimit: 128, continued: 24, limitDown: 8, upRate: 79.11, turnover: '2.88万亿', volumeChange: -12.14, comment: '爆量上涨' },
  { date: '7月2日', phase: '退潮期', forecast: '弱分歧', actual: '批量跌停', boardHeight: 4, limitUp: 91, firstLimit: 71, continued: 18, limitDown: 41, upRate: 41.16, turnover: '2.70万亿', volumeChange: -6.08, comment: '缩量退潮' },
  { date: '7月3日', phase: '退潮期', forecast: '批量跌停', actual: '弱修复', boardHeight: 5, limitUp: 105, firstLimit: 92, continued: 12, limitDown: 22, upRate: 70.05, turnover: '3.18万亿', volumeChange: 17.81, comment: '缩量修复' },
  { date: '7月6日', phase: '退潮期', forecast: '弱转强', actual: '强分歧', boardHeight: 4, limitUp: 66, firstLimit: 60, continued: 6, limitDown: 48, upRate: 34.63, turnover: '3.09万亿', volumeChange: -2.87, comment: '缩量强分歧' },
  { date: '7月7日', phase: '退潮期', forecast: '弱转强', actual: '弱修复', boardHeight: 3, limitUp: 73, firstLimit: 64, continued: 9, limitDown: 36, upRate: 38.12, turnover: '2.96万亿', volumeChange: -4.21, comment: '弱修复' },
  { date: '7月8日', phase: '退潮期', forecast: '弱修复', actual: '小幅上涨', boardHeight: 4, limitUp: 88, firstLimit: 75, continued: 13, limitDown: 21, upRate: 52.64, turnover: '3.04万亿', volumeChange: 2.70, comment: '缩量反弹' },
  { date: '7月9日', phase: '退潮期', forecast: '小幅上涨', actual: '弱分歧', boardHeight: 5, limitUp: 25, firstLimit: 15, continued: 10, limitDown: 5, upRate: 33.80, turnover: '3.09万亿', volumeChange: -2.87, comment: '退潮延续' },
]

// 情绪走势数据
export const emotionTrendData = Array.from({ length: 20 }, (_, i) => ({
  date: `07/${String(i + 1).padStart(2, '0')}`,
  limitUpRate: 50 + Math.random() * 40,
  sealRate: 60 + Math.random() * 30,
  boardRate: 30 + Math.random() * 50,
}))

// 上证指数日K数据
export const shDailyKData = [
  { date: '4-17', open: 4042, close: 4070, high: 4083, low: 4018, volume: 41 },
  { date: '4-21', open: 4062, close: 4054, high: 4104, low: 4038, volume: 45 },
  { date: '4-23', open: 4075, close: 4118, high: 4132, low: 4056, volume: 49 },
  { date: '4-25', open: 4128, close: 4195, high: 4216, low: 4115, volume: 58 },
  { date: '4-29', open: 4205, close: 4182, high: 4242, low: 4168, volume: 62 },
  { date: '5-06', open: 4190, close: 4248, high: 4258.86, low: 4178, volume: 66 },
  { date: '5-08', open: 4232, close: 4154, high: 4241, low: 4138, volume: 61 },
  { date: '5-12', open: 4148, close: 4092, high: 4176, low: 4078, volume: 59 },
  { date: '5-14', open: 4104, close: 4140, high: 4168, low: 4086, volume: 57 },
  { date: '5-16', open: 4132, close: 4110, high: 4150, low: 4088, volume: 55 },
  { date: '5-20', open: 4098, close: 4126, high: 4148, low: 4070, volume: 54 },
  { date: '5-22', open: 4118, close: 4058, high: 4130, low: 4037, volume: 52 },
  { date: '5-26', open: 4065, close: 4078, high: 4105, low: 4044, volume: 51 },
  { date: '5-28', open: 4074, close: 4042, high: 4086, low: 4012, volume: 50 },
  { date: '5-30', open: 4046, close: 3985, high: 4060, low: 3958, volume: 48 },
  { date: '6-03', open: 3972, close: 3948, high: 3996, low: 3927.85, volume: 46 },
  { date: '6-05', open: 3958, close: 4008, high: 4022, low: 3944, volume: 47 },
  { date: '6-09', open: 4018, close: 4056, high: 4072, low: 4001, volume: 50 },
  { date: '6-11', open: 4062, close: 4126, high: 4140, low: 4048, volume: 55 },
  { date: '6-13', open: 4138, close: 4086, high: 4158, low: 4065, volume: 58 },
  { date: '6-17', open: 4092, close: 4112, high: 4132, low: 4066, volume: 57 },
  { date: '6-19', open: 4108, close: 4068, high: 4124, low: 4040, volume: 54 },
  { date: '6-23', open: 4072, close: 4098, high: 4115, low: 4048, volume: 53 },
  { date: '6-25', open: 4102, close: 4055, high: 4128, low: 4028, volume: 51 },
  { date: '6-27', open: 4062, close: 4028, high: 4088, low: 3997, volume: 49 },
  { date: '6-30', open: 4020, close: 3992, high: 4044, low: 3962, volume: 47 },
  { date: '7-02', open: 3990, close: 3950, high: 4006, low: 3929, volume: 44 },
  { date: '7-04', open: 3942, close: 4036.59, high: 4058, low: 3905, volume: 62 },
]

export const shIntradayData = [
  { time: '09:30', price: 3977, volume: 304 },
  { time: '09:35', price: 3982, volume: 235 },
  { time: '09:45', price: 3972, volume: 180 },
  { time: '09:55', price: 3984, volume: 151 },
  { time: '10:05', price: 3976, volume: 126 },
  { time: '10:15', price: 3979, volume: 112 },
  { time: '10:25', price: 3971, volume: 98 },
  { time: '10:35', price: 3962, volume: 87 },
  { time: '10:45', price: 3953, volume: 82 },
  { time: '10:55', price: 3946, volume: 78 },
  { time: '11:05', price: 3937, volume: 74 },
  { time: '11:15', price: 3948, volume: 72 },
  { time: '11:25', price: 3966, volume: 70 },
  { time: '13:05', price: 3958, volume: 83 },
  { time: '13:15', price: 3974, volume: 95 },
  { time: '13:25', price: 3988, volume: 78 },
  { time: '13:35', price: 3996, volume: 85 },
  { time: '13:45', price: 4011, volume: 92 },
  { time: '13:55', price: 4018, volume: 88 },
  { time: '14:05', price: 4029, volume: 97 },
  { time: '14:15', price: 4036, volume: 101 },
  { time: '14:25', price: 4048, volume: 96 },
  { time: '14:35', price: 4065, volume: 112 },
  { time: '14:45', price: 4058, volume: 126 },
  { time: '14:55', price: 4036.59, volume: 172 },
]
