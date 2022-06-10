const taskListsHeader = document.querySelector('.taks-list');
const prevTaskLists = document.querySelector('.change-tl-back');
const taskLists = document.querySelector('.task-lists');
const nextTaskLists = document.querySelector('.change-tl-fwd');
const taskBtns = document.querySelector('.task-btns')
const addListBtn = document.querySelector('.add-list-btn');
const deleteTasksList = document.querySelector('.delete-task-list');
const listWordInHeader = document.querySelector('.list-word');

const deleteAlert = document.querySelector('.alert');
const deleteAlertYes = document.querySelector('.alert-yes');
const deleteAlertNo = document.querySelector('.alert-no');

const addListInput = document.createElement('input');
const cancelBtn = document.createElement('div');

let lists = JSON.parse(localStorage.getItem("lists"));
let actualList = JSON.parse(localStorage.getItem("lists.actualList"));
// let actualList = 2;

if(lists === null) {
    const listsCollection = ["Done", "Trash", "Tasks list"];
    localStorage.setItem("lists", JSON.stringify(listsCollection));
};

const makeNewList = (addListInput) => {
    let lists = JSON.parse(localStorage.getItem("lists"));

    const newListName = addListInput.value;
    taskLists.innerHTML = newListName;

    lists.push(newListName)
    localStorage.setItem("lists", JSON.stringify(lists));

    addListInput.value = "";
    actualList = lists.length - 1;
};

addListBtn.onclick = () => {
    newTaskHeader();

    addListInput.addEventListener("keypress", e => {
        if(e.keyCode === 13 && addListInput.value.length !== 0) {
            makeNewList(addListInput);
            taskHeader();
            recreateList();
        };
    });
    cancelBtn.addEventListener('click', taskHeader);
};

const taskHeader= () => {
    taskListsHeader.innerHTML = "";
    taskBtns.innerHTML = "";

    taskListsHeader.appendChild(prevTaskLists);
    taskListsHeader.appendChild(taskLists);
    taskListsHeader.appendChild(nextTaskLists);

    taskBtns.appendChild(addListBtn);
    taskBtns.appendChild(deleteTasksList);
    taskBtns.appendChild(listWordInHeader);
};

const newTaskHeader= () => {
    taskListsHeader.innerHTML = "";
    taskBtns.innerHTML = "";

    cancelBtn.classList.add('cancel-add-list-btn');
    cancelBtn.innerHTML = "CANCEL ADDING";

    addListInput.classList.add('add-list-input');
    addListInput.setAttribute('type', "text");
    addListInput.setAttribute('maxlength', "12");
    addListInput.setAttribute('placeholder', "New tasks list");

    taskListsHeader.appendChild(addListInput);
    taskBtns.appendChild(cancelBtn);
    taskBtns.appendChild(listWordInHeader);
    addListInput.focus()
}

nextTaskLists.onclick = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));

    if(actualList !== lists.length - 1) {
        actualList += 1
    } else {
        actualList = 0
    };
    recreateList();
};

prevTaskLists.onclick = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));

    if(actualList !== 0) {
        actualList -= 1
    } else {
        actualList = lists.length - 1
    };
    recreateList();
};

deleteTasksList.onclick = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    if(actualList > 2){
        deleteAlert.innerHTML = `Are you sure you want to delete<br>the &#187 ${lists[actualList]} &#171 list<br>with all the tasks?`;
        showAlert(removeList);
    };
};

const showAlert = (toRemove) => {
    deleteAlert.style.display = "flex";
    deleteAlert.appendChild(deleteAlertNo);
    deleteAlert.appendChild(deleteAlertYes);
    deleteAlertYes.innerHTML = "YES"
    deleteAlertNo.innerHTML = 'NO'

    deleteAlertNo.onclick = () => {
        deleteAlert.style.display = "none";
    };

    deleteAlertYes.onclick = () => {
        toRemove();
        deleteAlert.style.display = "none";
    };
};

const removeList = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    taskLists.innerHTML = lists[actualList - 1];
    filteredLists = lists.filter(list => list !== lists[actualList]);
    actualList -= 1

    replaceTasksList(lists[1]);
    localStorage.setItem("lists", JSON.stringify(filteredLists));
    recreateList();
};

const clearList = () => {
    let filteredTasks = tasks.filter(task => task.list !== lists[actualList]);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    recreateList()
};

const clearListAlert = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let tasksOnActualList = tasks.filter(task => task.list === lists[actualList]);
    if(tasksOnActualList.length === 0) {
        deleteAlert.innerHTML = `There's nothing here!`;
        showAlert()
        deleteAlert.removeChild(deleteAlertYes)
        deleteAlertNo.innerHTML = "OK"
    } else {
        deleteAlert.innerHTML = `Are you sure you want to delete<br> all tasks from &#187 ${lists[actualList]} &#171 ?`;
        showAlert(clearList);
    };
}

const recreateList = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    taskLists.innerHTML = lists[actualList];

    if(actualList < 2){
        deleteTasksList.style.cursor = 'not-allowed';
        quickAddContainer.innerHTML = ""
        const clearAllBtn = document.createElement('button');
        clearAllBtn.classList.add('clear-all');
        clearAllBtn.innerHTML = "Clear all";
        quickAddContainer.appendChild(clearAllBtn);

        clearAllBtn.addEventListener('click', clearListAlert)
    } else if(actualList === 2) {
        deleteTasksList.style.cursor = 'not-allowed';
        quickAddContainer.innerHTML = ""
        quickAddContainer.appendChild(quickAdd);
        quickAddContainer.appendChild(quickAddBtn);
    } else {
        deleteTasksList.style.cursor = 'pointer';
        quickAddContainer.innerHTML = ""
        quickAddContainer.appendChild(quickAdd);
        quickAddContainer.appendChild(quickAddBtn);
    };
    localStorage.setItem("lists.actualList", JSON.stringify(actualList));
    recreateTasks();
};

recreateList();
