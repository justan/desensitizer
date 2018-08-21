/**
 * Desensitize string
 * @param {String} str 
 * @param {Number} opts.prePlainLength  
 * @param {Number} opts.postPlainLength 
 * @param {Number} opts.maskLength 
 */
const desensitize = function(str, { prePlainLength = 2, postPlainLength = 2, maskLength = 4 } = {}) {
    const reg = new RegExp(`(.{${prePlainLength}})(.*)(.{${postPlainLength}})`)
    return str.replace(
        reg,
        function(match, before, maskPart, after) {
            return `${before}${maskLength > 0 ? '*'.repeat(maskLength) : maskPart.split('').map(() => '*').join('')}${after}`
        }
    )
}

/**
 * Desensitize plain object
 * @param {Object} data
 * @param {RegExp|function} opts.keyPattern 
 * @returns {Object} 
 */
const desensitizeObject = function desensitizeObject(data = {}, opts = {}) {
    const { keyPattern = /password|secret/i } = opts

    let match = typeof keyPattern == 'function' ? keyPattern : (key, val) => {
        return keyPattern.test(key)
    }

    return Object.keys(data).reduce((res, key) => {
        const val = data[key]
        res[key] = val
        if(val && Object(val) === val) {
            res[key] = desensitizeObject(val, opts)
        }else {
            if(typeof val === 'string' && match(key, val)) {
                res[key] = desensitize(val, opts)
            }
        }
        return res
    }, {})
}
  
module.exports = {
    desensitize,
    desensitizeObject
}