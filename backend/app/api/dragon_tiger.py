from typing import Optional

from fastapi import APIRouter, Query

from app.services.fuyao_client import fuyao_client

router = APIRouter(prefix="/dragon-tiger", tags=["龙虎榜"])


@router.get("/list")
async def get_dragon_tiger_list(
    board_type: str = Query("all", description="all/org/hot_money"),
    date: Optional[str] = Query(None, description="yyyy-MM-dd"),
):
    """获取龙虎榜数据"""
    data = await fuyao_client.get_dragon_tiger_list(board_type=board_type, date=date)
    return data
