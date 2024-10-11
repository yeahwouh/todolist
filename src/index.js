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
            console.log("HI")
        }
    }

    // Initial render
    updateScreen();


}

ScreenController();