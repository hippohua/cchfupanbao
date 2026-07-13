import { useState } from 'react'
import {
  indexData, limitUpLadder, shortMarketData, sectorRanks, sectorLimitUpRanks,
  shortMarketCategories, dragonTigerData, marketTrendData, emotionTrendData, klineData
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
  const upPct = (up / total * 100).toFixed(1)
  const downPct = (down / total * 100).toFixed(1)
  const flatPct = (flat / total * 100).toFixed(1)

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">涨跌家数</span>
      </div>
      <div className="p-3">
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
  const maxCount = Math.max(...marketTrendData.map(d => Math.max(d.upCount, d.downCount)))

  return (
    <div className="card-fpb">
      <div className="card-header-fpb">
        <span className="card-title-fpb">大盘走势</span>
      </div>
      <div className="p-2">
        <div className="h-32 flex items-end gap-1 px-2">
          {marketTrendData.map((d, i) => {
            const upH = (d.upCount / maxCount) * 100
            const downH = (d.downCount / maxCount) * 100
            return (
              <div key={i} className="flex-1 flex flex-col justify-end gap-px">
                <div className="w-full rounded-t-sm" style={{ height: `${upH}%`, background: '#e4393c', opacity: 0.8 }} />
                <div className="w-full rounded-b-sm" style={{ height: `${downH}%`, background: '#00aa3c', opacity: 0.8 }} />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>{marketTrendData[0].date}</span>
          <span>{marketTrendData[marketTrendData.length - 1].date}</span>
        </div>
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
