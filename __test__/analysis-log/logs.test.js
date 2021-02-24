/**
 * @description 拆分日志文件 test
 * @author 双越
 */

const path = require('path')
const fse = require('fs-extra')
const splitLogFile = require('../../src/analysis/split-log-file/index')
const rmLogs = require('../../src/analysis/rm-logs/index')
const analysisLogs = require('../../src/analysis/analysis-logs/analysis')
const { genYesterdayLogFileName, genOldLogFileName } = require('../../src/analysis/utils/util')

const LOGS_FOLDER_PATH = path.join(__dirname, 'logs')
const ACCESS_LOG_TXT_PATH = path.join(__dirname, 'access.log.txt')
const ACCESS_LOG_PATH = path.join(LOGS_FOLDER_PATH, 'access.log')
const SPLIT_LOGS_FOLDER_PATH = path.join(LOGS_FOLDER_PATH, 'logs_by_day')

describe('拆分日志', () => {
    beforeEach(() => {
        // 清空所有日志，每次 test 都重新创建，避免相互影响（重要）
        if (fse.existsSync(LOGS_FOLDER_PATH)) fse.removeSync(LOGS_FOLDER_PATH)

        // 创建日志目录
        fse.ensureDirSync(LOGS_FOLDER_PATH)
        // 写入 access.log （拷贝）
        fse.copySync(ACCESS_LOG_TXT_PATH, ACCESS_LOG_PATH)
    })

    test('按天拆分日志文件', () => {
        // 拆分日志
        splitLogFile(LOGS_FOLDER_PATH)

        // 检查拆分出来的日志
        const splitLogFileName = path.join(SPLIT_LOGS_FOLDER_PATH, genYesterdayLogFileName())
        // console.log('splitLogFileName', splitLogFileName)
        const isExist = fse.existsSync(splitLogFileName)
        expect(isExist).toBe(true)
    })

    test('删除历史日志文件', () => {
        // 模拟一个历史日志
        fse.ensureDirSync(SPLIT_LOGS_FOLDER_PATH)
        const oldLogFileName = genOldLogFileName(100) // 100 天之前的日志文件
        const oldLogFilePath = path.join(SPLIT_LOGS_FOLDER_PATH, oldLogFileName)
        fse.ensureFileSync(oldLogFilePath)

        // 删除历史日志
        rmLogs(LOGS_FOLDER_PATH)

        // 判断是否删除
        const isExist = fse.existsSync(oldLogFilePath)
        expect(isExist).toBe(false)
    })

    test('分析日志结果', async () => {
        // 先拆分日志
        splitLogFile(LOGS_FOLDER_PATH)
        // 再分析日志
        const result = await analysisLogs(LOGS_FOLDER_PATH)

        // 对比结果 —— 和 `access.log.txt` 的数据一致
        expect(result.h5).toEqual({ pv: 4 })
        expect(result['h5.pv']).toEqual({ pv: 4 })
        expect(result['h5.pv.1']).toEqual({ pv: 2 })
        expect(result['h5.pv.1.2']).toEqual({ pv: 2 })
        expect(result['h5.pv.2']).toEqual({ pv: 2 })
        expect(result['h5.pv.2.3']).toEqual({ pv: 1 })
        expect(result['h5.pv.2.4']).toEqual({ pv: 1 })
    })
})
