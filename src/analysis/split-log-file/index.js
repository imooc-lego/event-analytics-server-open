/**
 * @description 拆分日志文件
 * @author 双越
 */

const path = require('path')
const fse = require('fs-extra')
const { accessLogPath } = require('../../config/index')
const { genYesterdayLogFileName, formatNow } = require('../utils/util')
const { DIST_FOLDER_NAME } = require('../config/const')

/**
 * @description 拆分日志文件
 */
function splitLogFile() {
    console.log('----------- 拆分日志文件 开始 -----------')
    console.log('当前的时间', formatNow())

    // 源文件 access.log 文件
    const accessLogFile = path.join(accessLogPath, 'access.log')
    console.log('1. access.log 文件', accessLogFile)

    // 创建目标文件夹。即拆分之后的文件，都放在这个文件夹里
    const distFolder = path.join(accessLogPath, DIST_FOLDER_NAME)
    fse.ensureDirSync(distFolder) // 创建文件夹（API 本意是确定是否存在，但不存在时会自动帮助创建）
    console.log('2. 目标文件夹', distFolder)

    // 创建目标文件，文件名是昨天的日期。因为这是离线计算处理昨天的日志
    const distFile = path.join(distFolder, genYesterdayLogFileName())
    console.log('3. 目标文件', distFile)
    fse.ensureFileSync(distFile) // 创建文件（API 本意是确定是否存在，但不存在时会自动帮助创建）
    fse.outputFileSync(distFile, '') // 防止重复，先清空
    console.log('4. 创建并清空目标文件', distFile)

    // 拷贝
    fse.copySync(accessLogFile, distFile)
    console.log('5. 拷贝')

    // 清空 access.log
    fse.outputFileSync(accessLogFile, '')
    console.log('6. 清空 access.log')

    console.log('----------- 拆分日志文件 结束 -----------')
}

module.exports = splitLogFile
