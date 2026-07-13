from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Query

from app.services.fuyao_client import fuyao_client

router = APIRouter(prefix="/limit-up", tags=["涨停数据"])


@router.get("/pool")
async def get_limit_up_pool(
    date: Optional[str] = Query(None, description="日期 yyyy-MM-dd"),
    page: int = Query(1, ge=1),
    size: int = Query(200, ge=1, le=200),
    sort_field: str = Query("limit_up_time", description="排序字段"),
    sort_dir: str = Query("desc", description="排序方向"),
):
    """获取涨停股票池"""
    date_ms = None
    if date:
        dt = datetime.strptime(date, "%Y-%m-%d")
        date_ms = int(dt.timestamp() * 1000)

    data = await fuyao_client.get_limit_up_pool(
        date_ms=date_ms, page=page, size=size, sort_field=sort_field, sort_dir=sort_dir
    )
    return data


@router.get("/ladder")
async def get_limit_up_ladder():
    """获取连板天梯（近30个交易日）"""
    data = await fuyao_client.get_limit_up_ladder()
    return data


@router.get("/hot-stocks")
async def get_hot_stocks(period: str = Query("24h", description="24h 或 1h")):
    """获取热股榜单"""
    data = await fuyao_client.get_hot_stock_list(period=period)
    return data


@router.get("/skyrocket")
async def get_skyrocket(period: str = Query("24h", description="24h 或 1h")):
    """获取飙升榜"""
    data = await fuyao_client.get_skyrocket_list(period=period)
    return data
