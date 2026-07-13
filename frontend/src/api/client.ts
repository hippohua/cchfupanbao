const BASE_URL = '/api'

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  const data = await response.json()

  if (!response.ok || data.code !== 0) {
    throw new Error(data.message || `HTTP error: ${response.status}`)
  }

  return data.data as T
}

const jsonBody = (body: unknown): RequestInit => ({
  method: 'POST',
  body: JSON.stringify(body),
})

export const api = {
  // 涨停数据
  getLimitUpPool: (params?: Record<string, string | number>) => {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return fetchApi(`/limit-up/pool${query}`, { method: 'GET' })
  },
  getLimitUpLadder: () =>
    fetchApi('/limit-up/ladder', { method: 'GET' }),
  getHotStocks: (period = '24h') =>
    fetchApi(`/limit-up/hot-stocks?period=${period}`, { method: 'GET' }),
  getSkyrocket: (period = '24h') =>
    fetchApi(`/limit-up/skyrocket?period=${period}`, { method: 'GET' }),

  // 大盘与板块
  getMarketSnapshot: (thscodes?: string) =>
    fetchApi(`/market/snapshot${thscodes ? `?thscodes=${thscodes}` : ''}`, { method: 'GET' }),
  getKline: (thscode: string, days = 30) =>
    fetchApi(`/market/kline?thscode=${thscode}&days=${days}`, { method: 'GET' }),
  getIndices: (tag = 'cn_concept') =>
    fetchApi(`/market/indices?tag=${tag}`, { method: 'GET' }),
  getIndexConstituents: (thscode: string) =>
    fetchApi(`/market/index-constituents?thscode=${thscode}`, { method: 'GET' }),
  getIndexSnapshot: (thscodes: string) =>
    fetchApi(`/market/index-snapshot?thscodes=${thscodes}`, { method: 'GET' }),
  getThemeIndexHistory: (thscode: string, days = 20) =>
    fetchApi(`/themes/index-history?thscode=${thscode}&days=${days}`, { method: 'GET' }),
  getAnomalyAnalysis: (tagCodes?: string) =>
    fetchApi(`/market/anomaly${tagCodes ? `?tag_codes=${tagCodes}` : ''}`, { method: 'GET' }),
  getCalendar: () =>
    fetchApi('/market/calendar', { method: 'GET' }),

  // 我的题材
  getMyThemes: () =>
    fetchApi('/themes/mine', { method: 'GET' }),
  createMyTheme: (name: string, category = '未分组') =>
    fetchApi('/themes/mine', jsonBody({ name, category })),
  deleteMyTheme: (id: number) =>
    fetchApi(`/themes/mine/${id}`, { method: 'DELETE' }),
  getMyTheme: (id: number) =>
    fetchApi(`/themes/mine/${id}`, { method: 'GET' }),
  addMyThemeStock: (themeId: number, stock: { thscode: string; ticker: string; name: string }) =>
    fetchApi(`/themes/mine/${themeId}/stocks`, jsonBody(stock)),
  removeMyThemeStock: (themeId: number, thscode: string) =>
    fetchApi(`/themes/mine/${themeId}/stocks/${thscode}`, { method: 'DELETE' }),

  // 龙虎榜
  getDragonTigerList: (boardType = 'all', date?: string) =>
    fetchApi(`/dragon-tiger/list?board_type=${boardType}${date ? `&date=${date}` : ''}`, { method: 'GET' }),
}
