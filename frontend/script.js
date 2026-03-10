const API_URL = '/api/tasks';

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        document.getElementById('taskCount').innerText = "Offline - DB Error";
    }
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    document.getElementById('taskCount').innerText = `${tasks.length} Active Tasks`;
    
    list.innerHTML = tasks.map(task => `
        <li class="${task.status === 'Completed' ? 'completed' : ''}">
            <div class="task-left">
                <input type="checkbox" 
                       ${task.status === 'Completed' ? 'checked' : ''} 
                       onchange="toggleTask(${task.id})">
                <span>${task.title}</span>
            </div>
            <div class="delete-btn" onclick="deleteTask(${task.id})">&times;</div>
        </li>
    `).join('');
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();