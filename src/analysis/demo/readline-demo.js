/**
 * @description readline demo
 * @author 双越
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

function main() {
    let num = 0

    const logFile = path.join(__dirname, 'files', 'a.log')
    const readStream = fs.createReadStream(logFile)
    const rl = readline.createInterface({
        input: readStream,
    })
    rl.on('line', line => {
        console.log('line', line)
        // eslint-disable-next-line no-plusplus
        num++
    })
    rl.on('close', async () => {
        console.log('num', num)
    })
}
main()
