function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function displayPhotoModal(e) {
  console.log(e);
  const itemData = mediasArray[e.target.getAttribute('index')];
  console.log(itemData);
  const modal = document.getElementById('photo_modal');
  modal.style.display = 'flex';
  const title = document.createElement('p');
  if (document.getElementById('TITLE') !== null) {
    console.log(document.getElementById('TITLE'));
    document.getElementById('TITLE').remove();
  }
  title.innerHTML = itemData.title;
  title.id = 'TITLE';
  modal.appendChild(title);
  if (document.getElementById('CARD') !== null) {
    console.log(document.getElementById('CARD'));
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

function closePhotoModal() {
  const modal = document.getElementById('photo_modal');
  modal.style.display = 'none';
}
