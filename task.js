document.querySelector('#add-new-task').onclick = function(){
    if(document.querySelector('#new-task').value.length == 0){
        alert("Enter your task")
    }
    else {
        document.querySelector('.tasks').innerHTML += `
            <div class="one-task">
                ${document.querySelector('#new-task').value}
            </div>
        `;
    }
}