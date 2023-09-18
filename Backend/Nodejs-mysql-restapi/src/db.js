import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'jaredleto30secondstomars',
    port: 3306,
    database: 'ecommerce'
})
