/**
 * @description res 错误信息配置
 * @author 双越
 */

module.exports = {
    // category 和 action 不能为空
    categoryOrActionEmptyFailInfo: {
        errno: 10001,
        message: 'category 和 action 不能为空',
    },

    // 开始或结束时间不能为空
    startDateOrEndDateEmptyFailInfo: {
        errno: 10002,
        message: '开始或结束时间不能为空',
    },
}
