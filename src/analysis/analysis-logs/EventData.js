/**
 * @description 自定义事件统计结果
 * @author 双越
 */

class EventData {
    constructor() {
        /* 存储结果，格式如
            {
                'category1': { pv: 100, uv: 80 },
                'category1.action1': { pv: 80, uv: 60 },
                'category1.action1.label1': { pv: 60, uv: 40 },
                'category1.action1.label1.value1': { pv: 30, uv: 20 },
            }
        */
        this.result = {}

        // 记录当前数据
        this.curData = {}
        this.curType = 'pv'
    }

    /**
     * 累加 pv
     * @param {object} lineData 日志数据
     */
    addPV({ category = '', action = '', label = '', value = '' }) {
        // 重置当前数据
        this.curData = {
            category,
            action,
            label,
            value,
        }
        this.curType = 'pv'

        // 累加 pv ，一步一步进行。前一步返回 true ，才可以进行下一步。
        let flag = true
        if (flag) flag = this.addCategory()
        if (flag) flag = this.addAction()
        if (flag) flag = this.addLabel()
        if (flag) flag = this.addValue()
    }

    // /**
    //  * 累加 uv
    //  * @param {object} lineData 日志数据
    //  */
    // addUV({ category = '', action = '', label = '', value = '' }) {
    //     this.curType = 'uv'
    // }

    /**
     * @description 累加 category
     */
    addCategory() {
        const { category } = this.curData
        if (!category) return false

        // 累加数据
        this.increaseNum(category)

        return true
    }

    /**
     * @description 累加 action
     */
    addAction() {
        const { action } = this.curData
        if (!action) return false
        const { category } = this.curData

        // 累加数据
        const key = `${category}.${action}`
        this.increaseNum(key)

        return true
    }

    /**
     * @description 累加 label
     */
    addLabel() {
        const { label } = this.curData
        if (!label) return false
        const { category } = this.curData
        const { action } = this.curData

        // 累加数据
        const key = `${category}.${action}.${label}`
        this.increaseNum(key)

        return true
    }

    /**
     * @description 累加 value
     */
    addValue() {
        const { value } = this.curData
        if (!value) return false
        const { category } = this.curData
        const { action } = this.curData
        const { label } = this.curData

        // 累加数据
        const key = `${category}.${action}.${label}.${value}`
        this.increaseNum(key)

        return true
    }

    /**
     * 累加数据
     * @param {string } key result 的 key ，如代码一开始的注释
     */
    increaseNum(key) {
        const type = this.curType // pv/uv

        const { result } = this
        if (result[key] == null) result[key] = {}

        const val = result[key]
        if (val[type] == null) val[type] = 0

        val[type] += 1
    }

    /**
     * @description 获取统计结果
     */
    getResult() {
        return this.result
    }
}

module.exports = EventData
