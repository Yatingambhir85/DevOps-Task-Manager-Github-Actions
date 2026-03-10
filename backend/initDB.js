const mysql = require("mysql2")
require("dotenv").config()

async function initDatabase(){

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

connection.connect()

const dbName = process.env.DB_NAME

connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err)=>{
  if(err) throw err
  console.log("Database ready")

  connection.query(`USE ${dbName}`, (err)=>{
    if(err) throw err

    const tableQuery = `
      CREATE TABLE IF NOT EXISTS tasks(
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      )
    `

    connection.query(tableQuery,(err)=>{
      if(err) throw err
      console.log("Tasks table ready")
      connection.end()
    })

  })

})

}

module.exports = initDatabase