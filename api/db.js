import mysql from 'mysql'

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lutecode12",
  database: "crud"
})