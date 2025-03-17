const ramens = [
    {
      id: 1,
      name: "Shoyu Ramen",
      restaurant: "Ichiran",
      image: "./images/shoyu.jpg",
      rating: 5,
      comment: "Delicious!"
    },

    {
      id: 2,
      name: "Miso Ramen",
      restaurant: "Menya",
      image: "./images/naruto.jpg",
      rating: 4,
      comment: "Very flavorful!"
    },

    {
      id: 3,
      name: "Tonkotsu Ramen",
      restaurant: "Ramen-ya",
      image: "./images/nirvana.jpg",
      rating: 5,
      comment: "Nice"

    },

    {
        id: 4,
        name: "Gyukotsu Ramen",
        restaurant: "Ka-Ya Ramen",
        image: "./images/gyukotsu.jpg",
        rating: 8,
        comment: "Good Gyukotsu ever had."
      },
      {
        id: 5,
        name: "Kojiro Red Ramen",
        restaurant: "Ramen-Ya",
        image: "./images/kojiro.jpg",
        rating: 6,
        comment: "The best ever had."
      }
  ];
  //a functio that load images from the ramens array using forEach
    // method and append them as <img> elements inside the #ramen-menu div.
  function picturesDisplay() {
    const ramenMenu = document.getElementById("ramen-menu"); 
    ramens.forEach(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    }); 
  }
function handleClick(ramen) {
  const menuDetails = document.getElementById("menu-details");

  menuDetails.querySelector(".detail-image").src = ramen.image;
  menuDetails.querySelector(".detail-image").alt = ramen.name;
  menuDetails.querySelector(".detail-image").dataset.id = ramen.id;
  menuDetails.querySelector(".name").textContent = ramen.name;
  menuDetails.querySelector(".restaurant").textContent = ramen.restaurant;
  menuDetails.querySelector(".rating").textContent = `Rating: ${ramen.rating}/10`;
  menuDetails.querySelector(".comment").textContent = ramen.comment;
}
//a function to handle form submission for adding a new ramen.
  function addSubmitListener() {
    const form = document.getElementById("details");
    form.addEventListener("submit", (events) => {
        events.preventDefault();//prevent the page from submitting and refreshing 
        // the page

        const newRamen = {
            id: ramens.length + 1,
            name: events.target.elements.name.value,
            restaurant: events.target.elements.restaurant.value,
            image: events.target.elements.image.value,
            rating: parseInt(events.target.elements.rating.value),
            comment: events.target.elements.comment.value
        };
        ramens.push(newRamen);//adds the newRamen to the last part of the ramen array
        //adds the new images to the ramen-menu
        const ramenMenu = document.getElementById("ramen-menu");
        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.dataset.id = newRamen.id;
        img.addEventListener("click", () => handleClick(newRamen));
        ramenMenu.appendChild(img);

        form.reset();//resets the form field
    });
}

//// Function that handles form submission for editing a ramen's rating and comment
function formEditor() {
  const editForm = document.getElementById("edit-ramen");

  editForm.addEventListener("submit", (events) => {
    events.preventDefault();

    //gets the selected image
    const selectedRamenId = document.querySelector("#menu-details .detail-image").dataset.id;
    //finds the id of the selected image
    const selectedRamen = ramens.find(ramen => ramen.id === parseInt(selectedRamenId));

    if (selectedRamen) {
      selectedRamen.rating = parseInt(events.target.elements["edit-rating"].value);
      selectedRamen.comment = events.target.elements["edit-comment"].value;

      const menuDetails = document.getElementById("menu-details");
      menuDetails.querySelector(".rating").textContent = `Rating: ${selectedRamen.rating}/10`;
      menuDetails.querySelector(".comment").textContent = `Comment: ${selectedRamen.comment}`;
    }
  });
}
//function that initializes the application 
  function main(){
    picturesDisplay();
    addSubmitListener();
    formEditor();
  }
  // Ensuring the DOM is fully loaded before running the main function.
  document.addEventListener("DOMContentLoaded", main);