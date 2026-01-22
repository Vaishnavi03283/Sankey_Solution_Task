
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasksSpan = document.getElementById("totalTasks")
const completedTasksSpan = document.getElementById("completedTasks");
const pendingTasksSpan =  document.getElementById("pendingTasks");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const jokeText = document.getElementById("jokeText");
const emptyMessage = document.getElementById("emptyMessage")


const STORAGE_KEY = "My_Tasks";

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
    updatedTaskProgress();
    fetchRandomJoke();
});

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskActions);


// API --> Jokes
async function fetchRandomJoke() {
    console.log("api Fetching --> ");
    try {
        jokeText.textContent = "Loading Joke....";
        const response = await fetch("https://api.chucknorris.io/jokes/random")
        
        if (!response.ok) {
            throw new Error(`HTTP  error! Status: ${response.status}`); 
        }

        const data = await response.json();
        jokeText.textContent = data.value;

    } catch (error) {
        console.error("Joke API Error: ",error);
        jokeText.textContent = "Unable to load Joke. Please try again later.";
    }
}


// Add Tasks -->> 
function addTask(){
    console.log("Tasks Added --> ");
    
    const taskText = taskInput.value.trim();
    if(taskText === ""){
        alert("Please Enter a valid Task.");
        return;
    }
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    console.log("task list is : ", task);
    
    saveTasksToLocalStorage();
    renderTask(task);
    updatedTaskProgress();
    taskInput.value = "";
}

// to convert js obj into html 
function renderTask(task){

    console.log("rendertsak called --> ");
    
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;

    if(task.completed){
        li.classList.add("completed");
    }

    li.innerHTML = `
        <div class="task-content">
            <span class="task-title">${task.text}</span>
            <span class="task-status ${task.completed ? "status-done" : "status-pending"}">
                ${task.completed ? "Completed" : "Pending"}
            </span>
        </div>

        <div class="task-actions">
            <button class="task-checkbox complete-btn ${task.completed ? "checked" : ""}">
               <i class="fa-solid fa-check"></i>
            </button>

            <button class="edit-btn icon-btn edit-icon"> 
                <i class="fa-solid fa-pen"></i>
            </button>

            <button class="delete-btn icon-btn delete-icon"> 
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;   
    taskList.appendChild(li);
}

function handleTaskActions(event){
    console.log("handleTaskActions called --> ", event);

    const li = event.target.closest(".task-item");
    if(!li) return;
    const taskId = Number(li.dataset.id);
    
    // completed/Undo -->
    if (event.target.closest(".complete-btn")) {
        toggleTaskCompletion(taskId, li);
    }
    // edit task -->
    if(event.target.closest(".edit-btn")){
        editTask(taskId, li);
    }
    // delete task -->
    if(event.target.closest(".delete-btn")){
        deleteTask(taskId, li);
    }
}

function toggleTaskCompletion(taskId, taskElement) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // toggle state
    task.completed = !task.completed;
    // status 
    const statusSpan = taskElement.querySelector(".task-status");

    if (task.completed) {
        statusSpan.textContent = "Completed";
        statusSpan.classList.remove("status-pending");
        statusSpan.classList.add("status-done");
        taskElement.classList.add("completed");
    } else {
        statusSpan.textContent = "Pending";
        statusSpan.classList.remove("status-done");
        statusSpan.classList.add("status-pending");
        taskElement.classList.remove("completed");
    }

    // button text
    const checkbox = taskElement.querySelector(".task-checkbox");
    if (task.completed) {
        checkbox.classList.add("checked");
    } else {
        checkbox.classList.remove("checked");
    }
    saveTasksToLocalStorage();
    updatedTaskProgress();
}

// edit task
function editTask(taskId, taskElement){
    console.log("editTask called --> ", taskId , taskElement);

    const task = tasks.find(task => task.id === taskId);
    if(!task) return;

    const updatedText = prompt("Edit your task: ", task.text);
    if(updatedText === null) return;

    const trimmedText = updatedText.trim();
    if(trimmedText === ""){
        alert("Task cannot be empty.");
        return;
    }

    task.text = trimmedText;
    taskElement.querySelector(".task-title").textContent = trimmedText;

    saveTasksToLocalStorage();
}

// delete task 
function deleteTask(taskId, taskElement){
    console.log("deleteTask called --> ", taskId , taskElement);

    tasks = tasks.filter(task => task.id !== taskId);
    taskElement.remove();

    saveTasksToLocalStorage();
    updatedTaskProgress();
}

// update task progress
function updatedTaskProgress(){
    console.log("updatedTaskProgress called --> ");

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    pendingTasksSpan.textContent = pending;

    const percentage = total === 0 ? 0 : Math.round((completed/total) * 100);

    
    if(progressFill && progressPercent){
        progressFill.style.width = percentage + "%";
        progressPercent.textContent = `${percentage}% Completed`;
    }

    if (total == 0) {
        emptyMessage.style.display = "block";
    }else{
        emptyMessage.style.display = "none";
    }
}

// save to local storage
function saveTasksToLocalStorage(){
    console.log(" saveTasksToLocalStorage called ---> ");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// load from local storage
function loadTasksFromLocalStorage(){
    console.log("loadTasksFromLocalStorage called --> ");
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if(!storedTasks) return;

    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => renderTask(task));

    updatedTaskProgress();
}
