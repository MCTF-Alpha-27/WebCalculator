"""
安全计算引擎 - 使用 AST 解析表达式，避免 eval() 的安全风险
"""

import ast
import operator

# 定义允许的操作符映射
OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Pow: operator.pow,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
    ast.Mod: operator.mod,
    ast.FloorDiv: operator.floordiv,
}


def safe_eval(expr: str) -> float:
    """
    安全地计算数学表达式。
    使用 AST 解析，只允许数学运算，杜绝代码注入。
    """
    def _eval(node):
        if isinstance(node, ast.Constant):          # Python 3.8+
            if isinstance(node.value, (int, float)):
                return node.value
            raise ValueError(f"不支持的常量类型: {type(node.value)}")
        elif isinstance(node, ast.Num):             # Python 3.7 及以下兼容
            return node.n
        elif isinstance(node, ast.BinOp):
            left = _eval(node.left)
            right = _eval(node.right)
            op_type = type(node.op)
            if op_type not in OPERATORS:
                raise ValueError(f"不支持的操作符: {op_type.__name__}")
            return OPERATORS[op_type](left, right)
        elif isinstance(node, ast.UnaryOp):
            operand = _eval(node.operand)
            op_type = type(node.op)
            if op_type not in OPERATORS:
                raise ValueError(f"不支持的一元操作符: {op_type.__name__}")
            return OPERATORS[op_type](operand)
        elif isinstance(node, ast.Expression):
            return _eval(node.body)
        else:
            raise ValueError(f"不支持的表达式节点: {type(node).__name__}")

    # 解析表达式为 AST
    tree = ast.parse(expr, mode="eval")
    return _eval(tree)
