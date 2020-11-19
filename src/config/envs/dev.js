/**
 * @description dev 配置
 * @author 双越
 */

module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'testdb',
    },

    // access_log 日志文件目录，要和 nginx_conf/dev/event.conf 保持一致！
    accessLogPath: '/Users/wfp/nginx_logs/event_analytics',

    // cors origin
    corsOrigin: '*',
}
