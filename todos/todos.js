import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// let some todo state (an array)
let todoData = [];
// on submit,
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // create a todo in supabase using form data
    const todo = new FormData(todoForm);
    const data = { todo: todo.get('todo') };
    await createTodo(data);
    // reset the form DOM element
    todoForm.reset();
    // and display the todos
    await displayTodos();
});

async function displayTodos() {
    // clear the container (.textContent = '')
    todosEl.textContent = '';
    // fetch the user's todos from supabase
    todoData = await getTodos();
    // loop through the user's todos
    todoData.forEach((todo) => {
        // for each todo, render a new todo DOM element using your render function
        const rendering = renderTodo(todo);
        // then add an event listener to each todo (only adds event listener to incomplete items)
        if (!todo.complete) {
            rendering.addEventListener('click', async () => {
                // on click, update the todo in supabase
                await completeTodo(todo.id);
                // then (shockingly!) call displayTodos() to refresh the list
                displayTodos();
            });
        }
        // append the rendered todo DOM element to the todosEl
        todosEl.append(rendering);
        // for (let todo of todoData) {
    });
}

window.addEventListener('load', async () => {
    // fetch the todos and store in state (already done in the displayTodos function)
    // call displayTodos
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});
