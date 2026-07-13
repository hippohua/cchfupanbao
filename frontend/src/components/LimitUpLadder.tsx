import { useEffect, useState } from 'react'
import type { LimitUpLadderData, LadderStock } from '../types'
import { api } from '../api/client'

const BOARD_LABELS: Record<string, string> = {
  seven_over: '7板+',
  six_board: '6板',
  five_board: '5板',
  four_board: '4板',
  three_board: '3板',
  two_board: '2板',
}

const BOARD_ORDER = ['seven_over', 'six_board', 'five_board', 'four_board', 'three_board', 'two_board']

export default function LimitUpLadder() {
  const [ladderData, setLadderData] = useState<LimitUpLadderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLadder = async () => {
      try {
        setLoading(true)
        const data = await api.getLimitUpLadder() as LimitUpLadderData
        setLadderData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setLoading(false)
      }
    }
    loadLadder()
  }, [])

  const latestDay = ladderData?.item?.[ladderData.item.length - 1]

  const renderStock = (stock: LadderStock) => {
    const sealStatus = stock.seal_nextday === null
      ? '进行中'
      : stock.seal_nextday
        ? '封板'
        : '未封'

    return (
      <div
        key={stock.thscode}
        className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border border-gray-100 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <span className="text-xs font-medium text-gray-500 w-16 truncate">{stock.thscode.split('.')[0]}</span>
        <span className="text-sm font-medium text-gray-900 flex-1">{stock.name}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          stock.seal_nextday === null
            ? 'bg-gray-100 text-gray-500'
            : stock.seal_nextday
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
        }`}>
          {sealStatus}
        </span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">连板天梯</h3>
        </div>
        <div className="card-body">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">连板天梯</h3>
        </div>
        <div className="card-body text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div id="ladder" className="card">
      <div className="card-header">
        <h3 className="card-title">连板天梯</h3>
        <span className="text-xs text-gray-500">
          {latestDay?.date ? `${latestDay.date.slice(0, 4)}-${latestDay.date.slice(4, 6)}-${latestDay.date.slice(6, 8)}` : ''}
        </span>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BOARD_ORDER.map((boardKey) => {
            const stocks = latestDay?.boards?.[boardKey as keyof typeof latestDay.boards] || []
            if (stocks.length === 0) return null

            return (
              <div key={boardKey} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-red-700 text-white px-3 py-2 text-sm font-medium flex items-center justify-between">
                  <span>{BOARD_LABELS[boardKey]}</span>
                  <span className="text-xs opacity-80">{stocks.length}只</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {stocks.map(renderStock)}
                </div>
              </div>
            )
          })}
        </div>

        {latestDay && Object.values(latestDay.boards).every((arr) => (arr as LadderStock[]).length === 0) && (
          <div className="text-center text-gray-400 py-8">暂无连板数据</div>
        )}
      </div>
    </div>
  )
}
