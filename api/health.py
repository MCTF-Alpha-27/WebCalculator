"""
健康检查 API 路由
"""

from flask import jsonify
from . import api_bp


@api_bp.route("/health", methods=["GET"])
def health_check():
    """健康检查端点"""
    return jsonify({"status": "ok", "service": "flask-calculator"})
