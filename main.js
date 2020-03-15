document.getElementById('todoInputForm').addEventListener('submit', addTodo);
let points = 0;

function addTodo(e) {
    let todoId = chance.guid();
    let todoTitle = document.getElementById('todo-title').value;
    let todoDec = document.getElementById('todo-description').value;
    let todoPrio = document.getElementById('todo-priority').value;
    let todoStatus = 'Open';

    let todo = {
        id: todoId,
        title: todoTitle,
        desc: todoDec,
        priority: todoPrio,
        status: todoStatus 
    }

    if (localStorage.getItem('todos') == null) {
        let todos = [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos))
    } else {
        let todos = JSON.parse(localStorage.getItem('todos'))
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    document.getElementById('todoInputForm').reset()
    fetchTodosData()
    console.log(localStorage.getItem('todos'))
    e.preventDefault();
}

function todoDone(id, prio) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    for(let i = 0; i < todos.length; i++) {
        if(todos[i].id === id) {
            todos.splice(i, 1)
        }
    }

    if(prio === 'Low') {
        points += 30
    } else if (prio === 'Middle') {
        points += 50
    } else if (prio === 'High') {
        points += 100
    }

    localStorage.setItem('todos', JSON.stringify(todos))
    document.getElementById('score').innerHTML = `Points: ${points}`
    fetchTodosData()
} 

function fetchTodosData() {
    let todos = JSON.parse(localStorage.getItem('todos'))
    let todosList = document.getElementById('todos-overview');
    console.log(todos)
    todosList.innerHTML = '';

    for (let i = todos.length-1 ; i >= 0; i--) {
        let id = todos[i].id;
        let title = todos[i].title;
        let desc = todos[i].desc;
        let priority = todos[i].priority;
        let status = todos[i].status;

        let setPriority = () => {
            if(priority === 'Low') {
                return 'todo-item-low'
            } else if (priority === 'Middle') {
                return 'todo-item-middle'
            } else if (priority === 'High') {
                return 'todo-item-high'
            }
        }
        
        todosList.innerHTML += `<div class="col-11 card bg-white mt-4 ml-4 row justify-content-center ${setPriority()}" data-toggle="collapse" data-target="#i${id}" aria-expanded="false" aria-controls="i${id}" style="height: 50px;">
                                    ${title}
                                    <button class="btn btn-success btn-sm col-2 align-self-end" onclick="todoDone('${id}', '${priority}')">Done</button>
                                </div> 
                                <div class="collapse mt-1" id="i${id}">
                                    <div class="card card-body">
                                        ${desc}
                                    </div>
                                </div>
                                `
    }
}