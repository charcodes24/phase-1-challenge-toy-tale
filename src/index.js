document.addEventListener("DOMContentLoaded", () => {
let addToy = false;
let toyObjects = 'http://localhost:3000/toys';
let outerDiv = document.getElementById('toy-collection');

//delete button
// let deleteButton = document.createElement('button');
// deleteButton.classList.add('x-btn');
// deleteButton.setAttribute('id', 'delete')
// deleteButton.innerHTML = 'X'
// console.log(`DELETE BUTTON:`,deleteButton)

//function to create HTML elements for each toy
function createToyCard(element) {
  let toyCard = document.createElement('div');
  toyCard.classList.add('card');
  outerDiv.append(toyCard)
  let toyName = document.createElement('h2');
  toyName.innerHTML = element.name;
  let toyImg = document.createElement('img');
  toyImg.src = element.image;
  toyImg.classList.add('toy-avatar');
  let likes = document.createElement('p');
  likes.innerHTML = element.likes;
  let button = document.createElement('button');
  button.classList.add('like-btn');
  button.setAttribute('id', element['id'])
  button.innerHTML = 'Like ♡'
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('x-btn');
  deleteButton.setAttribute('id', 'delete')
  deleteButton.innerHTML = 'X'
  console.log(`DELETE BUTTON:`,deleteButton)
  toyCard.append(toyName, toyImg, likes, button, deleteButton);
  deleteButton.addEventListener('click', removeToyCard);
  //event listener for like button
  button.addEventListener('click', addLikes);
};

function addLikes(event) {
  console.log(event)
  console.log(event.target.previousElementSibling)
  fetch(`${toyObjects}/${event.target.id}`, {
    method: 'PATCH', 
    headers: {
      "content-type": "application/json", 
      "accept": "application/json"
    }, 
    body: JSON.stringify({
      "likes": parseInt(event.target.previousElementSibling.innerText) + 1
    }) 
  })
  .then(res => res.json())
  .then(data => {
    debugger
    event.target.previousElementSibling.innerText = data.likes;
  })
}

//function to remove card when delete button is clicked
function removeToyCard(e) {
  fetch(toyObjects, {
    method: 'DELETE',
  })
  e.target.parentNode.remove();
} 

//add toy to page
function addToyToPage(name, image) {
  return fetch(toyObjects, {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    }) 
  })
  .then(res => res.json())
  .then(data => {
    createToyCard(data)
  })
  .catch(error => console.log(error))
}

//fetch toy objects from api
function fetchToyObjects() {
  fetch(toyObjects)
    .then(res => res.json())
    .then(data => {
      for (element of data) {
        createToyCard(element)
      }
    })
  };

  //assign form to variable, listen for submit and addToyToPage
const toyForm = document.querySelector('.add-toy-form');
toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToyToPage(e.target.name.value, e.target.image.value)
  toyForm.reset();
})

//add likes function PATCH




const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
   }
});



  fetchToyObjects();
  
});
