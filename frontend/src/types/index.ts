// API响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  request_id: string
  data: T
}

// 涨停股票
export interface LimitUpStock {
  thscode: string
  ticker: string
  name: string
  is_st: boolean
  is_new: boolean
  last_price: number
  price_change_ratio_pct: number
  limit_up_time: string
  limit_up_reason: string | null
  continue_day_text: string
  continue_day_cnt: number
  seal_money: number
  max_seal_money: number
}

export interface LimitUpPoolData {
  timestamp: number
  pagination: {
    total: number
    pages: number
    size: number
    page: number
  }
  item: LimitUpStock[]
}

// 连板天梯
export interface LadderStock {
  thscode: string
  ticker: string
  name: string
  board_num: number
  seal_nextday: boolean | null
  sign_level: number
}

export interface LimitUpLadderData {
  timestamp: number
  window: {
    length: number
    date_list: string[]
    board_caps: Record<string, number>
  }
  item: {
    date: string
    boards: {
      two_board: LadderStock[]
      three_board: LadderStock[]
      four_board: LadderStock[]
      five_board: LadderStock[]
      six_board: LadderStock[]
      seven_over: LadderStock[]
    }
  }[]
}

// 行情快照
export interface PriceSnapshot {
  thscode: string
  ticker: string
  last_price: number
  price_change: number
  price_change_ratio_pct: number
  open_price: number
  high_price: number
  low_price: number
  prev_price: number
  volume: number
  turnover: number
}

export interface SnapshotData {
  timestamp: number | null
  total: number
  item: PriceSnapshot[]
}

// 龙虎榜
export interface DragonTigerStock {
  thscode: string
  ticker: string
  name: string
  change: number
  net_value: number
  net_rate: number
  hot_rank: number
  buy_value: number
  sell_value: number
  limit_reason: string
  range_days: number
  org_net_value: number
  org_net_rate: number
  org_buy_num: number
  org_sell_num: number
  amount: number
  hot_money_net_value: number
  hot_money_net_rate: number
  concept_list?: { name: string }[]
}

export interface DragonTigerData {
  timestamp: number
  board_type: string
  trade_date: string
  count: number
  stock_count: number
  stock_items: DragonTigerStock[]
  hot_money_items: {
    name: string
    buying: number
    rows: DragonTigerStock[]
  }[]
}

// 同花顺指数
export interface ThsIndex {
  thscode: string
  name: string
  ticker?: string
  volume?: number
  turnover?: number
  last_price?: number
  price_change?: number
  price_change_ratio_pct?: number
}

export interface IndexConstituent {
  thscode: string
  ticker: string
  name: string
}

// 热榜
export interface HotStock {
  stock_name: string
  thscode: string
  ticker: string
  rank: number
  hot_value: number
}

// 异动原因
export interface AnomalyItem {
  stock_name: string
  analysis_content: string
  keyword_list: string[]
  thscode: string
  tag_name: string
}

// K线
export interface KLineBar {
  date_ms: number
  open_price: number
  high_price: number
  low_price: number
  close_price: number
  volume: number
  turnover: number
}

export interface HistoricalData {
  timestamp: number
  item: KLineBar[]
}

export interface MyThemeStock {
  id: number
  theme_id: number
  thscode: string
  ticker: string
  name: string
  created_at: string
}

export interface MyTheme {
  id: number
  name: string
  category: string
  source: string
  stock_count: number
  created_at: string
  updated_at: string
  stocks?: MyThemeStock[]
}
