/**
 * @description 操作数据库 event data
 * @author 双越
 */

const EventModel = require('../model/EventModel')

/**
 * 创建事件数据，可多个
 * @param {Array} eventDataList 事件数据列表
 */
async function createEventsService(eventDataList = []) {
    const results = await EventModel.create(eventDataList)
    return results.length
}

/**
 * 获取统计数据
 * @param {object} opts 查询条件
 * @param {Date} startDate 开始时间
 * @param {Date} endDate 结束时间
 */
async function findEventsService(opts = {}, startDate, endDate) {
    Object.assign(opts, {
        eventDate: { $gte: startDate, $lt: endDate },
    })
    const res = await EventModel.find(opts)
    return res
}

module.exports = {
    createEventsService,
    findEventsService,
}
