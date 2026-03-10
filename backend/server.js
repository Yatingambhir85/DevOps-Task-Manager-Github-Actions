require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (CSS, JS) from the frontend folder
// Adjust this path if your folder structure is different in Docker
app.use(express.static(path.join(__dirname, '../frontend')));

// Database Configuration
// Uses Environment Variables with safe defaults for Docker Compose
const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
};

const DB_NAME = process.env.DB_NAME || 'task_manager';

// --- DATABASE INITIALIZATION WITH RETRY LOGIC ---
async function initDB() {
    let connected = false;
    let retries = 5;

    while (!connected && retries > 0) {
        try {
            console.log(`📡 Attempting to connect to DB at ${dbConfig.host}... (${retries} retries left)`);
            const connection = await mysql.createConnection(dbConfig);
            
            // 1. Create Database
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
            await connection.query(`USE \`${DB_NAME}\`;`);
            
            // 2. Create Table
            await connection.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    status ENUM('Pending', 'Completed') DEFAULT 'Pending'
                );
            `);
            
            console.log("✅ Database and Table ready!");
            await connection.end();
            connected = true; 
        } catch (err) {
            retries--;
            console.error(`❌ DB Connection failed: ${err.message}`);
            
            if (retries === 0) {
                console.error("Max retries reached. Database is unreachable.");
                process.exit(1); // Kill the container so Docker knows it failed
            }
            
            // Wait 5 seconds before trying again
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

// --- API ROUTES ---

// API: Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: DB_NAME});
        const [rows] = await conn.query('SELECT * FROM tasks ORDER BY id DESC');
        await conn.end();
        res.json(rows);
    } catch (err) { 
        console.error("GET Error:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});

// API: Add task
app.post('/api/tasks', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: DB_NAME});
        await conn.query('INSERT INTO tasks (title) VALUES (?)', [req.body.title]);
        await conn.end();
        res.status(201).json({ message: "Created" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// API: Toggle Status
app.patch('/api/tasks/:id/toggle', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: DB_NAME});
        const [rows] = await conn.query('SELECT status FROM tasks WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) return res.status(404).json({ error: "Task not found" });

        const newStatus = rows[0].status === 'Pending' ? 'Completed' : 'Pending';
        await conn.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, req.params.id]);
        await conn.end();
        res.json({ status: newStatus });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// API: Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const conn = await mysql.createConnection({...dbConfig, database: DB_NAME});
        await conn.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        await conn.end();
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Fallback: Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 3000;

// Only start Express after the DB is confirmed ready
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 DevOps Server is LIVE: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Fatal Startup Error:", err);
});
