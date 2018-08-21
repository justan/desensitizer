Desensitizer
============

字符串脱敏

Install
-------

```
npm i desensitizer
```

or

```
yarn add desensitizer
```


Usage
-----

```js
const desensitizer = require('desensitizer')

desensitizer.desensitize('this is secret string') // th****ng

desensitizer.desensitizeObject({ password: 'password' }) // => { password: 'pa****rd' }
desensitizer.desensitizeObject({ password: 'password', key: 'serect' }, { keyPattern: /password|key/ }) // { password: 'pa****rd', key: 'se****ct' }
```

