export function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  const elements = document.querySelectorAll('[tabindex]');
  elements.forEach((e) => {
    if (
      e.id === 'prenom' ||
      e.id === 'name' ||
      e.id === 'email' ||
      e.id === 'message' ||
      e.id === 'cross2' ||
      e.id === 'send'
    ) {
      console.log(e);
    } else e.setAttribute('tabindex', -1);
  });
}

export function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  const elements = document.querySelectorAll('[tabindex="-1"]');
  elements.forEach((e) => {
    e.setAttribute('tabindex', 0);
  });
}

export function displayPhotoModal(e, mediasArray) {
  const elements = document.querySelectorAll('[tabindex]');
  elements.forEach((e) => {
    if (e.id === 'front' || e.id === 'back' || e.id === 'cross') {
      console.log(e);
    } else e.setAttribute('tabindex', -1);
  });
  const itemData = mediasArray[e.target.getAttribute('index')];
  const modal = document.getElementById('photo_modal');
  modal.style.display = 'flex';
  const title = document.createElement('p');
  if (document.getElementById('TITLE') !== null) {
    document.getElementById('TITLE').remove();
  }
  title.innerHTML = itemData.title;
  title.id = 'TITLE';
  modal.appendChild(title);
  if (document.getElementById('CARD') !== null) {
    document.getElementById('CARD').remove();
  }
  const divImage = document.getElementById('img-contener');
  if (itemData.video) {
    const item = document.createElement('video');
    const source = document.createElement('source');
    source.setAttribute('src', 'assets/media/' + itemData.video);
    source.setAttribute('type', 'video/mp4');
    item.appendChild(source);
    item.id = 'CARD';
    item.setAttribute('index', e.target.getAttribute('index'));
    item.autoplay = true;
    item.loop = true;
    item.muted = true;
    divImage.appendChild(item);
  } else {
    const item = document.createElement('img');
    item.id = 'CARD';
    item.setAttribute('src', e.target.src);
    item.setAttribute('index', e.target.getAttribute('index'));
    divImage.appendChild(item);
  }
}

export function closePhotoModal() {
  const elements = document.querySelectorAll('[tabindex="-1"]');
  elements.forEach((e) => {
    e.setAttribute('tabindex', 0);
  });
  const modal = document.getElementById('photo_modal');
  modal.style.display = 'none';
}
