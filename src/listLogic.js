//Let's start by creating a working todolist I can use within my javascript environment
import { parse } from "date-fns";


class ToDoEntry {
    // A shared toDoArray
    static toDos = [];
    static projects = {};

    constructor(title, dueDate, priority, project = null, description = "") {
        this.title = title;
        this.description = description;
        this.dueDate = parse(dueDate, 'yyyy-MM-dd', new Date()); // Date input format: "yyyy-MM-dd"

        // Fixing parsing error
        this.dueDate.setMonth(this.dueDate.getMonth()+1)

        this.priority = priority;
        this.project = project;
        this.status = false;
        this.appendToProject(project)

        ToDoEntry.toDos.push(this); // Append the current entry to the shared toDos array
    }
    appendToProject (project){
        try {
            // Check if the project already exists
            ToDoEntry.projects[project].push(this);
        } catch(err) { // If not create a new one
            ToDoEntry.projects[project] = [this];
        }
    }


    static deleteEntry(toDoToDelete){
        ToDoEntry.toDos = ToDoEntry.toDos.filter(toDo => toDo !== toDoToDelete);
    }

    // Updating values if needed (as I plan on making a form for it I will edit all at once)
    editEntry(
        {
            title = this.title,
            dueDate = this.dueDate,
            priority = this.priority,
            project = null,
            description = ""
    } = {}) // By storing parameters as an object I am able to edit a single one without defining all of them
    {
            // Getting the index of the array in my list before changing it
            let thisIndex = ToDoEntry.toDos.indexOf(this);

            this.title = title;
            this.description = description;

            this.dueDate = new Date (dueDate);
            this.dueDate.setMonth(this.dueDate.getMonth()+1)

            this.priority = priority;

            // Change in ToDoEntry.projects
            if (this.project !== project) {
                ToDoEntry.projects[this.project] = ToDoEntry.projects[this.project].filter((toDo) => toDo !== this);
                this.project = project;
                this.appendToProject(project)
            }

            // Edit the entry in the toDos List using splice
            ToDoEntry.toDos.splice(thisIndex, 1, this);
    }
}

// Creating examples for testing

let todo = new ToDoEntry("Fixing my bottle", "2024-9-10", " High" )

// Example 1: A simple to-do with title, due date, and priority
const todo1 = new ToDoEntry("Buy groceries", "2024-10-10", "High");

// Example 2: A to-do with a specific project
const todo2 = new ToDoEntry("Prepare presentation", "2024-10-15", "Medium", "Work");

// Example 3: A to-do with a project and a detailed description
const todo3 = new ToDoEntry("Fix the car", "2024-10-20", "Low", "Personal", "Take the car to the mechanic for maintenance");

// Example 4: A to-do with no project, only title, due date, and priority
const todo4 = new ToDoEntry("Book dentist appointment", "2024-10-05", "High");

// Example 5: A to-do with an empty description and a project
const todo5 = new ToDoEntry("Plan vacation", "2024-12-01", "Medium", "Travel", );

const todo6 = new ToDoEntry("Fuck boss", '2024-10-05', "High", "Work");

todo.editEntry({project: "Work"})

export { ToDoEntry };