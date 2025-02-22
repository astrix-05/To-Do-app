const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let taskText = inputBox.value.trim(); // Trim spaces

    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    // Create list item
    let li = document.createElement("li");
    li.textContent = taskText;

    // Create delete button
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // "×" delete icon
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = ""; // Clear input field

    saveData();
}

// Event delegation for dynamic elements
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
}, false);

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
        attachDeleteListeners(); // Ensure delete buttons work after reload
    }
}

function attachDeleteListeners() {
    document.querySelectorAll("li span").forEach(span => {
        span.addEventListener("click", function () {
            this.parentElement.remove();
            saveData();
        });
    });
}

// Load saved tasks on page load
showTasks();
