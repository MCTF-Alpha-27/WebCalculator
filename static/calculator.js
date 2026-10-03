// ============================================================
// 计算器前端逻辑 - 通过封装的 API 模块与后端通信
// ============================================================

var symbol = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "*", "+", "=", "-", ".", "/"
]

// 生成数字面板
for (let i = 0; i < symbol.length / 4; i++) {
    const div = document.createElement("div")
    for (let j = 0; j < symbol.length / 4; j++) {
        const input = document.createElement("input")
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
            input.onclick = () => handleOperator(input.value)
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

// 统一处理运算符输入
function handleOperator(operator) {
    // 如果有前一个计算结果，在此基础上继续计算
    if (result.value !== "" && result.value !== "0") {
        equation.value = result.value
        result.value = ""
    }
    // 确保算式中最后一位是数字才能输入运算符
    if (!isNaN(parseFloat(equation.value.substring(equation.value.length - 1))) && isFinite(equation.value.substring(equation.value.length - 1))) {
        equation.value += operator
    }
}

// 特殊结果图片映射
const SPECIAL_RESULTS = {
    "114514": "homo.jpg",
    "1919810": "homo.jpg"
};

// 显示特殊结果图片
function showSpecialImage(result) {
    // 移除已存在的特殊图片
    const existing = document.querySelector(".special-image");
    if (existing) existing.remove();
    
    const imageName = SPECIAL_RESULTS[String(result)];
    if (imageName) {
        const img = document.createElement("img");
        img.src = "/static/" + imageName;
        img.className = "special-image";
        img.style.marginTop = "20px";
        img.style.maxWidth = "300px";
        document.body.appendChild(img);
    }
}

// 按下等于号的时候就计算出结果并显示在result框中，12是等于号的id
var equal_button = document.getElementById("12")
equal_button.onclick = async () => {
    if (equation.value == "" || equation.value.includes("=")) { // 如果未输入算式或算式中已经有等于号就返回
        return
    }
    try {
        const results = await API.calculate(equation.value)
        equation.value += "="
        result.value = results
        showSpecialImage(results)
    } catch (error) {
        alert(error.message)
    }
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

// 平方功能 - 通过后端 API 计算
var square_button = document.getElementById("square")
square_button.onclick = async () => {
    if (equation.value == "" || equation.value.includes("=")) {
        return
    }
    try {
        const results = await API.calculate(equation.value + "**2")
        result.value = results
    } catch (error) {
        alert(error.message)
    }
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
