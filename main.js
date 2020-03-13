document.getElementById('todoInputForm').addEventListener('submit', addTodo());

function addTodo(e) {
    let todoId = chance.guid();
    let todoTitle = document.getElementById('todo-title').value;
    let todoDec = document.getElementById('todo-description').value;
    let todoPrio = document.getElementsByClassName('todo-priority').value;
    let todoStatus = 'Open';

    let todo = {
        id: todoId,
        title: todoTitle,
        description: todoDec,
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

    console.log(JSON.parse(localStorage.getItem('todos')))
}

function fetchTodosData() {
    let todos = JSON.parse(localStorage.getItem('todos'))

}