
document.addEventListener('DOMContentLoaded', function () {


    function getDateAndHour() {

            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
                +(currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + ' '
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            var clock = document.getElementById('clock');
        clock.innerText = datetime;
    }

    setInterval(function () {

        getDateAndHour();

    },1000);






    var input = document.getElementById('taskInput');
    var priorInput = document.getElementById('priorInput');
    var taskButton = document.getElementById('addTaskButton');
    var removeAllBtn = document.getElementById('removeFinishedTasksButton');
    var taskList = document.getElementById('taskList');
    var popUp = document.createElement('span');
    var counter = document.getElementById('counter');

    taskButton.addEventListener('click', function () {
        if(input.value.length >= 5 && input.value.length <= 100) {
            if(priorInput.value >= 1 && priorInput.value <= 10) {
                counter.innerText++;
                var inputValue = input.value;
                var existingTask = document.getElementsByTagName('li');
                var existingTaskArr = [];
                for(var i =0; i<existingTask.length; i++){
                    existingTaskArr.push(existingTask[i]);
                }

                var newTaskLi = document.createElement('li');
                newTaskLi.dataset.id = priorInput.value;
                existingTaskArr.push(newTaskLi);
                newTaskLi.innerHTML = '<input type="checkbox" class="checkbox"> </input>' +
                    '<h2 contenteditable="true">' + inputValue + '</h2>' +
                    '<button>Delete</button>';
                newTaskLi.style.listStyleType = "none";
                if(existingTask === null){
                    taskList.appendChild(newTaskLi);
                }else {
                    var sortedArr = existingTaskArr.sort(function (a, b) {
                        return b.dataset.id - a.dataset.id;
                    });


                    for (var i = 0; i < sortedArr.length; i++) {

                        taskList.appendChild(sortedArr[i]);
                    }
                }

                var deleteBtn = newTaskLi.querySelector('button:first-of-type');
                var completeBox = newTaskLi.querySelector('input:first-of-type');

                deleteBtn.addEventListener('click', function () {
                    newTaskLi.parentElement.removeChild(newTaskLi);
                    if (completeBox.checked !== true) {
                        counter.innerText--;
                    }
                });

                completeBox.addEventListener('click', function () {
                    var taskMessage = newTaskLi.querySelector('h2');
                    taskMessage.classList.toggle('done');
                    if (completeBox.checked == true) {
                        counter.innerText--;
                    } else {
                        counter.innerText++;
                    }
                });

            }else {
                popUp.classList.add('tooltipText');
                popUp.innerText = 'Prior value must be between 1 and 10';
                this.appendChild(popUp);
            }

        }else {

            popUp.classList.add('tooltipText');
            popUp.innerText = 'Task length must be between 5 and 100 signs';
            this.appendChild(popUp);
        }
        input.value = '';
        priorInput.value = '';
    });

    taskButton.addEventListener('mouseout', function () {
        if(this.children.length !== 0) {
            popUp.parentElement.removeChild(popUp);
        }

    });
    
    removeAllBtn.addEventListener('click', function () {
        var completedTasks = document.querySelectorAll('.done');
        for(var i =0; i<completedTasks.length; i++){
            completedTasks[i].parentElement.remove();
        }
    });

});










