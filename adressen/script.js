// data list as the «source of truth»
const data = []

// install submit handler on form, allows also to send with enter
document.querySelector("form").addEventListener("submit", function (event) {

  // prevents the form from reloading the site
  event.preventDefault()

  // get input element from DOM
  const inputs = document.getElementsByName("addItem");
  const address = { firstname: document.getElementById("firstname").value, lastname: document.getElementById("lastname").value, street: document.getElementById("street").value, zipcode: document.getElementById("zipcode").value, email: document.getElementById("email").value }

  // add text to data list and clear the input field
  if (address["firstname"] != "" || address["lastname"] != "") {
    data.push(address)
    inputs.forEach((input) => {
      input.value = ""
    });
    // update the ui with the new list
    renderList(data)
    document.getElementById("error").remove()
  } else {
    if (document.getElementById("error") == null) {
      const error = document.createElement("span")
      error.innerText = "First- and Lastname must be filled out!"
      error.setAttribute("id", "error");
      document.getElementById("form").append(error)
      console.log(document.getElementById("error"))
    }
  }
})

function renderList(data) {
  // get existing list and remove all elements inside
  const list = document.getElementById("list")
  list.replaceChildren()

  // iterate the data list, text holds value, id holds index
  data.forEach((object, id) => {
    const text = "firstname: " + (object["firstname"] + " lastname: " + object["lastname"] + " street: " + object["street"] + " zipcode: " + object["zipcode"] + " email: " + object["email"])
    // create new elements in DOM
    const newLi = document.createElement("li")
    newLi.innerText = text
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "x"

    // handle click on each delete button
    deleteButton.onclick = () => {

      // id is the index of THIS list element we're currently creating, splice removes 1 element at the index given
      data.splice(id, 1)

      // after we change the data, we need to update the ui again
      renderList(data)
    }

    // append elements to list
    newLi.append(deleteButton)
    list.append(newLi)
  });

}