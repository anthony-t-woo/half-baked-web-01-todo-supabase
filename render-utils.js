export function renderTodo(todo) {
    // create a div and a p tag
    const listItemEl = document.createElement('div');
    const p = document.createElement('p');

    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    if (todo.complete) {
        listItemEl.classList.add('complete');
    }
    // add the 'todo' css class no matter what
    listItemEl.classList.add('todo');
    // put the todo's text into the p tag
    p.textContent = todo.todo;
    // append stuff
    listItemEl.append(p);
    // return the div
    return listItemEl;
}
