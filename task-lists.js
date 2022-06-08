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

let lists = JSON.parse(localStorage.getItem("lists"));
let actualList = 2;

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
    taskListsHeader.innerHTML = "";
    taskBtns.innerHTML = "";

    const cancelBtn = document.createElement('div');
    cancelBtn.classList.add('cancel-add-list-btn');
    cancelBtn.innerHTML = "CANCEL ADDING";

    const addListInput = document.createElement('input');
    addListInput.classList.add('add-list-input');
    addListInput.setAttribute('type', "text");
    addListInput.setAttribute('maxlength', "12");
    addListInput.setAttribute('placeholder', "New tasks list");

    taskListsHeader.appendChild(addListInput);
    taskBtns.appendChild(cancelBtn);
    taskBtns.appendChild(listWordInHeader);

    addListInput.addEventListener("keypress", e => {
        if(e.keyCode === 13) {
            if(addListInput.value.length !== 0) {
                makeNewList(addListInput);
                taskHeader();
                recreateList();
            };
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

    deleteAlert.style.display = "flex";
    deleteAlert.innerHTML = `Are you sure you want to delete<br>the ${lists[actualList]} list<br>with all the tasks?`;
    deleteAlert.appendChild(deleteAlertNo);
    deleteAlert.appendChild(deleteAlertYes);
    
    deleteAlertNo.onclick = () => {
        deleteAlert.style.display = "none";
    };

    deleteAlertYes.onclick = () => {
        if(actualList > 2){
            taskLists.innerHTML = lists[actualList - 1];
            filteredLists = lists.filter(list => list !== lists[actualList]);
            actualList -= 1

            deletedTasksFromRemovedLists();
            localStorage.setItem("lists", JSON.stringify(filteredLists));
            recreateList();
        };
        deleteAlert.style.display = "none";
    };
};

const recreateList = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    taskLists.innerHTML = lists[actualList];

    if(actualList < 2){
        deleteTasksList.style.cursor = 'not-allowed';
        quickAddContainer.setAttribute('class', 'scale0');
    } else if(actualList === 2) {
        deleteTasksList.style.cursor = 'not-allowed';
        quickAddContainer.setAttribute('class', 'guick-add-container');
    } else {
        deleteTasksList.style.cursor = 'pointer';
        quickAddContainer.setAttribute('class', 'guick-add-container');
    };
    
    localStorage.setItem("lists.actualList", JSON.stringify(actualList));
    recreateTasks();
};

recreateList();

