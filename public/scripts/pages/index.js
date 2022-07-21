const getPhotographers = () => {
  return fetch("../../data/photographers.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .then((json) => {
      console.log(json);
      return json.photographers;
    });
};

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

function init() {
  getPhotographers().then((photographers) => displayData(photographers));
}

init();
