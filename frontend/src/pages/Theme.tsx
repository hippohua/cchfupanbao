import { useEffect, useMemo, useState, type ReactNode } from 'react'
import ReactECharts from 'echarts-for-react'
import { ChevronLeft, ChevronRight, EyeOff, Plus, RefreshCw, Search, Settings } from 'lucide-react'
import { api } from '../api/client'
import type { HistoricalData, IndexConstituent, KLineBar, MyTheme, PriceSnapshot, ThsIndex } from '../types'

type PageMode = 'review' | 'manage'
type SourceKey = 'mine' | 'fupanbao' | 'ths' | 'industry' | 'eastmoney' | 'kaipanla'

const SOURCE_TABS: { key: SourceKey; label: string; tag: string }[] = [
  { key: 'mine', label: '我的题材', tag: 'mine' },
  { key: 'fupanbao', label: '复盘宝题材', tag: 'cn_concept' },
  { key: 'ths', label: '同花顺题材', tag: 'cn_concept' },
  { key: 'industry', label: '标准行业分类', tag: 'industry' },
  { key: 'eastmoney', label: '东财概念题材', tag: 'cn_concept' },
  { key: 'kaipanla', label: '开盘啦题材', tag: 'cn_concept' },
]

const formatPct = (value?: number | null) => {
  if (value === undefined || value === null || Number.isNaN(value)) return '-'
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}

const formatAmount = (value?: number | null) => {
  if (!value) return '-'
  if (value >= 1000000000000) return `${(value / 1000000000000).toFixed(2)}万亿`
  if (value >= 100000000) return `${(value / 100000000).toFixed(2)}亿`
  if (value >= 10000) return `${(value / 10000).toFixed(2)}万`
  return value.toFixed(0)
}

const pctClass = (value?: number | null) => {
  if (value === undefined || value === null || Number.isNaN(value)) return 'text-slate-500'
  if (value > 0) return 'text-up'
  if (value < 0) return 'text-down'
  return 'text-slate-500'
}

const toDateText = (dateMs: number) => {
  const date = new Date(dateMs)
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
}

export default function Theme() {
  const [mode, setMode] = useState<PageMode>('review')
  const [source, setSource] = useState<SourceKey>('mine')
  const [indices, setIndices] = useState<ThsIndex[]>([])
  const [indexQuotes, setIndexQuotes] = useState<Record<string, ThsIndex>>({})
  const [myThemes, setMyThemes] = useState<MyTheme[]>([])
  const [selectedExternal, setSelectedExternal] = useState<ThsIndex | null>(null)
  const [selectedMine, setSelectedMine] = useState<MyTheme | null>(null)
  const [constituents, setConstituents] = useState<IndexConstituent[]>([])
  const [stockQuotes, setStockQuotes] = useState<Record<string, PriceSnapshot>>({})
  const [history, setHistory] = useState<KLineBar[]>([])
  const [loadingList, setLoadingList] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [lastRefresh, setLastRefresh] = useState('')

  const activeTab = SOURCE_TABS.find((item) => item.key === source) || SOURCE_TABS[0]
  const isMine = source === 'mine'

  const selectedName = isMine ? selectedMine?.name : selectedExternal?.name
  const selectedThscode = isMine ? undefined : selectedExternal?.thscode
  const selectedStocks = isMine ? (selectedMine?.stocks || []) : constituents

  const rows = useMemo(() => {
    if (isMine) {
      return myThemes.map((theme) => ({
        id: String(theme.id),
        name: theme.name,
        subtitle: theme.category,
        stockCount: theme.stock_count,
      }))
    }

    return indices.map((idx) => {
      const quote = indexQuotes[idx.thscode]
      return {
        id: idx.thscode,
        name: idx.name,
        thscode: idx.thscode,
        change: quote?.price_change_ratio_pct,
        turnover: quote?.turnover,
      }
    })
  }, [indexQuotes, indices, isMine, myThemes])

  const secondaryRows = useMemo(() => {
    if (!selectedName) return []
    if (isMine) {
      const groups = new Map<string, number>()
      ;(selectedMine?.stocks || []).forEach((stock) => {
        const key = stock.ticker.startsWith('6') ? '沪市成分' : stock.ticker.startsWith('3') ? '创业板成分' : '深市成分'
        groups.set(key, (groups.get(key) || 0) + 1)
      })
      return Array.from(groups.entries()).map(([name, count]) => ({ name, count }))
    }
    const first = selectedName.length > 4 ? selectedName.slice(0, 4) : selectedName
    return [
      { name: `${first}核心`, count: Math.min(20, selectedStocks.length) },
      { name: `${first}补涨`, count: Math.max(selectedStocks.length - 20, 0) },
      { name: `${first}低位`, count: Math.max(Math.floor(selectedStocks.length / 3), 0) },
    ].filter((item) => item.count > 0)
  }, [isMine, selectedMine?.stocks, selectedName, selectedStocks.length])

  const loadMyThemes = async () => {
    const data = await api.getMyThemes() as { item: MyTheme[] }
    setMyThemes(data.item || [])
    if (source === 'mine' && !selectedMine && data.item?.length) {
      setSelectedMine(data.item[0])
    }
  }

  const loadIndexList = async () => {
    if (isMine) return
    setLoadingList(true)
    try {
      const data = await api.getIndices(activeTab.tag) as { item: ThsIndex[] }
      const list = data.item || []
      setIndices(list)
      if (!selectedExternal || !list.some((item) => item.thscode === selectedExternal.thscode)) {
        setSelectedExternal(list[0] || null)
      }
      const quoteCodes = list.slice(0, 80).map((item) => item.thscode).join(',')
      if (quoteCodes) {
        const quotes = await api.getIndexSnapshot(quoteCodes) as { item: ThsIndex[] }
        setIndexQuotes(Object.fromEntries((quotes.item || []).map((item) => [item.thscode, item])))
      }
    } finally {
      setLoadingList(false)
      setLastRefresh(new Date().toLocaleTimeString())
    }
  }

  const loadDetail = async () => {
    setLoadingDetail(true)
    try {
      if (isMine) {
        if (!selectedMine) {
          setConstituents([])
          setStockQuotes({})
          setHistory([])
          return
        }
        const detail = await api.getMyTheme(selectedMine.id) as MyTheme
        setSelectedMine(detail)
        const stocks = detail.stocks || []
        await loadStockQuotes(stocks)
        setHistory([])
        return
      }

      if (!selectedExternal) {
        setConstituents([])
        setStockQuotes({})
        setHistory([])
        return
      }
      const [stockData, historyData] = await Promise.all([
        api.getIndexConstituents(selectedExternal.thscode) as Promise<{ item: IndexConstituent[] }>,
        api.getThemeIndexHistory(selectedExternal.thscode, 20) as Promise<HistoricalData>,
      ])
      const stocks = stockData.item || []
      setConstituents(stocks)
      setHistory((historyData.item || []).slice(-20))
      await loadStockQuotes(stocks)
    } finally {
      setLoadingDetail(false)
      setLastRefresh(new Date().toLocaleTimeString())
    }
  }

  const loadStockQuotes = async (stocks: { thscode: string }[]) => {
    const codes = stocks.slice(0, 80).map((stock) => stock.thscode).join(',')
    if (!codes) {
      setStockQuotes({})
      return
    }
    const quotes = await api.getMarketSnapshot(codes) as { item: PriceSnapshot[] }
    setStockQuotes(Object.fromEntries((quotes.item || []).map((item) => [item.thscode, item])))
  }

  useEffect(() => {
    loadMyThemes().catch((err) => console.error('加载我的题材失败:', err))
  }, [])

  useEffect(() => {
    if (isMine) {
      setIndices([])
      setIndexQuotes({})
      return
    }
    loadIndexList().catch((err) => console.error('加载题材列表失败:', err))
  }, [source])

  useEffect(() => {
    loadDetail().catch((err) => console.error('加载题材详情失败:', err))
    const timer = window.setInterval(() => {
      loadDetail().catch((err) => console.error('刷新题材详情失败:', err))
    }, 30000)
    return () => window.clearInterval(timer)
  }, [source, selectedExternal?.thscode, selectedMine?.id])

  const createTheme = async () => {
    const name = window.prompt('请输入题材名称')
    if (!name?.trim()) return
    const created = await api.createMyTheme(name.trim()) as MyTheme
    await loadMyThemes()
    setSource('mine')
    setSelectedMine(created)
    setMode('manage')
  }

  const addStockToMine = async (stock: IndexConstituent) => {
    const target = selectedMine || myThemes[0]
    if (!target) {
      const created = await api.createMyTheme(selectedName ? `${selectedName}跟踪` : '新建题材') as MyTheme
      await api.addMyThemeStock(created.id, stock)
      await loadMyThemes()
      setSource('mine')
      setSelectedMine(created)
      return
    }
    const updated = await api.addMyThemeStock(target.id, stock) as MyTheme
    setSelectedMine(updated)
    await loadMyThemes()
  }

  const chartOption = useMemo(() => {
    const dates = history.map((item) => toDateText(item.date_ms))
    const candleData = history.map((item) => [item.open_price, item.close_price, item.low_price, item.high_price])
    const volumes = history.map((item) => item.volume)
    return {
      animation: false,
      grid: [
        { left: 44, right: 30, top: 28, height: 250 },
        { left: 44, right: 30, top: 305, height: 72 },
      ],
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      xAxis: [
        { type: 'category', data: dates, axisLine: { lineStyle: { color: '#d9dee7' } }, axisLabel: { color: '#8a94a6' } },
        { type: 'category', data: dates, gridIndex: 1, axisLine: { lineStyle: { color: '#d9dee7' } }, axisLabel: { color: '#8a94a6' } },
      ],
      yAxis: [
        { scale: true, axisLabel: { color: '#8a94a6' }, splitLine: { lineStyle: { color: '#edf0f5', type: 'dashed' } } },
        { scale: true, gridIndex: 1, axisLabel: { show: false }, splitLine: { show: false } },
      ],
      series: [
        {
          type: 'candlestick',
          data: candleData,
          itemStyle: {
            color: '#ef4444',
            color0: '#10b981',
            borderColor: '#ef4444',
            borderColor0: '#10b981',
          },
        },
        {
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes,
          itemStyle: { color: '#f7bd65' },
        },
      ],
    }
  }, [history])

  return (
    <main className="pt-[50px] min-h-screen bg-[#f3f5f8] text-[13px] text-[#1f2937]">
      <div className="h-10 bg-white border-b border-[#e5e7eb] px-8 flex items-center justify-between">
        <div className="h-full flex items-end gap-8">
          {(['review', 'manage'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`h-10 px-2 border-b-2 text-sm ${
                mode === item ? 'border-[#e62427] text-[#e62427] font-semibold' : 'border-transparent text-slate-600'
              }`}
            >
              {item === 'review' ? '题材复盘' : '题材管理'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <button className="h-8 w-8 rounded bg-[#f1f3f6] flex items-center justify-center hover:bg-[#e8ebef]">
            <ChevronLeft size={15} />
          </button>
          <div className="h-8 w-32 rounded border border-[#dfe3e8] bg-white flex items-center justify-center font-semibold">
            {new Date().toISOString().slice(0, 10)}
          </div>
          <button className="h-8 w-8 rounded bg-[#f1f3f6] flex items-center justify-center hover:bg-[#e8ebef]">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {mode === 'review' ? renderReview() : renderManage()}
    </main>
  )

  function renderReview() {
    return (
      <section className="p-2 grid grid-cols-[1fr_472px] gap-2 h-[calc(100vh-90px)] min-h-[760px]">
        <div className="fpb-panel overflow-hidden">
          <SourceTabs />
          <div className="grid grid-cols-[405px_405px_1fr] h-[calc(100%-42px)]">
            <PrimaryPanel />
            <SecondaryPanel />
            <StocksPanel compact />
          </div>
        </div>
        <DetailSide />
      </section>
    )
  }

  function renderManage() {
    return (
      <section className="p-2 grid grid-cols-[1fr_472px] gap-2 h-[calc(100vh-90px)] min-h-[760px]">
        <div className="fpb-panel overflow-hidden">
          <SourceTabs />
          <div className="grid grid-cols-[405px_405px_1fr] h-[calc(100%-42px)]">
            <PrimaryPanel manage />
            <SecondaryPanel />
            <StocksPanel />
          </div>
        </div>
        <DetailSide />
      </section>
    )
  }

  function SourceTabs() {
    return (
      <div className="h-[42px] border-b border-[#e5e7eb] flex items-center justify-between pl-4 pr-5 bg-white">
        <div className="flex h-full items-end gap-7">
          {SOURCE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSource(tab.key)}
              className={`h-full border-b-2 text-[14px] ${
                source === tab.key ? 'border-[#e62427] text-[#e62427] font-semibold' : 'border-transparent text-[#111827]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Search size={17} className="text-slate-400" />
      </div>
    )
  }

  function PanelTitle({ title, actions }: { title: string; actions?: ReactNode }) {
    return (
      <div className="h-10 px-3 border-b border-[#e5e7eb] bg-[#fbfbfc] flex items-center justify-between">
        <span className="font-semibold text-[#111827]">{title}</span>
        <div className="flex items-center gap-1">{actions}</div>
      </div>
    )
  }

  function PrimaryPanel({ manage = false }: { manage?: boolean }) {
    return (
      <div className="border-r border-[#dfe3e8] overflow-hidden flex flex-col">
        <PanelTitle
          title="一级分类"
          actions={
            <>
              <IconButton icon={<EyeOff size={15} />} />
              <IconButton icon={<Plus size={15} />} onClick={createTheme} />
            </>
          }
        />
        <div className="grid grid-cols-[34px_1fr_82px_92px_86px] h-8 items-center border-b border-[#e5e7eb] px-2 text-xs text-slate-500 bg-white">
          <span>#</span>
          <span>名称</span>
          <span className="text-right">涨跌幅</span>
          <span className="text-right">10日涨幅</span>
          <span className="text-right">总市值</span>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {loadingList ? (
            <SkeletonRows />
          ) : rows.length === 0 ? (
            <EmptyState text={manage && isMine ? '' : '暂无题材'} action={isMine ? <CreateButton /> : undefined} />
          ) : (
            rows.map((row, index) => {
              const active = isMine ? selectedMine?.id === Number(row.id) : selectedExternal?.thscode === row.id
              return (
                <button
                  key={row.id}
                  onClick={() => {
                    if (isMine) {
                      const theme = myThemes.find((item) => item.id === Number(row.id)) || null
                      setSelectedMine(theme)
                    } else {
                      const idx = indices.find((item) => item.thscode === row.id) || null
                      setSelectedExternal(idx)
                    }
                  }}
                  className={`grid grid-cols-[34px_1fr_82px_92px_86px] w-full h-[38px] items-center px-2 border-b border-[#edf0f3] text-left hover:bg-[#fff7f7] ${
                    active ? 'bg-[#fff1f0]' : 'bg-white'
                  }`}
                >
                  <span className="font-mono text-xs text-slate-500">{index + 1}</span>
                  <span className="font-semibold truncate text-[#111827]">{row.name}</span>
                  <span className={`font-mono text-right ${pctClass('change' in row ? row.change : undefined)}`}>
                    {formatPct('change' in row ? row.change : undefined)}
                  </span>
                  <span className="font-mono text-right text-slate-500">-</span>
                  <span className="font-mono text-right truncate text-[#111827]">
                    {'turnover' in row ? formatAmount(row.turnover) : `${row.stockCount}只`}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </div>
    )
  }

  function SecondaryPanel() {
    return (
      <div className="border-r border-[#dfe3e8] overflow-hidden flex flex-col">
        <PanelTitle
          title="二级分类"
          actions={
            <>
              <IconButton icon={<EyeOff size={15} />} />
              <IconButton icon={<Plus size={15} />} />
            </>
          }
        />
        {secondaryRows.length === 0 ? (
          <EmptyState text="请先选择一级分类" />
        ) : (
          <div className="flex-1 overflow-y-auto bg-white">
            {secondaryRows.map((row, index) => (
              <div
                key={row.name}
                className="grid grid-cols-[34px_1fr_72px] h-[40px] items-center px-3 border-b border-[#edf0f3] hover:bg-[#fff7f7]"
              >
                <span className="font-mono text-xs text-slate-500">{index + 1}</span>
                <span className="font-semibold">{row.name}</span>
                <span className="text-right text-slate-500">{row.count}只</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  function StocksPanel({ compact = false }: { compact?: boolean }) {
    return (
      <div className="overflow-hidden flex flex-col">
        <PanelTitle
          title="题材内股票"
          actions={<button onClick={() => loadDetail()} className="text-xs text-slate-500 flex items-center gap-1 hover:text-[#e62427]"><RefreshCw size={13} className={loadingDetail ? 'animate-spin' : ''} /> {lastRefresh || '刷新'}</button>}
        />
        {selectedStocks.length === 0 ? (
          <EmptyState text={selectedName ? '暂无成分股数据' : '请选择题材'} />
        ) : (
          <>
            <div className="grid grid-cols-[34px_1fr_82px_76px_86px_86px] h-8 items-center px-3 border-b border-[#e5e7eb] text-xs text-slate-500 bg-white">
              <span>增位</span>
              <span>股票名称</span>
              <span className="text-right">涨跌幅</span>
              <span className="text-right">现价</span>
              <span className="text-right">10日涨幅</span>
              <span className="text-right">20日涨幅</span>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              {selectedStocks.slice(0, compact ? 120 : 200).map((stock) => {
                const quote = stockQuotes[stock.thscode]
                return (
                  <div
                    key={stock.thscode}
                    className="grid grid-cols-[34px_1fr_82px_76px_86px_86px] min-h-[48px] items-center px-3 border-b border-[#edf0f3] hover:bg-[#fff7f7]"
                  >
                    <button
                      onClick={() => addStockToMine(stock)}
                      className="h-5 w-5 rounded bg-[#f8fafc] border border-[#edf0f3] text-slate-400 hover:text-[#e62427]"
                      title="加入我的题材"
                    >
                      +
                    </button>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{stock.name}</div>
                      <div className="font-mono text-xs text-slate-500">{stock.ticker}</div>
                    </div>
                    <span className={`font-mono font-semibold text-right ${pctClass(quote?.price_change_ratio_pct)}`}>
                      {formatPct(quote?.price_change_ratio_pct)}
                    </span>
                    <span className="font-mono font-semibold text-right">{quote?.last_price?.toFixed(2) || '-'}</span>
                    <span className="font-mono text-right text-slate-500">-</span>
                    <span className="font-mono text-right text-slate-500">-</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  }

  function DetailSide() {
    const quote = selectedThscode ? indexQuotes[selectedThscode] : undefined
    return (
      <aside className="grid grid-rows-[1fr_332px] gap-2 overflow-hidden">
        <div className="fpb-panel overflow-hidden">
          <PanelTitle title={selectedName ? `题材趋势图 · ${selectedName}` : '题材趋势图'} actions={<IconButton icon={<Settings size={14} />} />} />
          {history.length > 0 ? (
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          ) : (
            <EmptyState text={selectedName ? '我的题材暂未生成趋势图' : '请在左侧选择题材或股票'} />
          )}
        </div>
        <div className="fpb-panel overflow-hidden">
          <PanelTitle title="题材信息" />
          {selectedName ? (
            <div className="p-4 space-y-3">
              <InfoRow label="题材名称" value={selectedName} />
              <InfoRow label="题材来源" value={activeTab.label} />
              <InfoRow label="成分数量" value={`${selectedStocks.length}只`} />
              <InfoRow label="盘中涨幅" value={formatPct(quote?.price_change_ratio_pct)} valueClass={pctClass(quote?.price_change_ratio_pct)} />
              <InfoRow label="成交额" value={formatAmount(quote?.turnover)} />
              <div className="rounded border border-[#edf0f3] bg-[#fbfcfd] p-3 text-slate-500 leading-6">
                {isMine ? '我的题材数据保存在本地 SQLite，可从右侧股票列表逐步加入跟踪标的。' : '题材指数、成分股和盘中涨跌幅来自 Fuyao API，页面每 30 秒自动刷新已选题材。'}
              </div>
            </div>
          ) : (
            <EmptyState text="请在左侧选择题材" />
          )}
        </div>
      </aside>
    )
  }

  function IconButton({ icon, onClick }: { icon: ReactNode; onClick?: () => void }) {
    return (
      <button onClick={onClick} className="h-6 w-6 rounded border border-[#dfe3e8] bg-white text-slate-500 hover:text-[#e62427] flex items-center justify-center">
        {icon}
      </button>
    )
  }

  function CreateButton() {
    return (
      <button onClick={createTheme} className="h-8 px-5 rounded border border-[#ff9b9b] text-[#ff3838] bg-[#fff8f8] hover:bg-[#fff1f0]">
        创建我的题材
      </button>
    )
  }

  function EmptyState({ text, action }: { text: string; action?: ReactNode }) {
    return (
      <div className="h-full min-h-[220px] flex flex-col items-center justify-center gap-4 text-slate-600 bg-white">
        {text && <div>{text}</div>}
        {action}
      </div>
    )
  }

  function SkeletonRows() {
    return (
      <div className="p-3 space-y-2">
        {Array.from({ length: 14 }).map((_, index) => (
          <div key={index} className="h-7 rounded bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  function InfoRow({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
    return (
      <div className="flex items-center justify-between border-b border-[#edf0f3] pb-2">
        <span className="text-slate-500">{label}</span>
        <span className={`font-semibold ${valueClass}`}>{value}</span>
      </div>
    )
  }
}
