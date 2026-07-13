from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Query

from app.services.fuyao_client import fuyao_client

router = APIRouter(prefix="/market", tags=["大盘与板块"])


@router.get("/snapshot")
async def get_market_snapshot(thscodes: Optional[str] = Query(None, description="逗号分隔的代码")):
    """获取行情快照"""
    data = await fuyao_client.get_snapshot(thscodes=thscodes)
    return data


@router.get("/kline")
async def get_kline(
    thscode: str = Query(..., description="标的代码"),
    days: int = Query(30, ge=1, le=3650, description="取最近N天"),
    adjust: str = Query("forward", description="复权方式"),
):
    """获取历史K线"""
    end = datetime.now()
    start = end - timedelta(days=days)
    data = await fuyao_client.get_historical_kline(
        thscode=thscode,
        start=int(start.timestamp() * 1000),
        end=int(end.timestamp() * 1000),
        adjust=adjust,
    )
    return data


@router.get("/indices")
async def get_index_list(tag: str = Query("cn_concept", description="cn_concept/region/tszs/industry")):
    """获取同花顺指数列表"""
    data = await fuyao_client.get_ths_index_list(tag=tag)
    return data


@router.get("/index-constituents")
async def get_index_constituents(thscode: str = Query(..., description="指数 thscode")):
    """获取指数成分股"""
    data = await fuyao_client.get_ths_index_constituents(thscode=thscode)
    return data


@router.get("/index-snapshot")
async def get_index_snapshot(thscodes: str = Query(..., description="逗号分隔的指数代码")):
    """获取指数行情快照"""
    data = await fuyao_client.get_index_snapshot(thscodes=thscodes)
    return data


@router.get("/anomaly")
async def get_anomaly_analysis(
    tag_codes: Optional[str] = Query(None, description="LIMIT_UP,LIMIT_DOWN,SHARP_RISE,SHARP_FALL")
):
    """获取个股异动原因"""
    data = await fuyao_client.get_anomaly_analysis(tag_codes=tag_codes)
    return data


@router.get("/calendar")
async def get_calendar():
    """获取交易日历"""
    data = await fuyao_client.get_calendar()
    return data
