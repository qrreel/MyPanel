const replaceTasksList = (targetList, trashDateOrNull) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let lists = JSON.parse(localStorage.getItem("lists"));
    let actualList = JSON.parse(localStorage.getItem("lists.actualList"));

    let selectedList = lists[actualList]
    let seletedTaskList = tasks.filter(task => task.list === selectedList);
    
    seletedTaskList.forEach(task => {
        task.list = targetList
        task.trashDate = trashDateOrNull;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const replaceDoneTasks = (day, list, trashDateOrNull) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let lists = JSON.parse(localStorage.getItem("lists"));
    
    let completeTasks = tasks.filter(task => task.completeDate < dayAsString(new Date(), day))
    completeTasks.forEach(task => {
        task.list = lists[list];
        task.trashDate = trashDateOrNull;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeList = () => {
    let lists = JSON.parse(localStorage.getItem("lists"));
    taskLists.innerHTML = lists[actualList - 1];
    filteredLists = lists.filter(list => list !== lists[actualList]);
    actualList -= 1

    replaceTasksList(lists[1], dayAsString(new Date(), 0));
    localStorage.setItem("lists", JSON.stringify(filteredLists));
    recreateList();
};

const removeOldTaskFromTrash = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));   
    let notRemovedTasks = tasks.filter(task => task.trashDate >= dayAsString(new Date(), -6) || task.trashDate === null)
    localStorage.setItem("tasks", JSON.stringify(notRemovedTasks));
};
