document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span contenteditable="true">${task}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        taskList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.querySelector('.edit').addEventListener('click', () => {
            saveTasks();
        });

        li.querySelector('span').addEventListener('blur', () => {
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    loadTasks();
});
