let taskTextBar = document.getElementById("task");
let addTaskButton = document.getElementById("add-task");
let taskArea = document.getElementById("task-area");
let taskCounter = document.getElementById("tasks-counter");

let COUNTER = 0;
let ID = 0;
let LOCALSTORAGE = "TaskStorage";
let TASKS = [];

// Updates counter
function updateCounter() {
    if (COUNTER > 0) {
        taskCounter.innerText = `Tasks (${COUNTER})`;
    } else {
        taskCounter.innerText = "Tasks";
    }
}

// Updates localStorage, will clear if there are no tasks
function updateLocalStorage() {
    if (TASKS.length == 0) {
        localStorage.clear();
    } else {
        localStorage.setItem(LOCALSTORAGE, JSON.stringify(TASKS));
    }
}

// Adds task to TASKS array (Used for new tasks not saved[localStorage])
function addTask(task, id, complete) {
    if (!complete) {
        complete = false;
    }
    let newTask = { task: task, complete: complete, id: id };
    TASKS.push(newTask);
    updateLocalStorage();
}

// Updates task to complete in TASKS
function completeTask(id) {
    TASKS.forEach((obj) => {
        if (obj.id === id) {
            obj.complete = true;
        }
    });
    updateLocalStorage();
}

// Removes task in TASKS
function removeTask(id) {
    let newTasks = [];
    TASKS.forEach((obj) => {
        if (obj.id !== id) {
            newTasks.push(obj);
        }
    });
    TASKS = newTasks;
    updateLocalStorage();
}

// Creates HTML for task to be shown and sets up event listeners. Will also increase COUNTER.
function createTask(task, id, complete) {
    function completed() {
        COUNTER--;
        updateCounter();
        taskBtn.innerText = "Delete";
        taskBtn.className = "btn btn-danger task-btn";
        taskP.classList.add("line-through");
        completeTask(id);
    }
    let taskLi = document.createElement("li");
    let taskDiv = document.createElement("div");
    taskDiv.className = "d-flex justify-content-between align-items-center p-2";
    let taskP = document.createElement("p");
    taskP.innerText = task;
    let taskBtn = document.createElement("button");
    taskBtn.innerText = "Complete";
    taskBtn.className = "btn btn-success task-btn";
    taskLi.append(taskDiv);
    taskDiv.append(taskP);
    taskDiv.append(taskBtn);
    taskArea.append(taskLi);
    COUNTER++;
    updateCounter();
    taskBtn.addEventListener("click", function () {
        if (taskBtn.innerText == "Complete") {
            completed();
        } else {
            removeTask(id);
            taskLi.remove();
        }
    });
    if (complete) {
        completed();
    }
}

// Add Task event listener Creates a task and adds task to TASKS
addTaskButton.addEventListener("click", function () {
    let task = taskTextBar.value;
    taskTextBar.value = "";
    if (task.length == 0) {
        return;
    }
    createTask(task, ID);
    addTask(task, ID);
    ID++;
});

// Gets data and updates ID for new session.
TASKS = JSON.parse(localStorage.getItem(LOCALSTORAGE)) || [];
TASKS.forEach((obj) => {
    createTask(obj.task, ID, obj.complete);
    obj.id = ID;
    ID++;
});
updateLocalStorage();
