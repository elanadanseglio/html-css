let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("addButton");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");
let loginButton = document.getElementById("login");
let signUpButton = document.getElementById("signUp");

let users = [
    {username: 'spongebob', password: 'squarepants'},
    {username: 'sandy', password: 'cheeks'},
];

let addTask = function(){
    if (taskInput.value == " ") {
        alert("Task to be added should not be empty!");
        return;
    }
    let listItem = createNewTask(taskInput.value);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value == "";
}
addButton.addEventListener("click", addTask);

let createNewTask = function(newTask){
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    checkBox.type = "checkBox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = newTask;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

let bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}

let editTask = function(){
    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let taskCompleted = function() {
    let listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

let clear = function() {
    incompleteTasks.innerHTML = "";
    completedTasks.innerHTML = "";
}
clearButton.addEventListener('click', clear);

let login = function() {
    let user = prompt("Enter username.");
    let pass = prompt("Enter password.");
    if (checkCredentials(user, pass)){
        alert("Hello " + user + "!");
    } else {
        alert("Invalid.")
    };
    // if (input == null || input == ""){
    //     text = "Invalid username/password.";
    // } else {
    //     text = "Hello " + input;
    // }
    // alert(text);
}
loginButton.addEventListener('click', login)

let checkCredentials = function(username, password) {
    return users.some(user => user.username === username && user.password === password);
  };

// let signUp = function(){
//     let input = prompt("Enter a username and password to use.", "Username");
//     let text;
//     if (input == null || input == ""){
//         text = "Invalid username/password.";
//     } else {
//         text = "Welcome " + input + "!";
//         saveUser(text);
//     }
//     alert(text);
// }
// signUpButton.addEventListener('click', signUp);