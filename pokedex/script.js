
const newForm = document.forms["newForm"]
newForm.idinput.addEventListener("blur", handleFormLeave)

function handleFormLeave(event) {
    const formData = new FormData(newForm)
	const id = Object.fromEntries(formData).idinput
    const data = fetch("https://pokeapi.co/api/v2/pokemon/" + id +"/")
    .then(function(data) {
    return data.json()
})
.then(function(json){
    const name = json.name
    const weight = json.weight
    const heightbad = String(json.height)
    let height = ""
    if(heightbad.slice(0, -1)=="") {
        height = "0." + heightbad.slice(-1);
    } else {
        height = heightbad.slice(0, -1)+"."+heightbad.slice(-1);
    } 
    document.getElementById("mon").innerHTML=("name: " + name + " weight: " + weight + "g height: " + height + "m"
    )    
})
}
