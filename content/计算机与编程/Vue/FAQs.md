# Vue FAQs

## 怎么解决在 Vue 项目中引入 moment 错误？
   
在 vue 项目中，使用 `import moment from 'moment'` 的方式引入 moment，在构建过程中，moment 会得不到正确的构建。

使用以下两种方法引入 **moment** （二选一）:

```javascript
import moment from 'moment/src/moment'
```

或

```javascript
const moment = require('moment')
```
