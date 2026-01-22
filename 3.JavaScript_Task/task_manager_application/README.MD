#  My Task Manager (To-Do List Application)   --->>

My Task Manager is a modern, responsive **To-Do List web application** built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to efficiently manage daily tasks with full CRUD operations, task completion tracking, and local storage persistence.

---

##  Features

###  Task Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Toggle completion using a checkbox with right-tick icon

###  Task Progress Section
- Total tasks count
- Completed tasks count
- Pending tasks count
- Updates dynamically based on user actions

###  Local Storage Support
- Tasks are saved in browser **Local Storage**
- Data remains even after page refresh

###  Fun Joke Section
- Displays a random joke to enhance UI engagement
- Fetches data using a public API

###  Responsive Design
- Works smoothly on mobile, tablet, and desktop
- Scrollable task list
- Clean and professional UI

---

##  Project Folder Structure

#  My Task Manager (To-Do List Application)

My Task Manager is a modern, responsive **To-Do List web application** built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to efficiently manage daily tasks with full CRUD operations, task completion tracking, and local storage persistence.

---

##  Features ---> 

###  Task Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Toggle completion using a checkbox with right-tick icon

### Task Progress Section
- Total tasks count
- Completed tasks count
- Pending tasks count
- Updates dynamically based on user actions

###  Local Storage Support
- Tasks are saved in browser **Local Storage**
- Data remains even after page refresh

###  Fun Joke Section
- Displays a random joke to enhance UI engagement
- Fetches data using a public API

### Responsive Design
- Works smoothly on mobile, tablet, and desktop
- Scrollable task list
- Clean and professional UI

---

##  Project Folder Structure

task-manager/
│
├── index.html # Main HTML file
│
├── css/
│ └── homepage.css # Styling and responsive design
│
├── js/
│ └── homepage.js # JavaScript logic
│
└── README.md # Project documentation



---

##  Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Font Awesome (Icons)
- Local Storage API
- Fetch API

---

##  How to Run the Project

### Method 1: Simple Way
1. Download the project folder
2. Open `index.html` in any web browser

### Method 2: Using VS Code (Recommended)
1. Open the project folder in VS Code
2. Install **Live Server** extension
3. Right-click on `index.html`
4. Click **Open with Live Server**

---

## Functional Overview : 

| Feature | Description |
|-------|------------|
| Add Task  --> Adds a new task to the list 
| Edit Task --> Updates an existing task 
| Delete Task --> Removes a task permanently 
| Complete Task --> Marks task as completed 
| Pending Task --> Task remains unchecked 
| Empty State --> Shows message when no tasks exist 

---

##  Local Storage Data Format

```json
[
  {
    "id": 1710000000000,
    "text": "Complete JavaScript assignment",
    "completed": false
  }
]
