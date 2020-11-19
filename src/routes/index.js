const router = require('koa-router')()
const { ENV } = require('../utils/env')
const EventModel = require('../model/EventModel')
const packageInfo = require('../../package.json')

// 测试数据库连接
router.get('/api/db-check', async (ctx, next) => {
    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        await EventModel.findOne()
    } catch (ex) {
        mongodbConn = false
    }

    ctx.body = {
        errno: 0,
        data: {
            name: 'event analytics sever',
            version: packageInfo.version,
            ENV,
            mongodbConn,
        },
    }
})

module.exports = router
