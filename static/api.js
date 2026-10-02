/**
 * API 封装模块 - 统一管理所有后端接口调用
 */

const API = {
    /**
     * 计算数学表达式
     * @param {string} expression - 数学表达式，如 "2 + 3 * 4"
     * @returns {Promise<number>} 计算结果
     * @throws {Error} 计算失败时抛出错误
     */
    async calculate(expression) {
        const response = await fetch("/api/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ expression })
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error || "计算失败");
        }
        return data.result;
    },

    /**
     * 健康检查
     * @returns {Promise<object>} 服务状态信息
     */
    async healthCheck() {
        const response = await fetch("/api/health");
        return await response.json();
    }
};
