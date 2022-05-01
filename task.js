const inputs = document.querySelectorAll('input');
const addNewTaskBtn = document.querySelector('.add-btn');
const quickAdd = document.querySelector('#quick-add');
const taskList = document.querySelector('.tasks');


const newTaskBtnClick = () => {
    if(quickAdd.value.length !== 0){
        const newTask = quickAdd.value;
        const addedTask = {
            newTask,
        };

        const savedTasks = JSON.parse(localStorage.getItem("task"));
        
        if(savedTasks !== null && savedTasks.length > 0) {
            const taskIds = savedTasks.map(addedTask => addedTask.id);
            const maxId = Math.max(...taskIds);
            addedTask.id = maxId + 1;
            savedTasks.push(addedTask);
        
            localStorage.setItem("task", JSON.stringify(savedTasks));

        } else {
            addedTask.id = 0;

            const tasksAsArray = [{
                newTask,
                id: 0,
            }];

            localStorage.setItem("task", JSON.stringify(tasksAsArray))
        };

        newTaskLine(addedTask) ;
    };

    
    clearInput();
};

const newTaskLine = (addedTask) => {
    taskList.innerHTML += `
    <div class="one-task">
        <input type="checkbox" name="" id=${addedTask.newTask}>
            <label for=${addedTask.newTask}></label>
                <span class="task">
                    ${addedTask.newTask}
                </span>
    </div>`;
};

const recreateTask = () => {
    const task = JSON.parse(localStorage.getItem("task"));
    
    task.forEach(addedTask => {
    newTaskLine(addedTask)
    });
}


const clearInput = () => {
    inputs.forEach(input => input.value = '');
};

quickAdd.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        newTaskBtnClick();
    }
});

addNewTaskBtn.addEventListener('click', newTaskBtnClick);

recreateTask()

// localStorage.clear()
