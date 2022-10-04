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
        newLi.setAttribute("id", object["id"])
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
        editButton.onclick = () => {
            clickid = (newLi.id)
            const editform = document.createElement("form")
            editform.setAttribute("id", "editform" + clickid)
            editform.setAttribute("name", "editform" + clickid)
            const editor = document.createElement("input")
            editor.setAttribute("id", "editor" + clickid)
            editor.setAttribute("name", "title")
            const save = document.createElement("button")
            save.setAttribute("id", "save" + clickid)
            save.setAttribute("type", "submit" + clickid)
            save.innerText = "save"
            if (newLi.childElementCount < 3) {
                newLi.append(editform)
                editform.append(editor)
                editform.append(save)
            } else {
                const badform = document.getElementById("editform" + clickid);
                newLi.removeChild(badform);
            }
            const newEditForm = document.forms["editform" + clickid]
            newEditForm.addEventListener("submit", handleEditToDo)

            function handleEditToDo(event) {
                const editFormData = new FormData(newEditForm)
                const editedtext = Object.fromEntries(editFormData)
                console.log(editedtext)
                event.preventDefault()
                if (editedtext.title == "") {
                    const error = document.createElement("span")
                    error.innerText = "Error: Title can't be empty"
                    list.append(error)
                } else {
                    // editedtext["completed"] = "false"
                    editToDoBackend(editedtext)
                    newEditForm.reset()
                }
            }
        }

        function editToDoBackend(edit) {
            console.log(edit)
            fetch('http://127.0.0.1:3000/tasks', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: edit.title, id: clickid })
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
        newLi.append(deleteButton)
        newLi.append(editButton)
        list.append(newLi)
    });

}

function handleNewToDo(event) {
    const formData = new FormData(newForm)
    const todo = Object.fromEntries(formData)
    console.log(todo)
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
}