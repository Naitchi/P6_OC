//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const id = url.searchParams.get('id');
let mediasArray = [];
const back = document.getElementById('back');
const front = document.getElementById('front');

const arrow = document.getElementById('Arrow');
const moreChoice = document.getElementById('MoreChoice');
const activated = document.getElementById('Activited');
const choice2 = document.getElementById('Choice2');
const choice3 = document.getElementById('Choice3');

const form = document.getElementById('form');
const h2 = document.getElementById('h2');
const send = document.getElementById('send');

const getPhotographer = () => {
  return fetch('../../data/photographers.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .then((json) => {
      console.log(json.photographers.filter((e) => e.id == id));
      return json.photographers.filter((e) => e.id == id);
    });
};
const getMediaOfAPhotographer = () => {
  return fetch('../../data/photographers.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server response wasn't OK");
      }
    })
    .then((json) => {
      console.log(json.media.filter((e) => e.photographerId == id));
      return json.media.filter((e) => e.photographerId == id);
    });
};

function displayPhotographer(photographer) {
  const photographerSection = document.querySelector('.photograph-header');
  const contact = document.querySelector('.contact_modal_button');
  const fixed = document.getElementById('fix');
  const likebox = document.createElement('div');
  const heart = document.createElement('p');
  const like = document.createElement('p');
  like.id = 'total';
  heart.innerHTML = '♥';
  likebox.classList.add('likeBox');
  likebox.appendChild(like);
  likebox.appendChild(heart);
  const price = document.createElement('p');
  price.innerHTML = `${photographer[0].price}€ / jour`;

  const photographerModel = photographerFactory(photographer[0]);
  const leftPart = photographerModel.leftPartHeader();
  const rightPart = photographerModel.rightPartHeader();

  photographerSection.appendChild(leftPart);
  photographerSection.appendChild(contact);
  photographerSection.appendChild(rightPart);
  fixed.appendChild(likebox);
  fixed.appendChild(price);
}
function displayMedias(medias) {
  const oldMedias = document.getElementById('mediasSection');
  if (oldMedias) oldMedias.remove();
  const main = document.getElementById('main');
  const mediasSection = document.createElement('div');

  mediasSection.id = 'mediasSection';
  var count = 0;
  medias.forEach((media) => {
    const mediaModel = photoFactory(media);
    const pictureCardDOM = mediaModel.getPictureCardDOM(count);
    mediasSection.appendChild(pictureCardDOM);
    count++;
  });

  main.appendChild(mediasSection);
}

const orderByPopularity = () => {
  mediasArray.sort((a, b) => b.likes - a.likes);
  console.log(mediasArray);
  displayMedias(mediasArray);
};
const orderByDate = () => {
  mediasArray.sort((a, b) => {
    return ('' + b.date).localeCompare(a.date);
  });
  console.log(mediasArray);
  displayMedias(mediasArray);
};
const orderByTitle = () => {
  mediasArray.sort((a, b) => {
    return ('' + a.title).localeCompare(b.title);
  });
  console.log(mediasArray);
  displayMedias(mediasArray);
};

const nextPhoto = (e) => {
  if (document.getElementById('CARD')) {
    const card = document.getElementById('CARD');
    var index = card.getAttribute('index');
    index++;
    const itemData = mediasArray[index];
    if (!itemData) return;
    card.remove();
    const divImage = document.getElementById('img-contener');
    const title = document.getElementById('TITLE');
    title.innerHTML = itemData.title;
    if (itemData.video) {
      const item = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute('src', 'assets/media/' + itemData.video);
      source.setAttribute('type', 'video/mp4');
      item.appendChild(source);
      item.id = 'CARD';
      item.setAttribute('index', index);
      item.autoplay = true;
      item.loop = true;
      item.muted = true;
      divImage.appendChild(item);
    } else {
      console.log(`assets/media/${itemData.image}`);
      const item = document.createElement('img');
      item.id = 'CARD';
      item.setAttribute('src', `assets/media/${itemData.image}`);
      item.setAttribute('index', index);
      divImage.appendChild(item);
    }
  }
};
const previousPhoto = (e) => {
  if (document.getElementById('CARD')) {
    const card = document.getElementById('CARD');
    var index = card.getAttribute('index');
    index--;
    const itemData = mediasArray[index];
    if (!itemData) return;
    card.remove();
    const divImage = document.getElementById('img-contener');
    const title = document.getElementById('TITLE');
    title.innerHTML = itemData.title;

    if (itemData.video) {
      const item = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute('src', 'assets/media/' + itemData.video);
      source.setAttribute('type', 'video/mp4');
      item.appendChild(source);
      item.id = 'CARD';
      item.setAttribute('index', index);
      item.autoplay = true;
      item.loop = true;
      item.muted = true;
      divImage.appendChild(item);
    } else {
      const item = document.createElement('img');
      item.id = 'CARD';
      item.setAttribute('src', `assets/media/${itemData.image}`);
      item.setAttribute('index', index);
      divImage.appendChild(item);
    }
  }
};

const toggleDropDown = () => {
  arrow.classList.toggle('fa-rotate-90');
  arrow.classList.toggle('fa-rotate-270');
  moreChoice.classList.toggle('hide');
};
const clickAChoice = (choice, clickedOn) => {
  console.log(clickedOn);
  if (clickedOn === 'Popularité') {
    orderByPopularity();
    if (choice === 2) choice2.innerHTML = activated.innerHTML;
    else choice3.innerHTML = activated.innerHTML;
    activated.innerHTML = 'Popularité';
  } else if (clickedOn === 'Date') {
    orderByDate();
    if (choice === 2) choice2.innerHTML = activated.innerHTML;
    else choice3.innerHTML = activated.innerHTML;
    activated.innerHTML = 'Date';
  } else if (clickedOn === 'Titre') {
    orderByTitle();
    if (choice === 2) choice2.innerHTML = activated.innerHTML;
    else choice3.innerHTML = activated.innerHTML;
    activated.innerHTML = 'Titre';
  }
  toggleDropDown();
};

const total = (medias) => {
  const total = document.getElementById('total');
  console.log(medias);
  total.innerHTML = medias.reduce((count, item) => count + item.likes, 0);
};

const createInput = (inputClass, id, type, name) => {
  const input = document.createElement('input');
  if (inputClass) input.classList.add(inputClass);
  if (id) input.id = id;
  if (type) input.setAttribute('type', type);
  if (name) input.setAttribute('name', name);
  return input;
};

const createLabel = (labelClass, id, link, content) => {
  console.log('in the label creation');
  const label = document.createElement('label');
  if (labelClass) label.classList.add(labelClass);
  if (id) label.id = id;
  if (link) label.setAttribute('for', link);
  label.innerHTML = content;
  return label;
};

const initContactModal = (photographer) => {
  h2.innerHTML = `Contactez-moi ${photographer[0].name}`;
  const labelName = createLabel('label', null, 'name', 'Nom');
  form.appendChild(labelName);
  const inputName = createInput('input', 'name', 'text', 'name');
  form.appendChild(inputName);
  const labelEmail = createLabel('label', null, 'email', 'Email');
  form.appendChild(labelEmail);
  const inputEmail = createInput('input', 'email', 'text', 'email');
  form.appendChild(inputEmail);
  const labelMessage = createLabel('label', null, 'message', 'Votre message');
  form.appendChild(labelMessage);
  const inputMessage = createInput('input', 'message', 'text', 'message');
  inputMessage.classList.add('message');
  form.appendChild(inputMessage);
};
const sendForm = () => {
  const prenom = document.getElementById('prenom');
  const nom = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  prenom.value = '';
  nom.value = '';
  email.value = '';
  message.value = '';
  alert('Message bien envoyé !');
};

function init() {
  getPhotographer().then((photographer) => {
    displayPhotographer(photographer);
    initContactModal(photographer);
  });
  getMediaOfAPhotographer().then((medias) => {
    mediasArray = medias;
    displayMedias(medias);
    orderByTitle();
    total(medias);
  });
}

init();

//Order.addEventListener("click", orderDropDown);
front.addEventListener('click', nextPhoto);
back.addEventListener('click', previousPhoto);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextPhoto();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') previousPhoto();
});
activated.addEventListener('click', toggleDropDown);
choice2.addEventListener('click', function () {
  clickAChoice(2, choice2.innerHTML);
});
choice3.addEventListener('click', function () {
  clickAChoice(3, choice3.innerHTML);
});
send.addEventListener('click', sendForm);
