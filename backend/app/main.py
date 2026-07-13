from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.api import limit_up, market, dragon_tiger, themes

app = FastAPI(
    title="复盘宝 API",
    description="个人A股复盘分析工具后端",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 全局异常处理 — 返回结构化 JSON 而非 500 空响应
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "code": -1,
            "message": str(exc),
            "request_id": "",
            "data": None,
        },
    )

# 注册路由（统一 /api 前缀，与前端请求路径一致）
app.include_router(limit_up.router, prefix="/api")
app.include_router(market.router, prefix="/api")
app.include_router(dragon_tiger.router, prefix="/api")
app.include_router(themes.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "复盘宝 API 运行中", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}
