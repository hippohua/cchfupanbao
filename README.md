# 复盘宝 - 个人A股复盘分析工具

## 项目概述

一个前后端分离的A股复盘分析工具，对标复盘宝(fupanbao.top)，使用同花顺 Fuyao API 作为数据源。

## 技术栈

### 后端
- Python 3.13 + FastAPI
- httpx (异步HTTP客户端)
- APScheduler (定时任务，收盘后自动拉数)
- SQLite (数据缓存)

### 前端
- React 19 + TypeScript
- Vite 6 (构建工具)
- TailwindCSS 3 (样式，红色主题)
- ECharts (图表)
- React Router 7 (路由)
- lucide-react (图标)

## 目录结构

```
fupanbao/
├── backend/           # Python FastAPI 后端
│   ├── app/
│   │   ├── api/       # API路由 (limit_up / market / dragon_tiger)
│   │   ├── services/  # Fuyao API 客户端封装
│   │   ├── models/    # 数据模型
│   │   ├── config.py  # 配置管理
│   │   └── main.py    # FastAPI 入口
│   ├── requirements.txt
│   └── .env           # API Key 配置
├── frontend/          # React 前端
│   ├── src/
│   │   ├── components/# 页面组件
│   │   │   ├── Header.tsx        # 顶部导航 + 日期选择
│   │   │   ├── Sidebar.tsx       # 左侧菜单
│   │   │   ├── Layout.tsx        # 布局框架
│   │   │   ├── MarketDashboard.tsx # 大盘情绪仪表盘
│   │   │   ├── LimitUpLadder.tsx   # 连板天梯
│   │   │   ├── ConceptStats.tsx    # 涨停板块统计
│   │   │   ├── ShortMarket.tsx     # 短线市场总览
│   │   │   └── DragonTiger.tsx     # 龙虎榜
│   │   ├── pages/     # 页面路由
│   │   │   ├── Home.tsx          # 复盘首页
│   │   │   └── Theme.tsx         # 题材复盘
│   │   ├── api/       # 前端API客户端
│   │   └── types/     # TypeScript类型定义
│   ├── index.html
│   └── package.json
├── start.bat          # Windows一键启动脚本
└── README.md
```

## 快速开始

### 1. 配置 API Key

编辑 `backend/.env`，将 `your_api_key_here` 替换为你的 Fuyao API Key：

```
FUYAO_API_KEY=你的实际API Key
FUYAO_BASE_URL=https://fuyao.aicubes.cn
```

API Key 获取：https://fuyao.aicubes.cn/docs/

### 2. 启动后端

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

后端运行在 http://localhost:8000
API 文档：http://localhost:8000/docs

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端运行在 http://localhost:5173

### 4. Windows 一键启动

直接双击 `start.bat`

## 功能模块

| 模块 | 说明 | 数据来源 |
|------|------|----------|
| 大盘情绪仪表盘 | 上证/深成指/创业板/科创50指数 + 涨跌家数/涨停数/封板率/连板高度 | Fuyao snapshot + limit-up-pool |
| 连板天梯 | 按连板高度分层(7板+→2板)，标注晋级状态(封板/未封/进行中) | Fuyao limit-up-ladder |
| 涨停板块统计 | 按涨停原因分组，展示涨停数/涨停股/最高封单 | Fuyao limit-up-pool |
| 短线市场总览 | 一字板/T字板/天地板/地天板/反包/大面股/大长腿分类 | Fuyao limit-up-pool (计算) |
| 龙虎榜 | 按全部/机构/游资分类，展示净买入/买卖明细/游资席位 | Fuyao dragon-tiger-list |
| 题材复盘 | 同花顺概念板块列表 + 成分股查看 | Fuyao ths-index-list + constituents |

## API 路由

| 路由 | 说明 |
|------|------|
| `GET /api/limit-up/pool` | 涨停股票池 |
| `GET /api/limit-up/ladder` | 连板天梯 |
| `GET /api/limit-up/hot-stocks` | 热股榜单 |
| `GET /api/limit-up/skyrocket` | 飙升榜 |
| `GET /api/market/snapshot` | 行情快照 |
| `GET /api/market/kline` | 历史K线 |
| `GET /api/market/indices` | 同花顺指数列表 |
| `GET /api/market/index-constituents` | 指数成分股 |
| `GET /api/market/index-snapshot` | 指数行情快照 |
| `GET /api/market/anomaly` | 个股异动原因 |
| `GET /api/market/calendar` | 交易日历 |
| `GET /api/dragon-tiger/list` | 龙虎榜数据 |

## 配色说明

采用中国A股惯例：红涨绿跌
- 上涨/涨停：红色 (#ef4444)
- 下跌/跌停：绿色 (#22c55e)
- 主题色：红色 (#b91c1c)

## 数据来源

- 同花顺 Fuyao API (https://fuyao.aicubes.cn/docs/)
