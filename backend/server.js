require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (CSS, JS) from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

// Database Initialization
async function initDB() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.query(`USE \`${process.env.DB_NAME}\`;`);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                status ENUM('Pending', 'Completed') DEFAULT 'Pending'
            );
        `);
        console.log("✅ Database and Table ready");
        await connection.end();
    } catch (err) {
        console.error("❌ DB Setup Error:", err.message);
    }
}

// API: Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: process.env.DB_NAME});
        const [rows] = await conn.query('SELECT * FROM tasks ORDER BY id DESC');
        await conn.end();
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// API: Add task
app.post('/api/tasks', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: process.env.DB_NAME});
        await conn.query('INSERT INTO tasks (title) VALUES (?)', [req.body.title]);
        await conn.end();
        res.status(201).json({ message: "Created" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// API: Toggle Status
app.patch('/api/tasks/:id/toggle', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: process.env.DB_NAME});
        const [rows] = await conn.query('SELECT status FROM tasks WHERE id = ?', [req.params.id]);
        const newStatus = rows[0].status === 'Pending' ? 'Completed' : 'Pending';
        await conn.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, req.params.id]);
        await conn.end();
        res.json({ status: newStatus });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// API: Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: process.env.DB_NAME});
        await conn.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        await conn.end();
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Fallback: Serve the frontend
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
initDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 DevOps Server: http://localhost:${PORT}`));
});