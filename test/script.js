const newForm = document.forms["newForm"]
const getList = document.getElementById("getList")
getList.addEventListener("click", handleGetList)
newForm.addEventListener("submit", handleNewToDo)

// const formData = new FormData(newForm)
// const id = Object.fromEntries(formData).idinput

function renderList(data) {

    const list = document.getElementById("list")
    list.replaceChildren()

    data.forEach((object) => {
        const text = " Task: " + object["title"] + " completed: " + object["completed"] + " "
            // create new elements in DOM
        const newLi = document.createElement("li")
        newLi.innerText = text
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "x"
        const editButton = document.createElement("button")
        editButton.innerText = "edit"

        // handle click on each delete button
        deleteButton.onclick = () => {
            fetch('http://127.0.0.1:3000/task/' + object["id"], {
                method: 'DELETE',
            }).then(function() {
                const data = fetch("http://127.0.0.1:3000/tasks")
                    .then(function(data) {
                        return data.json()
                    })
                    .then(function(json) {
                        renderList(json)
                    })
            })
        }

        // append elements to list
        newLi.append(deleteButton)
        newLi.append(editButton)
        list.append(newLi)
    });

}

function handleNewToDo(event) {
    const formData = new FormData(newForm)
    const todo = Object.fromEntries(formData)
    event.preventDefault()
    if (todo.title == "") {
        const error = document.createElement("span")
        error.innerText = "Error: Title can't be empty"
        list.append(error)
    } else {
        // turn the formElements into an object we can work with
        todo["completed"] = "false"
        postToDoToBackend(todo)
        newForm.reset()
    }
}

function postToDoToBackend(todo) {
    fetch("http://127.0.0.1:3000/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    }).then(function() {
        const data = fetch("http://127.0.0.1:3000/tasks")
            .then(function(data) {
                return data.json()
            })
            .then(function(json) {
                renderList(json)
            })
    })
}

function handleGetList(event) {
    event.preventDefault()
    const data = fetch("http://127.0.0.1:3000/tasks")
        .then(function(data) {
            return data.json()
        })
        .then(function(json) {
            renderList(json)
        })
};