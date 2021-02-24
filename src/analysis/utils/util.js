/**
 * @description 日志相关的工具函数
 * @author 双越
 */

const { format } = require('date-fns')

/**
 * 获取当前时间
 */
function formatNow() {
    const d = new Date()
    return format(d, 'yyyy-MM-dd HH:mm:ss')
}

/**
 * @description 获取昨天的 Date 对象
 */
function yesterdayDate() {
    const d = new Date()
    const y = new Date(d.getTime() - 24 * 60 * 60 * 1000) // 24h 之前
    return y
}

/**
 * 日志文件格式
 * @param {Date} d 日期
 */
function formatLogFile(d) {
    const f = format(d, 'yyyy-MM-dd')
    return `${f}.log`
}

/**
 * @description 生成昨天日志（按天拆分）文件
 */
function genYesterdayLogFileName() {
    const y = yesterdayDate()
    return formatLogFile(y)
}

/**
 * 生成一个历史日志文件
 * @param {number} days 历史天数
 */
function genOldLogFileName(days = 0) {
    if (!days) {
        throw new Error('genOldLogFileName 参数错误')
    }

    let d = new Date()
    d = new Date(d.getTime() - days * 24 * 60 * 60 * 1000)
    return formatLogFile(d)
}

module.exports = {
    yesterdayDate,
    genYesterdayLogFileName,
    formatNow,
    genOldLogFileName,
}
