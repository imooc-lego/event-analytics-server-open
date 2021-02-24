/**
 * @description 检查数据库连接
 * @author 双越
 */

const { get } = require('./_server')

describe('数据库连接', () => {
    test('数据库连接', async () => {
        const { data, errno } = await get('/api/db-check')

        const { mongodbConn } = data

        expect(errno).toBe(0)
        expect(mongodbConn).toBe(true)
    })
})
