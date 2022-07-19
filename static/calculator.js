// 逻辑实现
var symbol = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "*", "+", "=", "-", ".", "/"
] // 符号定义

// 生成数字面板
for (let i = 0; i < symbol.length / 4; i++) {
    var div = document.createElement("div")
    for (let j = 0; j < symbol.length / 4; j++) {
        var input = document.createElement("input")
        input.type = "button"
        input.className = "buttons"
        input.value = symbol[i * 4 + j]
        input.id = i * 4 + j
        div.appendChild(input)
        input.onclick = function () {
            if (equation.value.includes("=")) {
                equation.value = ""
                result.value = ""
            }
            equation.value += this.value
        }
        // 修正加减乘除键盘
        if (input.id == 10 || input.id == 11 || input.id == 13 || input.id == 15) {
            input.onclick = function () {
                if (result.value != 0) { // 如果结果不为0，按下任意运算符按钮后将计算结果作为算式中的第一个数
                    equation.value = result.value
                    result.value = ""
                }
                if (!isNaN(parseFloat(equation.value.substring(equation.value.length - 1))) && isFinite(equation.value.substring(equation.value.length - 1))) { // 确保算式中最后一位不是运算符才能输入运算符
                    equation.value += this.value
                }
            }
        }
        // 小数点修正
        if (input.id == 14) {
            input.onclick = () => {
                // 如果未输入算式或算式最后一位不是数字就不允许输入小数点
                if (!isNaN(parseFloat(equation.value.substring(equation.value.length - 1))) && isFinite(equation.value.substring(equation.value.length - 1))) {
                    equation.value += "."
                } else {
                    return
                }
            }
        }
    }
    document.body.appendChild(div)
}

// 按下等于号的时候就计算出结果并显示在result框中，12是等于号的id
var equal_button = document.getElementById("12")
equal_button.onclick = () => {
    var results
    try {
        if (equation.value == "" || equation.value.includes("=")) { // 如果未输入算式或算式中已经有等于号就返回
            return
        }
        results = eval(equation.value)
        if (!results | 0 === results) {
            results = results.toFixed(2)
        }
    } catch (error) {
        alert(error)
        return
    }
    equation.value += "="
    result.value = results
}

// 清零功能
var clear_button = document.getElementById("CE")
clear_button.onclick = () => {
    equation.value = ""
    result.value = ""
}

// 退格功能
var backspace_button = document.getElementById("backspace")
backspace_button.onclick = () => {
    result.value = ""
    var back = equation.value
    var backed = back.substring(0, back.length - 1)
    equation.value = backed
}

// 平方功能
var square_button = document.getElementById("square")
square_button.onclick = () => {
    result.value = Math.pow(equation.value, 2)
}

// 符号变换功能
var symbol_change_button = document.getElementById("+/-")
symbol_change_button.onclick = () => {
    if (result.value != 0) {
        result.value = -result.value
    } else {
        equation.value = -equation.value
    }
}