const taskInput = document.getElementById('task-input');
const descInput = document.getElementById('desc-input');
const priorityInput = document.getElementById('priority-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    let filtered = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });
    
    // Check if all tasks are completed
    const completionMessage = document.getElementById('completion-message');
    const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);
    
    if (allTasksCompleted && currentFilter === 'all') {
        completionMessage.classList.remove('hidden');
    } else {
        completionMessage.classList.add('hidden');
    }
    
    filtered.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        const priorityDisplay = task.priority === 'mid' ? 'Medium' : task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        li.innerHTML = `
            <div class="task-main">
                <span class="task-title">${task.text}</span>
                <span class="task-priority ${task.priority}">${priorityDisplay}</span>
                <div class="task-actions">
                    <button class="complete-btn" title="Mark as ${task.completed ? 'Pending' : 'Completed'}">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="delete-btn" title="Delete">Delete</button>
                </div>
            </div>
            ${task.desc ? `<span class="task-desc">${task.desc}</span>` : ''}
        `;
        // Complete/Undo
        li.querySelector('.complete-btn').onclick = () => {
            tasks[idx].completed = !tasks[idx].completed;
            saveTasks();
            renderTasks();
        };
        // Delete
        li.querySelector('.delete-btn').onclick = () => {
            tasks.splice(idx, 1);
            saveTasks();
            renderTasks();
        };
        taskList.appendChild(li);
    });
}

todoForm.onsubmit = e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const desc = descInput.value.trim();
    const priority = priorityInput.value;
    const errorMessage = document.getElementById('error-message');
    
    if (!text) {
        taskInput.classList.add('error');
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            taskInput.classList.remove('error');
            errorMessage.classList.add('hidden');
        }, 3000);
        return;
    }
    tasks.push({ text, desc, priority, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    descInput.value = '';
    priorityInput.value = 'low';
};

// Hide error message when user starts typing
taskInput.addEventListener('input', () => {
    const errorMessage = document.getElementById('error-message');
    if (!errorMessage.classList.contains('hidden')) {
        taskInput.classList.remove('error');
        errorMessage.classList.add('hidden');
    }
});

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    };
});

clearCompletedBtn.onclick = () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
};

window.onload = renderTasks;
