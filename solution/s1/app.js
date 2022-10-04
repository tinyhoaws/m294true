// the form element can be referenced by name
const newAddressForm = document.forms["newAddress"]

// get the list and error element to fill later
const addressListElement = document.getElementById("list")
const errorElement = document.getElementById("error")

// initialize the empty list for storing the data
const addresses = []

// register the handleSubmitForm() function to be called when the form is submitted
newAddressForm.addEventListener("submit", handleFormSubmit)


function handleFormSubmit(event) {
	// make sure the browser does not send the form data to a server and reload the page
	event.preventDefault()

	// turn the formElements into an object we can work with
	const formData = new FormData(newAddressForm)
	const address = Object.fromEntries(formData)

	// reset error message
	errorElement.innerText = ""

	if (isValid(address)) {

		// add the new address to the list, rerender the list and empty all input fields
		addresses.push(address)
		renderAddresses()
		newAddressForm.reset()

	} else {
		errorElement.innerText = "Adresse ist nicht gültig"
	}
}

function renderAddresses() {

	// render all elements, clear the list and then add them
	newChildren = addresses.map((address, id) => renderAddress(address, id))
	addressListElement.replaceChildren()
	addressListElement.append(...newChildren)
}

function renderAddress(address, id) {

	// create all elements
	const article = document.createElement("article")
	const name = document.createElement("h3")
	const addressLine = document.createElement("p")
	const email = document.createElement("a")
	const deleteButton = renderDeleteButton(address)

	// fill in the data
	name.innerText = `${address.first_name} ${address.last_name}`
	addressLine.innerHTML = `${address.street}<br>${address.zipcode} ${address.city}`
	email.innerText = address.email
	email.href = `mailto:${address.email}`

	// add all subelements to the main node
	article.append(name, addressLine, email, deleteButton)
	return article
}

function renderDeleteButton(id) {
	const button = document.createElement("button")
	button.innerText = "Delete"
	button.onclick = () => {
		addresses.remove(address)
		renderAddresses()
	}
	return button
}

function isValid(address) {
	if (address.first_name == "" && address.last_name == "") return false

	return true
}
