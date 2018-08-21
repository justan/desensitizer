const assert  = require('assert')
const desensitizer = require('../')

assert.equal(desensitizer.desensitize('aaaaaabb'), 'aa****bb')
assert.equal(desensitizer.desensitize('aabb'), 'aa****bb')

assert.equal(desensitizer.desensitize('aabb', { maskLength: 2 }), 'aa**bb')
assert.equal(desensitizer.desensitize('aa12345678bb', { maskLength: 0 }), 'aa********bb')

assert.deepEqual(desensitizer.desensitizeObject({
    password: 'aabbcc',
    data: {
        password: 'ccbbaa'
    }
}), {
    password: 'aa****cc',
    data: {
        password: 'cc****aa'
    }
})

assert.deepEqual(desensitizer.desensitizeObject({
    password: 'aabbcc',
    data: {
        password: 'ccbbaa'
    }
}, {
    maskLength: 1
}), {
    password: 'aa*cc',
    data: {
        password: 'cc*aa'
    }
})

assert.deepEqual(desensitizer.desensitizeObject({
    password: 'aabbcc',
    id: '123456',
    data: {
        id: '678901',
        password: 'ccbbaa'
    }
}, {
    keyPattern: /password|id/
}), {
    password: 'aa****cc',
    id: '12****56',
    data: {
        password: 'cc****aa',
        id: '67****01'
    }
})

assert.deepEqual(desensitizer.desensitizeObject({
    password: 'aabbcc',
    id: '123456',
    data: {
        id: '678901',
        password: 'ccbbaa'
    }
}, {
    keyPattern: function(key, val) {
        return key === 'id' || val === 'aabbcc'
    }
}), {
    password: 'aa****cc',
    id: '12****56',
    data: {
        password: 'ccbbaa',
        id: '67****01'
    }
})

console.log('done')