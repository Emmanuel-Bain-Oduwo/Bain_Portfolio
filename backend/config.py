from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = "sqlite:///./portfolio.db"

    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""

    contact_email: str = "emmanuelbain@kemirix.com"
    from_email: str = "emmanuelbain@kemirix.com"
    from_name: str = "Emmanuel Bain Oduwo Portfolio"

    frontend_url: str = "https://www.bain.me"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()