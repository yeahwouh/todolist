// index.js
// This page is responsible for creating the entry page of my website

import "./styles.css"
import { ToDoEntry } from "./listLogic"

function ScreenController() {
    let toDos = ToDoEntry.toDos;
    let projects = ToDoEntry.projects;
    const projectsBar = document.querySelector(".projects");
    const content = document.querySelector(".content-box")

    const updateScreen = () => {
        // Updating the projects bar
        for (let project in projects) {
            let listElement = document.createElement("li");
            listElement.textContent = project;
            projectsBar.appendChild(listElement);
        }
    }

    // Initial update
    updateScreen();
}

ScreenController();