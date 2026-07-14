import { useState } from 'react'
import { BarChart3, CloudSun, ExternalLink, RotateCw } from 'lucide-react'
import {
  indexData, limitUpLadder, shortMarketData, sectorRanks, sectorLimitUpRanks,
  shortMarketCategories, dragonTigerData, marketTrendTableData, emotionTrendData, klineData
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
          <IndexKLine />
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

// ============ K线图 ============
function IndexKLine() {
  const maxPrice = Math.max(...klineData.map(d => d.high))
  const minPrice = Math.min(...klineData.map(d => d.low))
  const priceRange = maxPrice - minPrice
  const maxVol = Math.max(...klineData.map(d => d.volume))

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">上证指数 000001</span>
        <div className="text-xs text-gray-400">2997.56 <span className="text-down">-0.93%</span></div>
      </div>
      <div className="p-2">
        {/* K线 */}
        <div className="h-44 flex items-end gap-px px-2">
          {klineData.map((d, i) => {
            const top = ((maxPrice - Math.max(d.open, d.close)) / priceRange) * 100
            const height = (Math.abs(d.close - d.open) / priceRange) * 100
            const wickTop = ((maxPrice - d.high) / priceRange) * 100
            const wickHeight = ((d.high - d.low) / priceRange) * 100
            const color = d.up ? '#e4393c' : '#00aa3c'

            return (
              <div key={i} className="flex-1 relative" style={{ height: '100%' }}>
                <div className="absolute w-px left-1/2 -translate-x-1/2" style={{ top: `${wickTop}%`, height: `${wickHeight}%`, background: color }} />
                <div className="absolute w-3/5 left-1/2 -translate-x-1/2 rounded-sm" style={{ top: `${top}%`, height: `${Math.max(height, 1)}%`, background: color }} />
              </div>
            )
          })}
        </div>
        {/* 成交量 */}
        <div className="h-14 mt-1 flex items-end gap-px px-2 border-t border-gray-100 pt-1">
          {klineData.map((d, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${(d.volume / maxVol) * 100}%`, background: d.up ? '#e4393c' : '#00aa3c', opacity: 0.6 }} />
          ))}
        </div>
      </div>
    </div>
  )
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
