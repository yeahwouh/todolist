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


    // Function to handle the creation of a new ToDo
    const createNewToDo = () => {
        // Create the modal HTML structure and append it to the body
        const modal = document.createElement("div");
        modal.classList.add("modal");
        document.body.appendChild(modal);

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modal.appendChild(modalContent);

        // Close button for the modal
        const closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.textContent = "X";
        modalContent.appendChild(closeButton);

        closeButton.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal when the close button is clicked
        });
        // Clearing the modal content (in case it's already open)
        modalContent.innerHTML = "";
        modalContent.appendChild(closeButton);

        // Form elements
        const form = document.createElement("form");
        form.classList.add("new-todo-form");

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

        modalContent.appendChild(form);

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

            // Clear form and hide modal after submission
            form.reset();
            modal.style.display = "none";
        });

        // Show the modal
        modal.style.display = "flex";
    };

    const updateScreen = (project = null) => {
        // Updating the projects bar
        projectsBar.textContent = ""; // Emptying it so it doesn't append but replace the Projects
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
        list.textContent = ""; // Emptying the content so it doesn't append but replace the current ToDos
        let toDos = projects[project];
        toDos.forEach((entry) => {

            // Creating the first box so we can place the checkbox and the edit button next to it
            let entryContent = document.createElement("div");
            let listElement = document.createElement("li");

            let titleParagraph = document.createElement("p");
            titleParagraph.textContent = entry.title;
            titleParagraph.classList.add("bold");
            let dateParagraph = document.createElement("p");
            dateParagraph.textContent = `${entry.dueDate.getDate()}-${entry.dueDate.getMonth() + 1}-${entry.dueDate.getFullYear()}`;


            listElement.appendChild(titleParagraph);
            listElement.appendChild(dateParagraph);

            // Only appending description if there is one
            if (entry.description !== "") {
                let descriptionParagraph =  document.createElement("p");
                descriptionParagraph.textContent = entry.description;
                listElement.appendChild(descriptionParagraph);
            }
            entryContent.appendChild(listElement);
            list.appendChild(entryContent);

            // The div with the boxes
            let boxes = document.createElement("div");


        });

        // Adding handler for the button
        function clickHandlerProjects(e) {
            const selectedProject = e.target.project;
            updateScreen(selectedProject);
        }
    };

    // Initial render
    updateScreen();

    // Button to create a new entry
    let newButt = document.querySelector(".new-button");
    newButt.onclick = () => {
        createNewToDo();
    };
}
ScreenController();