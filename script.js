let taskTextBar = document.getElementById("task");
let addTaskButton = document.getElementById("add-task");
let taskArea = document.getElementById("task-area");

addTaskButton.addEventListener("click", function () {
    let task = taskTextBar.value;
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
    taskBtn.addEventListener("click", function () {
        if (taskBtn.innerText == "Complete") {
            taskBtn.innerText = "Delete";
            taskBtn.className = "btn btn-danger task-btn";
            taskP.classList.add("line-through");
        } else {
            taskLi.remove();
        }
    });
});
