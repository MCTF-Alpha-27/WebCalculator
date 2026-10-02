"""
Flask Calculator - 真正的 Flask 项目
后端负责计算逻辑，前端通过 API 与后端通信
"""

from flask import Flask, render_template, jsonify
from api import api_bp


def create_app():
    """应用工厂函数"""
    app = Flask(__name__)
    app.json.ensure_ascii = False  # 禁止将中文转义为 \uXXXX（Flask 3.0+ 新配置）

    # 注册 API 蓝图
    app.register_blueprint(api_bp)

    # 主页路由
    @app.route("/")
    def index():
        """渲染计算器主页"""
        return render_template("calculator.html")

    # 错误处理
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"success": False, "error": "接口不存在"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"success": False, "error": "服务器内部错误"}), 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
