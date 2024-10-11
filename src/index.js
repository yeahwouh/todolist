// index.js
// This page is responsible for creating the entry page of my website

import "./styles.css"
import { ToDoEntry } from "./listLogic"

function ScreenController() {
    let toDos = ToDoEntry.toDos;
    let projects = ToDoEntry.projects;
    const projectsBar = document.querySelector(".projects");
    const content = document.querySelector(".content-box");
    const list = document.querySelector(".list");

    const updateScreen = (project = null) => {

        // Updating the projects bar
        projectsBar.textContent = "" // Emptying it so it doesn't append but replace the Projects
        for (let projectTitle in projects) {
            let listElement = document.createElement("li");

            // Creating a button to switch between projects views
            let projectButton = document.createElement("button");
            projectButton.project = projectTitle;
            projectButton.textContent = projectTitle;
            listElement.appendChild(projectButton);
            projectsBar.appendChild(listElement);
            projectButton.addEventListener("click", clickHandlerProjects);
        }

        // Updating current ToDoList
        list.textContent = "" // Emptying the content so it doesn't append but replace the current ToDos
        let toDos = projects[project];
        toDos.forEach((entry)=> {
            let listElement = document.createElement("li");
            listElement.textContent = entry.title;
            list.appendChild(listElement);
        })

        // Adding handler for the button
        function clickHandlerProjects(e) {
            const selectedProject = e.target.project;
            updateScreen(selectedProject);
        }



    }

    const createNewToDo = () => {
        // Creating a form for user input
        const form = document.createElement("form");
        form.classList.add("new-todo-form");

        // Form elements
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Title";
        form.appendChild(titleInput);

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        form.appendChild(dueDateInput);

        const priorityInput = document.createElement("select");
        ["Low", "Medium", "High"].forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority;
            priorityInput.appendChild(option);
        });
        form.appendChild(priorityInput);

        const projectInput = document.createElement("input");
        projectInput.type = "text";
        projectInput.placeholder = "Project (Optional)";
        form.appendChild(projectInput);

        const descriptionInput = document.createElement("textarea");
        descriptionInput.placeholder = "Description (Optional)";
        form.appendChild(descriptionInput);

        // Submit button
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Add ToDo";
        form.appendChild(submitButton);

        // Append form to content box
        content.appendChild(form);

        // Handle form submission
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const newTitle = titleInput.value;
            const newDueDate = dueDateInput.value;
            const newPriority = priorityInput.value;
            const newProject = projectInput.value || null;
            const newDescription = descriptionInput.value;

            if (newTitle && newDueDate && newPriority) {
                const newToDo = new ToDoEntry(newTitle, newDueDate, newPriority, newProject, newDescription);
                updateScreen(newProject); // Update the screen after adding the new ToDo
            }

            // Clear form after submission
            form.reset();
            form.remove();
        });
    };

    // Initial render
    updateScreen();

    // Button to create a new entry
    let newButt = document.querySelector(".new-button");
    newButt.onclick = () => {
        createNewToDo();
    }
}
ScreenController();
