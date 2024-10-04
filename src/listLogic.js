// listLogic.js

//Let's start by creating a working todolist I can use within my javascript environment

import { format, compareAsc} from "date-fns";

class ToDoEntry {
    // A shared toDoArray
    static toDos = [];
    constructor(title, dueDate, priority, project = null, description = "",) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // (Year, Month, Date)
        this.priority = priority;
        this.project = project;
        this.status = false;

        ToDoEntry.toDos.push(this); // Append the current entry to the shared toDos array
    }
    static deleteEntry(toDoToDelete){
        ToDoEntry.toDos = ToDoEntry.toDos.filter(toDo => toDo !== toDoToDelete);
    }

    // Updating values if needed (as I plan on making a form for it I will edit all at once)
    editValue(
        {
            title = this.title,
            description = this.description,
            dueDate = this.dueDate,
            priority = this.priority,
            project = null
    } = {}) // By storing parameters as an object I am able to edit a single one without defining all of them
    {
            // Getting the index of the array in my list before changing it
            let thisIndex = ToDoEntry.toDos.indexOf(this);

            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.project = project;

            // Edit the entry in the toDos List using splice
            ToDoEntry.toDos.splice(thisIndex, 1, this);
    }
}
let myEntry1 = new ToDoEntry("Cleaning the house", new Date(2026, 12, 4), 5);
console.log(myEntry1)

export { ToDoEntry };

// Currently trying to implement date-fns...