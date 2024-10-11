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
        for (let projectTitle in projects) {
            let listElement = document.createElement("li");
            listElement.textContent = projectTitle;
            projectsBar.appendChild(listElement);
        }

        // Updating current ToDoList
        let toDos = projects[project];
        toDos.forEach((entry)=> {
            let listElement = document.createElement("li");
            listElement.textContent = entry.title;
            list.appendChild(listElement);
        })
    }

    // Initial update
    updateScreen();
}

ScreenController();