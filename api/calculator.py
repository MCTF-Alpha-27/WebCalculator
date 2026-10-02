"""
计算器 API 路由
"""

from flask import request, jsonify
from . import api_bp
from engine import safe_eval


@api_bp.route("/calculate", methods=["POST"])
def calculate():
    """
    计算数学表达式。

    请求格式（JSON）:
        {"expression": "2 + 3 * 4"}

    响应格式（JSON）:
        成功: {"success": true, "result": 14}
        失败: {"success": false, "error": "错误信息"}
    """
    data = request.get_json(silent=True)
    if not data or "expression" not in data:
        return jsonify({"success": False, "error": "缺少 expression 参数"}), 400

    expression = data["expression"].strip()
    if not expression:
        return jsonify({"success": False, "error": "表达式不能为空"}), 400

    if len(expression) > 1000:
        return jsonify({"success": False, "error": "表达式过长"}), 400

    expression = expression.replace("^", "**")

    try:
        result = safe_eval(expression)
        # 处理浮点数精度问题
        if isinstance(result, float):
            if result == int(result) and abs(result) < 1e15:
                result = int(result)
            else:
                result = round(result, 10)
        return jsonify({"success": True, "result": result})
    except ZeroDivisionError:
        return jsonify({"success": False, "error": "除数不能为零"}), 400
    except (ValueError, SyntaxError) as e:
        return jsonify({"success": False, "error": f"表达式格式错误: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": f"计算错误: {str(e)}"}), 500
