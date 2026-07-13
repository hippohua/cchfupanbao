import asyncio
from datetime import datetime, timedelta
from typing import Any, Optional

import httpx

from app.config import settings


class FuyaoClient:
    """同花顺 Fuyao API 客户端"""

    def __init__(self):
        self.base_url = settings.FUYAO_BASE_URL.rstrip("/")
        self.api_key = settings.FUYAO_API_KEY
        self.headers = {"X-api-key": self.api_key}
        self._client: Optional[httpx.AsyncClient] = None

    async def _get_client(self) -> httpx.AsyncClient:
        if self._client is None or self._client.is_closed:
            self._client = httpx.AsyncClient(timeout=30.0)
        return self._client

    async def _request(self, method: str, endpoint: str, **kwargs) -> dict:
        """发送请求到 Fuyao API"""
        client = await self._get_client()
        url = f"{self.base_url}{endpoint}"
        headers = kwargs.pop("headers", {})
        headers.update(self.headers)

        try:
            response = await client.request(method, url, headers=headers, **kwargs)
            response.raise_for_status()
            data = response.json()

            if data.get("code") != 0:
                raise Exception(f"Fuyao API error: {data.get('message', 'Unknown error')} (code={data.get('code')})")

            return data
        except httpx.HTTPStatusError as e:
            raise Exception(f"HTTP error: {e.response.status_code} - {e.response.text}")
        except Exception as e:
            raise Exception(f"Request failed: {str(e)}")

    async def get_limit_up_pool(
        self,
        date_ms: Optional[int] = None,
        page: int = 1,
        size: int = 200,
        sort_field: str = "limit_up_time",
        sort_dir: str = "desc",
    ) -> dict:
        """获取涨停股票池

        Args:
            date_ms: 查询交易日 Unix 毫秒戳
            page: 页码
            size: 分页大小 (1-200)
            sort_field: 排序字段 (last_price/continue_day_cnt/seal_money/limit_up_time)
            sort_dir: 排序方向 (asc/desc)
        """
        params = {
            "page": page,
            "size": size,
            "sort_field": sort_field,
            "sort_dir": sort_dir,
        }
        if date_ms:
            params["date_ms"] = date_ms

        return await self._request("GET", "/api/a-share/special-data/limit-up-pool", params=params)

    async def get_limit_up_ladder(self) -> dict:
        """获取连板天梯（近30个交易日）"""
        return await self._request("GET", "/api/a-share/special-data/limit-up-ladder")

    async def get_dragon_tiger_list(
        self,
        board_type: str = "all",
        date: Optional[str] = None,
    ) -> dict:
        """获取龙虎榜数据

        Args:
            board_type: 榜单类型 (all/org/hot_money)
            date: 目标交易日，格式 yyyy-MM-dd
        """
        params = {"board_type": board_type}
        if date:
            params["date"] = date
        return await self._request("GET", "/api/a-share/special-data/dragon-tiger-list", params=params)

    async def get_snapshot(self, thscodes: Optional[str] = None) -> dict:
        """获取行情快照

        Args:
            thscodes: 逗号分隔的 thscode 列表
        """
        params = {}
        if thscodes:
            params["thscodes"] = thscodes
        return await self._request("GET", "/api/a-share/prices/snapshot", params=params)

    async def get_historical_kline(
        self,
        thscode: str,
        start: int,
        end: int,
        interval: str = "1d",
        adjust: str = "forward",
    ) -> dict:
        """获取历史K线

        Args:
            thscode: 单只标的 thscode
            start: 起始时间毫秒戳
            end: 结束时间毫秒戳
            interval: K线周期 (1d)
            adjust: 复权方式 (none/forward/backward)
        """
        params = {
            "thscode": thscode,
            "start": start,
            "end": end,
            "interval": interval,
            "adjust": adjust,
        }
        return await self._request("GET", "/api/a-share/prices/historical", params=params)

    async def get_ths_index_list(self, tag: str = "cn_concept") -> dict:
        """获取同花顺指数列表

        Args:
            tag: 标签 (cn_concept/region/tszs/industry)
        """
        params = {"tag": tag}
        return await self._request("GET", "/api/a-share-index/catalog/ths-index-list", params=params)

    async def get_ths_index_constituents(self, thscode: str) -> dict:
        """获取同花顺指数成分股

        Args:
            thscode: 指数 thscode
        """
        params = {"thscode": thscode}
        return await self._request("GET", "/api/a-share-index/constituents/ths-stock-list", params=params)

    async def get_index_snapshot(self, thscodes: str) -> dict:
        """获取指数行情快照

        Args:
            thscodes: 逗号分隔的指数 thscode 列表
        """
        params = {"thscodes": thscodes}
        return await self._request("GET", "/api/a-share-index/prices/snapshot", params=params)

    async def get_index_historical(
        self,
        thscode: str,
        start: int,
        end: int,
        interval: str = "1d",
        adjust: str = "none",
    ) -> dict:
        """获取指数历史K线"""
        params = {
            "thscode": thscode,
            "start": start,
            "end": end,
            "interval": interval,
            "adjust": adjust,
        }
        return await self._request("GET", "/api/a-share-index/prices/historical", params=params)

    async def get_hot_stock_list(self, period: str = "24h") -> dict:
        """获取热股榜单

        Args:
            period: 24h 或 1h
        """
        params = {"period": period}
        return await self._request("GET", "/api/a-share/special-data/hot-stock-list", params=params)

    async def get_skyrocket_list(self, period: str = "24h") -> dict:
        """获取飙升榜

        Args:
            period: 24h 或 1h
        """
        params = {"period": period}
        return await self._request("GET", "/api/a-share/special-data/skyrocket-list", params=params)

    async def get_anomaly_analysis(self, tag_codes: Optional[str] = None) -> dict:
        """获取个股异动原因列表

        Args:
            tag_codes: 逗号分隔的标签 (LIMIT_UP/LIMIT_DOWN/SHARP_RISE/SHARP_FALL/RAPID_RALLY/RAPID_DECLINE)
        """
        params = {}
        if tag_codes:
            params["tag_codes"] = tag_codes
        return await self._request("GET", "/api/a-share/special-data/anomaly-analysis-list", params=params)

    async def get_anomaly_analysis_by_stock(self, thscodes: str) -> dict:
        """按股票批量查询异动原因

        Args:
            thscodes: 逗号分隔的 thscode 列表，最多50个
        """
        params = {"thscodes": thscodes}
        return await self._request("GET", "/api/a-share/special-data/anomaly-analysis-stock", params=params)

    async def get_calendar(self) -> dict:
        """获取交易日历"""
        return await self._request("GET", "/api/a-share/calendar/list")

    async def search_tickers(self, keyword: str) -> dict:
        """搜索标的

        Args:
            keyword: 搜索关键词（thscode/ticker/名称）
        """
        params = {"keyword": keyword}
        return await self._request("GET", "/api/meta/tickers/search", params=params)

    async def close(self):
        """关闭 HTTP 客户端"""
        if self._client and not self._client.is_closed:
            await self._client.aclose()


# 全局单例
fuyao_client = FuyaoClient()
