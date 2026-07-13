from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from app.services.fuyao_client import fuyao_client
from app.services.theme_store import theme_store

router = APIRouter(prefix="/themes", tags=["题材管理"])


def ok(data):
    return {"code": 0, "message": "ok", "request_id": "", "data": data}


class ThemeCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    category: str = Field("未分组", max_length=50)


class ThemeStockCreate(BaseModel):
    thscode: str
    ticker: str
    name: str


@router.get("/mine")
async def list_my_themes():
    return ok({"item": theme_store.list_themes("mine")})


@router.post("/mine")
async def create_my_theme(payload: ThemeCreate):
    return ok(theme_store.create_theme(payload.name.strip(), payload.category.strip() or "未分组"))


@router.delete("/mine/{theme_id}")
async def delete_my_theme(theme_id: int):
    theme_store.delete_theme(theme_id)
    return ok({"id": theme_id})


@router.get("/mine/{theme_id}")
async def get_my_theme(theme_id: int):
    try:
        return ok(theme_store.get_theme(theme_id))
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/mine/{theme_id}/stocks")
async def add_my_theme_stock(theme_id: int, payload: ThemeStockCreate):
    try:
        return ok(theme_store.add_stock(theme_id, payload.thscode, payload.ticker, payload.name))
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.delete("/mine/{theme_id}/stocks/{thscode}")
async def remove_my_theme_stock(theme_id: int, thscode: str):
    try:
        return ok(theme_store.remove_stock(theme_id, thscode))
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.get("/index-history")
async def get_theme_index_history(
    thscode: str = Query(..., description="题材指数 thscode"),
    days: int = Query(20, ge=1, le=250),
):
    end = datetime.now()
    start = end - timedelta(days=days * 2)
    data = await fuyao_client.get_index_historical(
        thscode=thscode,
        start=int(start.timestamp() * 1000),
        end=int(end.timestamp() * 1000),
    )
    return data
