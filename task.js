const taskDate = document.querySelector('.task-date')
const taskList = document.querySelector('.tasks');
const priorityMark = document.querySelector('.priority')

const quickAddContainer = document.querySelector('.guick-add-container');
const quickAdd = document.querySelector('#quick-add');
const quickAddBtn = document.querySelector('.quick-add-btn');

let tasks = JSON.parse(localStorage.getItem("tasks"));

if(tasks === null) {
    const tasksCollection = []
    localStorage.setItem("tasks", JSON.stringify(tasksCollection));
};

quickAdd.addEventListener("keypress", e => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    let actualList = JSON.parse(localStorage.getItem("lists.actualList"));
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(e.keyCode === 13) {
        if(quickAdd.value.length !== 0){
            const newTask = quickAdd.value;
            let todoDate = dayAsString(new Date(), 0);
            let completeDate = null;
            let trashDate = null;
            let priority = 0
            const addedTask = {
                id: Date.now().toString(),
                newTask,
                complete: false,
                list: lists[actualList],
                todoDate,
                completeDate,
                trashDate,
                priority,
            };
            tasks.push(addedTask)
            newTaskLine(addedTask);
            quickAdd.value = "";

            localStorage.setItem("tasks", JSON.stringify(tasks));
        };
    };
});

const newTaskLine = (addedTask) => {

    const div = document.createElement('li');
    div.classList.add('one-task');

    // const drag = document.createElement('button');
    // drag.classList.add('move-holder');
    // drag.innerHTML = "&#8942&#8942"

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    
    input.id = addedTask.id
    input.checked = addedTask.complete
   
    const label = document.createElement('label');
    label.setAttribute('for', addedTask.id);

    const priorityMark = document.createElement('div')
    priorityMark.classList.add('priority')
    
    const span = document.createElement('span');
    span.classList.add("task");
    span.innerHTML = `${addedTask.newTask}`;

    const editTaskButton = document.createElement('button');
    editTaskButton.classList.add("edit-button");
    editTaskButton.innerHTML = "&#8230";

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add("delete-button");
    deleteTaskButton.innerHTML = "&#215";

    taskList.appendChild(div);
    // div.appendChild(drag)
    div.appendChild(input);
    div.appendChild(label);
    label.appendChild(priorityMark)
    div.appendChild(span);
    div.appendChild(editTaskButton);
    div.appendChild(deleteTaskButton);

    deleteTaskButton.onclick = () => {
        deleteTask(addedTask.id);
    };

    taskComplete(input);
    taskPriority(addedTask.priority, priorityMark)
};

const taskComplete = (input) => {
    if(input.checked === false) {
        input.parentElement.classList.remove('task-complete');
    } else {
        input.parentElement.classList.add('task-complete');
    };
};

taskList.addEventListener("change", e => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (e.target.type === 'checkbox') {
        const selectedTask = tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        if(e.target.checked === true) {
            selectedTask.completeDate = dayAsString(new Date(), 0);
        } else {
            selectedTask.completeDate = null;
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    taskComplete(e.target);
});

const taskPriority = (priority, priorityMark) => {
    if(priority === 3) {
        priorityMark.style.borderColor = "red"
    } else if (priority === 2) {
        priorityMark.style.borderColor = "orangered"
    } else if (priority === 1) {
        priorityMark.style.borderColor = "orange"
    } else {
        priorityMark.style.borderColor = "transparent"
    };
};

taskList.addEventListener("dblclick", e => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (e.target.tagName.toLowerCase() === 'span') {
        const selectedTask = tasks.filter(task => task.newTask === e.target.innerHTML);

        e.target.innerHTML = "";
        const textEdit = document.createElement('input');
        textEdit.setAttribute('id', 'text-editor-input');
        textEdit.setAttribute('name', 'text-editor-input');
        textEdit.setAttribute('type', 'text');
        textEdit.value = `${selectedTask[0].newTask}`;
        e.target.appendChild(textEdit);
        textEdit.focus();


        textEdit.addEventListener("keypress", e => {
            if(e.keyCode === 13 && textEdit.value !== "") {
                let changedTask = tasks.filter(task => task.id === selectedTask[0].id);
                changedTask[0].newTask = textEdit.value
                localStorage.setItem("tasks", JSON.stringify(tasks));
                recreateTasks(new Date());
            };
        });
        textEdit.addEventListener('focusout', recreateTasks(new Date()));
    };
});

const deleteTask = (id) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let lists = JSON.parse(localStorage.getItem("lists"));
    
    if(actualList === 1) {
        let filteredTask = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(filteredTask));
    } else {
        let deletedTask = tasks.filter(task => task.id === id);
        deletedTask[0].list = lists[1];
        deletedTask[0].trashDate = dayAsString(new Date(), 0);
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    recreateTasks(new Date());
};

const dayAsString = (day, timeDifference) => {
    const xDay = new Date(day);

    const clientTimezoneOffset = new Date().getTimezoneOffset()/60;
    xDay.setHours(xDay.getHours() - clientTimezoneOffset);

    xDay.setDate(xDay.getDate() + timeDifference);
    return xDay.toISOString().slice(0, 10);
};

const showTasks = (tasks) => {
    taskList.style.textDecoration = "none";

    tasks.sort(function(a, b) {
        return b.id - a.id;
    });

    tasks.sort(function(a, b) {
        if(a.todoDate > b.todoDate) {
            return 1
        } else {
            return -1
        }
    });

    tasks.sort(function(a, b) {
        return b.priority - a.priority;
    });

    tasks.forEach(task => {
        newTaskLine(task)
    });
};

const recreateTasks = (day) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let lists = JSON.parse(localStorage.getItem("lists"));
    let actualList = JSON.parse(localStorage.getItem("lists.actualList"));
    taskList.innerHTML = "";

    replaceDoneTasks(0, 0, null);
    replaceDoneTasks(-2, 1, dayAsString(new Date(), 0));
    removeOldTaskFromTrash();

    let currentDay = new Date().getDate() + " " + watchMonths[new Date().getMonth()]
    let activeDay = day.getDate() + " " + watchMonths[day.getMonth()]
    taskDate.innerHTML = activeDay
    
    let filteredTasks = tasks.filter(task => task.list === lists[actualList]);
    let activeTask = tasks.filter(task => task.list !== lists[0] && task.list !== lists[1] && task.todoDate <= dayAsString(new Date(), 0));
    let oneDayTasks = tasks.filter(task => task.todoDate === dayAsString(day, 0))

    if(actualList === 2) {
        if(activeDay === currentDay) {
            showTasks(activeTask);
        } else {
            showTasks(oneDayTasks);
        }
    } else if(actualList === 1) {
        showTasks(filteredTasks);
        taskList.style.textDecoration = "line-through 2px red"
    } else {
        showTasks(filteredTasks);
    };
}
