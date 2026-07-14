import { useState, type ReactNode } from 'react'
import { Activity, BarChart3, CandlestickChart, CloudSun, ExternalLink, RotateCw } from 'lucide-react'
import {
  indexData, limitUpLadder, shortMarketData, sectorRanks, sectorLimitUpRanks,
  shortMarketCategories, dragonTigerData, marketTrendTableData, emotionTrendData, shDailyKData, shIntradayData
} from '../data/mock'

export default function Home() {
  return (
    <div className="pt-11 pl-44 pr-4 pb-8 min-h-screen bg-[#f2f3f5]">
      {/* 指数卡片 */}
      <IndexCards />

      {/* 主内容区：涨跌+K线+走势 | 连板天梯+短线数据 */}
      <div className="grid grid-cols-12 gap-3 mt-3">
        <div className="col-span-7 space-y-3">
          <MarketUpDown />
          <IndexCharts />
          <MarketTrendChart />
        </div>
        <div className="col-span-5 space-y-3">
          <LimitUpLadderTable />
          <ShortMarketStats />
        </div>
      </div>

      {/* 情绪走势 */}
      <EmotionTrendChart />

      {/* 板块排名 */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <SectorRankTable />
        <SectorLimitUpTable />
      </div>

      {/* 复盘海报 */}
      <PosterSection />

      {/* 短线市场 */}
      <ShortMarketSection />

      {/* 龙虎榜 */}
      <DragonTigerSection />
    </div>
  )
}

// ============ 指数卡片 ============
function IndexCards() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {indexData.map((idx) => (
        <div key={idx.code} className="card-fpb p-3 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">{idx.name}</div>
              <div className="text-xs text-gray-400">{idx.code}</div>
            </div>
            <div className={`text-lg font-bold ${idx.change >= 0 ? 'text-up' : 'text-down'}`}>
              {idx.value.toFixed(2)}
            </div>
          </div>
          <div className={`text-right text-sm mt-1 ${idx.change >= 0 ? 'text-up' : 'text-down'}`}>
            {idx.change >= 0 ? '+' : ''}{idx.change}%
          </div>
        </div>
      ))}
    </div>
  )
}

// ============ 涨跌家数 ============
function MarketUpDown() {
  const up = 1530
  const down = 2790
  const flat = 205
  const total = up + down + flat
  const upPctNum = up / total * 100
  const downPctNum = down / total * 100
  const flatPctNum = flat / total * 100
  const upPct = upPctNum.toFixed(1)
  const downPct = downPctNum.toFixed(1)
  const flatPct = flatPctNum.toFixed(1)
  const shIndex = indexData.find((idx) => idx.code === '000001') || indexData[0]
  const limitUp = Number(shortMarketData.find((item) => item.label === '涨停')?.value.replace(/\D/g, '') || 0)
  const limitDown = Number(shortMarketData.find((item) => item.label === '跌停')?.value.replace(/\D/g, '') || 0)
  const sealRate = Number(shortMarketData.find((item) => item.label === '封板率')?.value.replace('%', '') || 0)
  const hotScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(upPctNum * 0.45 + sealRate * 0.28 + limitUp * 0.35 - limitDown * 0.8 + (shIndex.change >= 0 ? 7 : -7))
    )
  )
  const marketStage = hotScore >= 75 ? '高潮期' : hotScore >= 58 ? '回暖期' : hotScore >= 42 ? '震荡期' : '退潮期'
  const stageDescription = {
    高潮期: '指数与赚钱效应共振，短线情绪高位活跃，留意一致后的分歧。',
    回暖期: '指数企稳，涨停与封板率改善，适合围绕主线做强弱切换。',
    震荡期: '多空拉锯，局部题材有表现，仓位和节奏比方向更重要。',
    退潮期: '指数高开后承压，下跌家数占优，短线情绪转弱，优先控制回撤。',
  }[marketStage]
  const scoreColor = hotScore >= 58 ? 'text-up' : hotScore >= 42 ? 'text-orange-500' : 'text-slate-900'

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb flex items-center gap-1.5">
          <CloudSun size={15} className="text-[#e4393c]" />
          大盘天气
        </span>
        <RotateCw size={13} className="text-gray-300" />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white">
                {marketStage}
              </span>
              <span className="text-xs text-gray-600 truncate">{stageDescription}</span>
            </div>
            <div className="grid grid-cols-5 gap-x-5 gap-y-1 text-xs text-gray-500">
              <span>上证：<b className={shIndex.change >= 0 ? 'text-up' : 'text-down'}>{shIndex.value.toFixed(2)} {shIndex.change >= 0 ? '+' : ''}{shIndex.change.toFixed(2)}%</b></span>
              <span>上涨：<b className="text-up">{up}</b></span>
              <span>跌停：<b className="text-down">{limitDown}</b></span>
              <span>涨停：<b className="text-up">{limitUp}</b></span>
              <span>封板率：<b className={sealRate >= 60 ? 'text-up' : 'text-down'}>{sealRate.toFixed(2)}%</b></span>
              <span>下跌：<b className="text-down">{down}</b></span>
              <span>平盘：<b className="text-gray-500">{flat}</b></span>
              <span className="col-span-3">量能：<b className="text-slate-900">3.09万亿</b> <b className="text-down">(-2.87%，缩量913亿)</b></span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className={`text-[30px] leading-8 font-bold font-mono ${scoreColor}`}>{hotScore}</div>
            <div className="text-xs text-gray-400 mt-1">市场热度</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>上涨 <span className="text-up font-bold text-sm">{up}</span> 只</span>
          <span>平盘 <span className="text-gray-400 font-bold text-sm">{flat}</span> 只</span>
          <span>下跌 <span className="text-down font-bold text-sm">{down}</span> 只</span>
        </div>
        <div className="h-6 flex rounded overflow-hidden">
          <div className="bg-up-light flex items-center justify-center text-xs text-up font-medium" style={{ width: `${upPct}%` }}>{upPct}%</div>
          <div className="bg-gray-100 flex items-center justify-center text-xs text-gray-500" style={{ width: `${flatPct}%` }}>{flatPct}%</div>
          <div className="bg-down-light flex items-center justify-center text-xs text-down font-medium" style={{ width: `${downPct}%` }}>{downPct}%</div>
        </div>
      </div>
    </div>
  )
}

// ============ 上证指数图表 ============
function IndexCharts() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <DailyKChart />
      <IntradayChart />
    </div>
  )
}

function ChartCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb flex items-center gap-1.5">
          {icon}
          {title}
        </span>
        <ExternalLink size={13} className="text-gray-300" />
      </div>
      {children}
    </div>
  )
}

function DailyKChart() {
  const width = 560
  const priceHeight = 250
  const volumeHeight = 82
  const pad = { left: 16, right: 74, top: 22, bottom: 28 }
  const chartWidth = width - pad.left - pad.right
  const prices = shDailyKData.flatMap((item) => [item.high, item.low])
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)
  const priceRange = maxPrice - minPrice
  const maxVol = Math.max(...shDailyKData.map((item) => item.volume))
  const step = chartWidth / shDailyKData.length
  const y = (price: number) => pad.top + ((maxPrice - price) / priceRange) * (priceHeight - pad.top - pad.bottom)
  const volTop = priceHeight + 14
  const ma5 = movingAverage(shDailyKData.map((item) => item.close), 5)
  const ma10 = movingAverage(shDailyKData.map((item) => item.close), 10)
  const ma20 = movingAverage(shDailyKData.map((item) => item.close), 20)
  const linePoints = (values: (number | null)[]) =>
    values
      .map((value, index) => value === null ? '' : `${pad.left + index * step + step / 2},${y(value)}`)
      .filter(Boolean)
      .join(' ')

  return (
    <ChartCard title="上证指数 日K线" icon={<CandlestickChart size={15} className="text-[#e4393c]" />}>
      <div className="p-3">
        <svg viewBox={`0 0 ${width} ${priceHeight + volumeHeight + 30}`} className="w-full h-[360px]">
          {[0, 1, 2, 3, 4, 5].map((tick) => {
            const yy = pad.top + tick * ((priceHeight - pad.top - pad.bottom) / 5)
            const price = maxPrice - tick * (priceRange / 5)
            return (
              <g key={tick}>
                <line x1={pad.left} y1={yy} x2={width - pad.right} y2={yy} stroke="#edf0f5" strokeDasharray="3 3" />
                <text x={width - pad.right + 8} y={yy + 4} className="chart-axis-text">{price.toFixed(2)}</text>
              </g>
            )
          })}
          <line x1={width - pad.right} y1={pad.top} x2={width - pad.right} y2={priceHeight - pad.bottom} stroke="#d9dee7" />
          <line x1={pad.left} y1={priceHeight - pad.bottom} x2={width - pad.right} y2={priceHeight - pad.bottom} stroke="#d9dee7" />

          <polyline points={linePoints(ma5)} fill="none" stroke="#2f80ed" strokeWidth="1.2" />
          <polyline points={linePoints(ma10)} fill="none" stroke="#f59e0b" strokeWidth="1.2" />
          <polyline points={linePoints(ma20)} fill="none" stroke="#8b5cf6" strokeWidth="1.2" />

          {shDailyKData.map((item, index) => {
            const x = pad.left + index * step + step / 2
            const up = item.close >= item.open
            const color = up ? '#ef4444' : '#16a34a'
            const bodyTop = y(Math.max(item.open, item.close))
            const bodyHeight = Math.max(Math.abs(y(item.open) - y(item.close)), 2)
            return (
              <g key={item.date}>
                <line x1={x} y1={y(item.high)} x2={x} y2={y(item.low)} stroke={color} strokeWidth="1" />
                <rect x={x - step * 0.28} y={bodyTop} width={step * 0.56} height={bodyHeight} fill={color} />
              </g>
            )
          })}

          <text x={pad.left + 132} y={y(4258.86) - 6} className="chart-note">4,258.86</text>
          <path d={`M ${pad.left + 147} ${y(4258.86) - 2} l -12 0 l 0 7`} stroke="#667085" fill="none" />
          <text x={pad.left + 235} y={y(3927.85) + 18} className="chart-note">3,927.85</text>
          <path d={`M ${pad.left + 285} ${y(3927.85) + 12} l 12 0 l 0 -7`} stroke="#667085" fill="none" />

          <line x1={pad.left} y1={y(4036.59)} x2={width - pad.right} y2={y(4036.59)} stroke="#ef4444" strokeDasharray="4 4" />
          <rect x={width - pad.right} y={y(4036.59) - 12} width="64" height="24" rx="2" fill="#dc2626" />
          <text x={width - pad.right + 8} y={y(4036.59) + 4} fill="#fff" fontSize="12" fontWeight="700">4,036.59</text>

          <line x1={pad.left} y1={volTop - 4} x2={width - pad.right} y2={volTop - 4} stroke="#d9dee7" />
          {shDailyKData.map((item, index) => {
            const x = pad.left + index * step + step / 2
            const up = item.close >= item.open
            const barHeight = (item.volume / maxVol) * (volumeHeight - 20)
            return (
              <rect
                key={`${item.date}-vol`}
                x={x - step * 0.25}
                y={volTop + volumeHeight - barHeight}
                width={step * 0.5}
                height={barHeight}
                fill={up ? '#ef4444' : '#16a34a'}
                opacity="0.65"
              />
            )
          })}
          <text x={width - pad.right + 8} y={volTop + 18} className="chart-axis-text">70B</text>
          <text x={width - pad.right + 8} y={volTop + 52} className="chart-axis-text">40B</text>
          <text x={width - pad.right + 8} y={volTop + 78} className="chart-axis-text">10B</text>
          <text x={pad.left} y={priceHeight + volumeHeight + 24} className="chart-axis-text">4-17</text>
          <text x={pad.left + chartWidth * 0.24} y={priceHeight + volumeHeight + 24} className="chart-axis-text">2026-05-14</text>
          <text x={pad.left + chartWidth * 0.53} y={priceHeight + volumeHeight + 24} className="chart-axis-text">2026-06-05</text>
          <text x={pad.left + chartWidth * 0.82} y={priceHeight + volumeHeight + 24} className="chart-axis-text">2026-06-30</text>
        </svg>
      </div>
    </ChartCard>
  )
}

function IntradayChart() {
  const width = 560
  const height = 360
  const pad = { left: 58, right: 42, top: 34, bottom: 38 }
  const priceHeight = 230
  const volTop = 256
  const prices = shIntradayData.map((item) => item.price)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)
  const prevClose = 3970.88
  const priceRange = maxPrice - minPrice
  const maxVol = Math.max(...shIntradayData.map((item) => item.volume))
  const chartWidth = width - pad.left - pad.right
  const x = (index: number) => pad.left + (index / (shIntradayData.length - 1)) * chartWidth
  const y = (price: number) => pad.top + ((maxPrice - price) / priceRange) * (priceHeight - pad.top)
  const points = shIntradayData.map((item, index) => `${x(index)},${y(item.price)}`).join(' ')
  const avgPoints = shIntradayData
    .map((_, index) => {
      const slice = shIntradayData.slice(0, index + 1)
      const avg = slice.reduce((sum, item) => sum + item.price, 0) / slice.length
      return `${x(index)},${y(avg)}`
    })
    .join(' ')

  return (
    <ChartCard title="上证指数 分时走势" icon={<Activity size={15} className="text-[#e4393c]" />}>
      <div className="p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[360px]">
          {[0, 1, 2, 3, 4, 5].map((tick) => {
            const yy = pad.top + tick * ((priceHeight - pad.top) / 5)
            const price = maxPrice - tick * (priceRange / 5)
            const pct = ((price - prevClose) / prevClose) * 100
            return (
              <g key={tick}>
                <line x1={pad.left} y1={yy} x2={width - pad.right} y2={yy} stroke="#e8edf3" />
                <text x={pad.left - 44} y={yy + 4} className="chart-axis-text">{price.toFixed(2)}</text>
                <text x={width - pad.right + 7} y={yy + 4} className={pct >= 0 ? 'chart-axis-up' : 'chart-axis-down'}>{pct > 0 ? '+' : ''}{pct.toFixed(2)}%</text>
              </g>
            )
          })}
          <line x1={pad.left} y1={y(prevClose)} x2={width - pad.right} y2={y(prevClose)} stroke="#ef4444" strokeDasharray="4 4" />
          <line x1={pad.left} y1={priceHeight + 5} x2={width - pad.right} y2={priceHeight + 5} stroke="#d9dee7" />
          <polyline points={avgPoints} fill="none" stroke="#f59e0b" strokeDasharray="4 5" strokeWidth="1.2" />
          <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx={x(11)} cy={y(shIntradayData[11].price)} r="3" fill="#10b981" />
          <text x={x(11) - 16} y={y(shIntradayData[11].price) + 18} fill="#10b981" fontSize="12" fontWeight="700">-0.80%</text>
          <circle cx={x(22)} cy={y(shIntradayData[22].price)} r="3" fill="#ef4444" />
          <text x={x(22) - 6} y={y(shIntradayData[22].price) - 10} fill="#ef4444" fontSize="12" fontWeight="700">+1.75%</text>
          <text x={pad.left - 48} y={y(prevClose) + 4} fill="#ef4444" fontSize="12" fontWeight="700">+0.17%</text>
          <text x={width - pad.right + 7} y={y(prevClose) + 4} fill="#98a2b3" fontSize="12" fontWeight="700">0.00%</text>

          <line x1={pad.left} y1={volTop} x2={width - pad.right} y2={volTop} stroke="#d9dee7" />
          {shIntradayData.map((item, index) => {
            const barHeight = (item.volume / maxVol) * 82
            const up = index === 0 || item.price >= shIntradayData[index - 1].price
            return (
              <rect
                key={item.time}
                x={x(index) - 4}
                y={volTop + 96 - barHeight}
                width="5"
                height={barHeight}
                fill={up ? '#ef4444' : '#22c55e'}
                opacity="0.75"
              />
            )
          })}
          <text x={pad.left - 45} y={volTop + 12} className="chart-axis-text">303.8亿</text>
          <text x={pad.left - 45} y={volTop + 52} className="chart-axis-text">151.9亿</text>
          <text x={pad.left - 24} y={volTop + 92} className="chart-axis-text">0亿</text>
          <text x={pad.left} y={height - 8} className="chart-axis-text">09:30</text>
          <text x={pad.left + chartWidth * 0.46} y={height - 8} className="chart-axis-text">11:30  13:00</text>
          <text x={width - pad.right - 24} y={height - 8} className="chart-axis-text">15:00</text>
        </svg>
      </div>
    </ChartCard>
  )
}

function movingAverage(values: number[], size: number) {
  return values.map((_, index) => {
    if (index + 1 < size) return null
    const slice = values.slice(index + 1 - size, index + 1)
    return slice.reduce((sum, value) => sum + value, 0) / size
  })
}

// ============ 大盘走势 ============
function MarketTrendChart() {
  const phaseGroups = marketTrendTableData.reduce((groups, item) => {
    const last = groups[groups.length - 1]
    if (last?.phase === item.phase) {
      last.count += 1
    } else {
      groups.push({ phase: item.phase, count: 1 })
    }
    return groups
  }, [] as { phase: string; count: number }[])

  const emotionClass = (value: string) => {
    if (value === '-') return 'text-gray-500'
    if (value.includes('批量跌停')) return 'bg-[#3f3f3f] text-white'
    if (value.includes('弱转强')) return 'bg-[#f85b5b] text-white'
    if (value.includes('强分歧')) return 'bg-[#35b881] text-white'
    if (value.includes('弱修复')) return 'bg-[#ffb4b4] text-[#7f1d1d]'
    if (value.includes('弱分歧')) return 'bg-[#f5e7a4] text-[#6b5d00]'
    if (value.includes('小幅上涨')) return 'bg-[#ffd0d0] text-[#ef4444]'
    return 'bg-gray-100 text-gray-700'
  }

  const metricClass = (value: number, mode: 'up' | 'down' | 'neutral' = 'neutral') => {
    if (mode === 'up') return value >= 0 ? 'text-up' : 'text-down'
    if (mode === 'down') return value >= 30 ? 'text-down' : 'text-slate-700'
    return value >= 50 ? 'text-up' : 'text-slate-700'
  }

  const rows = [
    { label: '预测情绪', render: (item: typeof marketTrendTableData[number]) => <span className={`market-emotion ${emotionClass(item.forecast)}`}>{item.forecast}</span> },
    { label: '实际情绪', render: (item: typeof marketTrendTableData[number]) => <span className={`market-emotion ${emotionClass(item.actual)}`}>{item.actual}</span> },
    { label: '连板高度', render: (item: typeof marketTrendTableData[number]) => <span className={item.boardHeight >= 5 ? 'text-up font-semibold' : 'text-[#19b600] font-semibold'}>{item.boardHeight}</span> },
    { label: '涨停数', render: (item: typeof marketTrendTableData[number]) => <span className="text-up font-mono font-semibold">{item.limitUp}</span> },
    { label: '首板个数', render: (item: typeof marketTrendTableData[number]) => <span className="font-mono">{item.firstLimit}</span> },
    { label: '连板数', render: (item: typeof marketTrendTableData[number]) => <span className={`${item.continued >= 18 ? 'text-up' : item.continued <= 8 ? 'text-down' : 'text-slate-700'} font-mono font-semibold`}>{item.continued}</span> },
    { label: '跌停数', render: (item: typeof marketTrendTableData[number]) => <span className={`${metricClass(item.limitDown, 'down')} font-mono font-semibold`}>{item.limitDown}</span> },
    { label: '上涨比率', render: (item: typeof marketTrendTableData[number]) => <span className={`${metricClass(item.upRate)} font-mono font-semibold`}>{item.upRate.toFixed(2)}%</span> },
    { label: '量能', render: (item: typeof marketTrendTableData[number]) => <span className="text-up font-mono font-semibold">{item.turnover}</span> },
    { label: '量能涨幅', render: (item: typeof marketTrendTableData[number]) => <span className={`${metricClass(item.volumeChange, 'up')} font-mono`}>{item.volumeChange > 0 ? '+' : ''}{item.volumeChange.toFixed(2)}%</span> },
    { label: '点评', render: (item: typeof marketTrendTableData[number]) => <span className="text-slate-700 whitespace-nowrap">{item.comment}</span> },
  ]

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb flex items-center gap-1.5">
          <BarChart3 size={15} className="text-[#e4393c]" />
          大盘趋势
        </span>
        <ExternalLink size={13} className="text-gray-300" />
      </div>
      <div className="p-3 overflow-x-auto">
        <table className="market-trend-table min-w-[880px]">
          <tbody>
            <tr>
              <th>阶段</th>
              {phaseGroups.map((group) => (
                <td
                  key={`${group.phase}-${group.count}`}
                  colSpan={group.count}
                  className={group.phase === '震荡期' ? 'phase-shock' : 'phase-ebb'}
                >
                  {group.phase}
                </td>
              ))}
            </tr>
            <tr>
              <th>日期</th>
              {marketTrendTableData.map((item) => (
                <td key={item.date} className="date-cell">{item.date}</td>
              ))}
            </tr>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {marketTrendTableData.map((item) => (
                  <td key={`${row.label}-${item.date}`}>{row.render(item)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ 连板天梯 ============
function LimitUpLadderTable() {
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null)

  const boardGroups = limitUpLadder.reduce((acc, item) => {
    if (!acc[item.board]) acc[item.board] = []
    acc[item.board].push(item)
    return acc
  }, {} as Record<number, typeof limitUpLadder>)

  const boards = Object.keys(boardGroups).map(Number).sort((a, b) => b - a)

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">连板天梯</span>
        <div className="flex gap-1">
          {boards.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBoard(selectedBoard === b ? null : b)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${selectedBoard === b ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {b}板
            </button>
          ))}
          <button onClick={() => setSelectedBoard(null)} className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">全部</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-fpb">
          <thead>
            <tr>
              <th className="w-12">连板</th>
              <th>股票名称</th>
              <th>涨停原因</th>
              <th className="w-16">涨停时间</th>
              <th className="w-20">封单</th>
              <th>概念</th>
            </tr>
          </thead>
          <tbody>
            {limitUpLadder
              .filter(item => selectedBoard === null || item.board === selectedBoard)
              .map((item, idx) => (
              <tr key={idx} className="cursor-pointer hover:bg-gray-50">
                <td><span className="badge-red">{item.board}板</span></td>
                <td className="font-medium">{item.name}</td>
                <td className="text-gray-500">{item.reason}</td>
                <td>{item.time}</td>
                <td>{item.seal}</td>
                <td>
                  {item.concepts.map(c => <span key={c} className="tag-concept">{c}</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ 短线市场数据 ============
function ShortMarketStats() {
  const getColor = (color: string) => {
    if (color === 'red') return 'text-up'
    if (color === 'green') return 'text-down'
    if (color === 'blue') return 'text-blue-500'
    return 'text-orange-500'
  }

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">短线市场</span>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        {shortMarketData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className={`text-xs font-bold ${getColor(item.color)}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ 情绪走势 ============
function EmotionTrendChart() {
  return (
    <div className="card-fpb mt-3">
      <div className="card-header-fpb">
        <span className="card-title-fpb">短线情绪走势</span>
      </div>
      <div className="p-3">
        <div className="h-32 relative px-2">
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            {/* 网格线 */}
            {[0, 10, 20, 30, 40].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f0f0f0" strokeWidth="0.2" />
            ))}
            {/* 涨停率线 */}
            <polyline
              fill="none"
              stroke="#e4393c"
              strokeWidth="0.5"
              points={emotionTrendData.map((d, i) => `${(i / (emotionTrendData.length - 1)) * 100},${40 - (d.limitUpRate / 100) * 40}`).join(' ')}
            />
            {/* 封板率线 */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
              points={emotionTrendData.map((d, i) => `${(i / (emotionTrendData.length - 1)) * 100},${40 - (d.sealRate / 100) * 40}`).join(' ')}
            />
            {/* 连板率线 */}
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="0.5"
              points={emotionTrendData.map((d, i) => `${(i / (emotionTrendData.length - 1)) * 100},${40 - (d.boardRate / 100) * 40}`).join(' ')}
            />
          </svg>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 rounded" /> 涨停率</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 rounded" /> 封板率</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-yellow-500 rounded" /> 连板率</span>
        </div>
      </div>
    </div>
  )
}

// ============ 板块涨幅排名 ============
function SectorRankTable() {
  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">板块涨幅排名</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table-fpb">
          <thead>
            <tr>
              <th className="w-8">排名</th>
              <th>板块名称</th>
              <th className="w-16">涨跌幅</th>
              <th className="w-12">涨停</th>
            </tr>
          </thead>
          <tbody>
            {sectorRanks.map((s, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-50">
                <td className="text-center text-gray-400">{i + 1}</td>
                <td>{s.name}</td>
                <td className={`text-right ${s.change >= 0 ? 'text-up' : 'text-down'}`}>{s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%</td>
                <td className="text-right">{s.limitUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ 板块涨停排名 ============
function SectorLimitUpTable() {
  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">板块涨停排名</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table-fpb">
          <thead>
            <tr>
              <th className="w-8">排名</th>
              <th>板块名称</th>
              <th className="w-16">涨停数</th>
              <th className="w-16">涨跌幅</th>
            </tr>
          </thead>
          <tbody>
            {sectorLimitUpRanks.map((s, i) => (
              <tr key={i} className="cursor-pointer hover:bg-gray-50">
                <td className="text-center text-gray-400">{i + 1}</td>
                <td>{s.name}</td>
                <td className="text-right font-medium text-up">{s.count}</td>
                <td className={`text-right ${s.change >= 0 ? 'text-up' : 'text-down'}`}>{s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ 复盘海报 ============
function PosterSection() {
  return (
    <div className="card-fpb mt-3">
      <div className="card-header-fpb">
        <span className="card-title-fpb">07月09日 A股涨停复盘</span>
      </div>
      <div className="p-4 flex justify-center">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg p-6 w-full max-w-2xl text-white text-center shadow-lg">
          <div className="text-2xl font-bold mb-2">07月09日 A股涨停复盘</div>
          <div className="text-sm opacity-90 mb-4">两市涨停25家，炸板11家，市场情绪偏冷</div>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold">25</div>
              <div className="opacity-80">涨停</div>
            </div>
            <div>
              <div className="text-2xl font-bold">5</div>
              <div className="opacity-80">跌停</div>
            </div>
            <div>
              <div className="text-2xl font-bold">5</div>
              <div className="opacity-80">最高连板</div>
            </div>
            <div>
              <div className="text-2xl font-bold">69%</div>
              <div className="opacity-80">封板率</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ 短线市场 ============
function ShortMarketSection() {
  const [activeTab, setActiveTab] = useState('一字板')

  const activeCategory = shortMarketCategories.find(c => c.title === activeTab) || shortMarketCategories[0]

  return (
    <div className="card-fpb mt-3">
      <div className="card-header-fpb">
        <span className="card-title-fpb">短线市场总览</span>
      </div>
      <div className="p-3">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {shortMarketCategories.map(c => (
            <button
              key={c.title}
              onClick={() => setActiveTab(c.title)}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap transition-colors ${activeTab === c.title ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {c.title} ({c.count})
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="table-fpb">
            <thead>
              <tr>
                <th className="w-12">序号</th>
                <th>股票名称</th>
                <th className="w-16">代码</th>
                <th className="w-16">现价</th>
                <th className="w-16">涨跌幅</th>
                <th>原因</th>
              </tr>
            </thead>
            <tbody>
              {activeCategory.items.length > 0 ? activeCategory.items.map((item, idx) => (
                <tr key={idx} className="cursor-pointer hover:bg-gray-50">
                  <td className="text-center text-gray-400">{idx + 1}</td>
                  <td className="font-medium">{item.name}</td>
                  <td className="text-gray-400">{item.code}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td className={`${item.change >= 0 ? 'text-up' : 'text-down'}`}>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</td>
                  <td className="text-gray-500">{item.reason}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="text-center text-gray-400 py-4">暂无数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ============ 龙虎榜 ============
function DragonTigerSection() {
  const [tab, setTab] = useState<'institution' | 'youzi'>('institution')

  const data = dragonTigerData[tab]

  return (
    <div className="card-fpb mt-3 mb-4">
      <div className="card-header-fpb">
        <span className="card-title-fpb">龙虎榜</span>
        <div className="flex gap-1">
          <button onClick={() => setTab('institution')} className={`px-3 py-1 rounded text-xs transition-colors ${tab === 'institution' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>机构榜</button>
          <button onClick={() => setTab('youzi')} className={`px-3 py-1 rounded text-xs transition-colors ${tab === 'youzi' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>游资榜</button>
        </div>
      </div>
      <div className="p-3 overflow-x-auto">
        <table className="table-fpb">
          <thead>
            <tr>
              <th>股票名称</th>
              <th className="w-16">代码</th>
              <th className="w-20">买入(万)</th>
              <th className="w-20">卖出(万)</th>
              <th className="w-20">净买入(万)</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="cursor-pointer hover:bg-gray-50">
                <td className="font-medium">{item.name}</td>
                <td className="text-gray-400">{item.code}</td>
                <td className="text-right text-up">{item.buy > 0 ? '+' : ''}{item.buy.toFixed(2)}</td>
                <td className="text-right text-down">{item.sell > 0 ? '-' : ''}{item.sell.toFixed(2)}</td>
                <td className={`text-right font-bold ${item.net >= 0 ? 'text-up' : 'text-down'}`}>{item.net >= 0 ? '+' : ''}{item.net.toFixed(2)}</td>
                <td className="text-gray-500">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
