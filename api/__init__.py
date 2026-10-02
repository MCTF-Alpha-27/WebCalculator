from flask import Blueprint

api_bp = Blueprint("api", __name__, url_prefix="/api")

from . import calculator, health

__all__ = ["api_bp"]
