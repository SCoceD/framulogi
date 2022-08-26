const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'photopass',
    password: 'photopass',
    // host: '172.18.0.2',
    host: 'localhost',
    port: 5432,
    database: 'photopass_db'
})

module.exports = pool;
