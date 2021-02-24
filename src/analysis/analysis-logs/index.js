/**
 * @description 分析日志
 * @author 双越
 */

const analysisLogs = require('./analysis')
const writeDB = require('./writeDB')

/**
 * 分析日志文件，结果入库
 * @param {string} accessLogPath access log 目录
 */
async function analysisLogsAndWriteDB(accessLogPath) {
    const result = await analysisLogs(accessLogPath)
    await writeDB(result)
    console.log('----------- 日志结果入库 完成 -----------')
}

module.exports = analysisLogsAndWriteDB
