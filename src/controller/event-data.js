/**
 * @description 自定义事件数据 controller
 * @author 双越
 */

const { findEventsService } = require('../service/event-data')
const {
    categoryOrActionEmptyFailInfo,
    startDateOrEndDateEmptyFailInfo,
} = require('../res-model/failInfo/index')
const { ErrorRes, SuccessRes } = require('../res-model/index')

/**
 * 获取事件统计数据
 * @param {object} data category, action, label, value
 * @param {string} startDate 开始日期
 * @param {string} endDate 结束日期
 */
async function getEventData(data = {}, startDate, endDate) {
    const { category, action, label, value } = data

    // 检验数据
    if (!category == null || !action) return new ErrorRes(categoryOrActionEmptyFailInfo)
    if (!startDate || !endDate) return new ErrorRes(startDateOrEndDateEmptyFailInfo)

    // 拼接查询条件
    const start = new Date(`${startDate} 0:00:00`)
    const end = new Date(`${endDate} 23:59:59`)
    let eventKey = `${category}.${action}`
    if (label) eventKey += `.${label}`
    if (value) eventKey += `.${value}`

    // 获取数据
    const result = await findEventsService(
        {
            eventKey,
        },
        start,
        end
    )
    return new SuccessRes(result)
}

module.exports = {
    getEventData,
}
