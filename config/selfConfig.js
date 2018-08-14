/**
 * Created by luckl on 2016/10/24 0024.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./selfConfig.prod.js');
}else if (process.env.NODE_ENV === 'development') {
    module.exports = require('./selfConfig.dev.js');
}else if (process.env.NODE_ENV === 'testing') {
    module.exports = require('./selfConfig.test.js');
}else if (process.env.NODE_ENV === 'demo') {
    module.exports = require('./selfConfig.demo.js');
}
