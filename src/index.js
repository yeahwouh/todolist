// index.js
// This page is responsible for creating the entry page of my website

import "./styles.css"
import { ToDoEntry } from "./listLogic"

function ScreenController() {
    const projectsBar = document.querySelector(".projects");
    const list = document.querySelector(".list");


    // Function to handle the creation of a new ToDo
    const createOrEditToDo = (existingEntry = null) => {
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

            titleInput.placeholder = existingEntry ? existingEntry.title : "Title";
            titleInput.value = existingEntry ? existingEntry.title : null;
            titleInput.setAttribute('required', true);
            form.appendChild(titleInput);

            const dueDateInput = document.createElement("input");
            dueDateInput.type = "date";

            if (existingEntry) {
                let dateObject = existingEntry.dueDate;
                // Parse the date of an existing entry (if there is one) in a form that can exhibited by a date input box
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so we add 1
                const day = String(dateObject.getDate()).padStart(2, '0');

                // Format the date as "yyyy-mm-dd"
                const dateString = `${year}-${month}-${day}`;
                dueDateInput.value = existingEntry ? dateString : null;
            }

            // dueDateInput.setAttribute('required', true);
            form.appendChild(dueDateInput);

            const priorityInput = document.createElement("select");
            ["Low", "Medium", "High"].forEach((priority) => {
                const option = document.createElement("option");
                option.value = priority;
                option.textContent = priority;
                priorityInput.appendChild(option);
            });
            priorityInput.value = existingEntry ? existingEntry.priority : "Low";
            form.appendChild(priorityInput);

            const projectInput = document.createElement("input");
            projectInput.type = "text";
            projectInput.placeholder = "Project (Optional)";
            projectInput.value = existingEntry ? existingEntry.project : null;
            form.appendChild(projectInput);

            const descriptionInput = document.createElement("textarea");
            descriptionInput.placeholder = "Description (Optional)";
            descriptionInput.value = existingEntry ? existingEntry.description : null;
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

                if (newTitle && newDueDate && newPriority && existingEntry === null) {
                    const newToDo = new ToDoEntry(newTitle, newDueDate, newPriority, newProject, newDescription);
                    updateScreen(newProject); // Update the screen after adding the new ToDo
                } else if (existingEntry !== null) {
                    let index = ToDoEntry.toDos.indexOf(existingEntry);
                    // Grabing the entry in the list itself in order to change it
                    ToDoEntry.toDos[index].editEntry({
                        title: newTitle,
                        dueDate: newDueDate,
                        priority: newPriority,
                        project: newProject || null,
                        description : newDescription
                    });
                    updateScreen(newProject);
                }

                // Clear form and hide modal after submission
                form.reset();
                modal.style.display = "none";
            });

            // Show the modal
            modal.style.display = "flex";
    };

    const updateScreen = (project = null) => {
        let projects = ToDoEntry.projects;
        // Updating the projects bar
        projectsBar.textContent = ""; // Emptying it so it doesn't append but replace the Projects
        for (let projectTitle in projects) {
            // Checking for this project to be empty (not containing any tasks)
            if (projects[projectTitle].length !== 0) {
                let listElement = document.createElement("li");
                // Creating a button to switch between projects views
                let projectButton = document.createElement("button");
                projectButton.project = projectTitle;
                projectButton.textContent = projectTitle;
                listElement.appendChild(projectButton);
                projectsBar.appendChild(listElement);
                projectButton.addEventListener("click", clickHandlerProjects);
            } else {
                // Deleting from the actual object
                delete ToDoEntry.projects[projectTitle];
            }

        }
        // Adding handler for the button
        function clickHandlerProjects(e) {
            const selectedProject = e.target.project;
            updateScreen(selectedProject);
        }

        // Updating current ToDoList
        list.textContent = ""; // Emptying the content so it doesn't append but replace the current ToDos
        let toDos = projects[project];
        toDos.forEach((entry) => {

            let listElement = document.createElement("li");
            listElement.classList.add("entryListElement");

            // Make a button to display the entry so we can edit and delete them with a cleaner look
            let contentButton = document.createElement("button");
            contentButton.classList.add("contentButton");

            let entryContent = document.createElement("div");

            let titleParagraph = document.createElement("p");
            titleParagraph.textContent = entry.title;
            titleParagraph.classList.add("bold");
            let dateParagraph = document.createElement("p");
            dateParagraph.textContent = `${entry.dueDate.getDate()}-${entry.dueDate.getMonth()}-${entry.dueDate.getFullYear()}`;


            entryContent.appendChild(titleParagraph);
            entryContent.appendChild(dateParagraph);

            // Only appending description if there is one
            if (entry.description !== "") {
                let descriptionParagraph = document.createElement("p");
                descriptionParagraph.textContent = entry.description;
                entryContent.appendChild(descriptionParagraph);
            }
            contentButton.appendChild(entryContent);
            listElement.appendChild(contentButton);
            list.appendChild(listElement);

            contentButton.entry = entry;

            // Append the function to edit the entry to the contentButton
            contentButton.addEventListener("click", (e) => {
                createOrEditToDo(contentButton.entry)
            });
        });
    }
    // Initial render
    updateScreen();

    // Button to create a new entry
    let newButt = document.querySelector(".new-button");
    newButt.onclick = () => {
        createOrEditToDo();
    };
}
ScreenController();