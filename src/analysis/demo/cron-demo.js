/**
 * @description cron demo
 * @author 双越
 */

/**
    通用的定时表达式规则：
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL) **【注意】linux crontab 不支持秒**
 */

const path = require('path')
const fse = require('fs-extra')
const { CronJob } = require('cron')

/**
 * 开始定时任务
 * @param {string} cronTime cron 规则
 * @param {Function} onTick 回调函数
 */
function schedule(cronTime, onTick) {
    if (!cronTime) return
    if (typeof onTick !== 'function') return

    // 创建定时任务
    const c = new CronJob(
        cronTime,
        onTick,
        null, // onComplete 何时停止任务，null
        true, // 初始化之后立刻执行，否则要执行 c.start() 才能开始
        'Asia/Shanghai' // 时区，重要！！
    )

    // 进程结束时，停止定时任务
    process.on('exit', () => c.stop())
}

function main() {
    // 打印当前时间
    function fn() {
        console.log(`当前时间 ${Date.now()}`)
    }

    // // 写入文档，以证明：nodejs 进程停止之后，定时任务即停止，否则就会重复执行定时任务
    // function fn() {
    //     const txt = `当前时间 ${Date.now()}`
    //     const filePath = path.join(__dirname, 'files', 'a.txt')
    //     fse.outputFileSync(
    //         filePath,
    //         txt + '\n',
    //         { flag: 'a' }
    //     )
    //     console.log(`已写入文件：${txt}`)
    // }

    const cronTime = '* * * * * *' // 定时规则可以随意修改
    schedule(cronTime, fn)
}
main()
