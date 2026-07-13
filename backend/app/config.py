import os
from pathlib import Path

from dotenv import load_dotenv

# 加载 .env 文件
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class Settings:
    """应用配置"""

    # Fuyao API
    FUYAO_API_KEY: str = os.getenv("FUYAO_API_KEY", "")
    FUYAO_BASE_URL: str = os.getenv("FUYAO_BASE_URL", "https://fuyao.aicubes.cn")

    # 数据库
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./fupanbao.db")

    # CORS
    ALLOW_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000"]

    # 缓存配置
    CACHE_TTL_SECONDS: int = 300  # 5分钟缓存


settings = Settings()
