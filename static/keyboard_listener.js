// 键盘事件监听器
document.body.onkeydown = (e) => {
    e.preventDefault()

    // 回车键或等于键
    if (e.key == "Enter" || e.key == "=") {
        try {
            if (equation.value == "" || equation.value.includes("=")) { // 如果未输入算式或算式中已经有等于号就返回
                return
            }
            results = eval(equation.value)
        } catch (error) {
            alert(error)
            return
        }
        equation.value += "="
        result.value = results
    }

    // 清零键
    if (e.key == "Delete") {
        equation.value = ""
        result.value = ""
    }

    // 退格键
    if (e.key == "Backspace") {
        result.value = ""
        var back = equation.value
        var backed = back.substring(0, back.length - 1)
        equation.value = backed
    }

    // 运算符号键
    // 确保算式中最后一位不是运算符才能输入运算符
    if (!isNaN(parseFloat(equation.value.substring(equation.value.length - 1))) && isFinite(equation.value.substring(equation.value.length - 1))) {
        if (e.key == "+") { // 加号
            equation.value += "+"
        }
    
        if (e.key == "-") { // 减号
            equation.value += "-"
        }
    
        if (e.key == "*") { // 乘号
            equation.value += "*"
        }
    
        if (e.key == "/") { // 除号
            equation.value += "/"
        }
    }

    if (e.key == ".") { // 小数点
        // 如果未输入算式或算式中已经包含小数点就不允许输入小数点
        if (!isNaN(parseFloat(equation.value.substring(equation.value.length - 1))) && isFinite(equation.value.substring(equation.value.length - 1))) {
            equation.value += "."
        } else {
            return
        }
    }

    // 如果按下数字键时算式已经包含等于号，那就清空算式，重新书写
    if (equation.value.includes("=") && !isNaN(parseFloat(e.key)) && isFinite(e.key)) {
        equation.value = ""
        result.value = ""
    }
    equation.value += document.getElementById(e.key).value // 数字键
}