import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: "P@ssw0rd",
    database: "pos_kelascom",
    port: 3306
});

export default dbPool