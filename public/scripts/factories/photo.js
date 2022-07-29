import { displayPhotoModal } from '../utils/contactForm.js';

export function photoFactory(data, mediasArray) {
  const { date, id, image, likes, photographerId, price, title, video } = data;

  const picture = `assets/media/${image}`;

  const getPictureCardDOM = (count) => {
    var likewhatever = likes;
    const article = document.createElement('article');
    article.classList.add('post');
    article.setAttribute('photoId', id);
    const bottom = document.createElement('div');
    bottom.classList.add('bottom');

    const desc = document.createElement('p');
    desc.textContent = title;

    const like = document.createElement('p');
    like.classList.add('like');
    like.textContent = likes + '♥';
    like.setAttribute('tabindex', 0);
    like.addEventListener('click', function () {
      likewhatever++;
      like.innerHTML = likewhatever + '♥';
      const totalLikes = document.getElementById('total');
      totalLikes.innerHTML++;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && like == document.activeElement) {
        likewhatever++;
        like.innerHTML = likewhatever + '♥';
        const totalLikes = document.getElementById('total');
        totalLikes.innerHTML++;
      }
    });
    bottom.appendChild(desc);
    bottom.appendChild(like);
    if (image) {
      const img = document.createElement('img');
      img.setAttribute('tabindex', 0);
      img.setAttribute('src', picture);
      img.setAttribute('id', id);
      img.setAttribute('index', count);

      img.id = id;
      img.classList.add('photo');
      img.addEventListener('click', (e) => displayPhotoModal(e, mediasArray));
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && img == document.activeElement) displayPhotoModal({ target: img });
      });
      article.appendChild(img);
    } else if (video) {
      const img = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute('src', 'assets/media/' + video);
      source.setAttribute('type', 'video/mp4');
      img.appendChild(source);
      img.setAttribute('index', count);
      img.setAttribute('tabindex', 0);
      img.autoplay = true;
      img.loop = true;
      img.muted = true;
      img.classList.add('video');
      img.addEventListener('click', (e) => displayPhotoModal(e));
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && img === document.activeElement) displayPhotoModal({ target: img });
      });
      article.appendChild(img);
    }
    article.appendChild(bottom);

    return article;
  };

  return {
    date,
    id,
    image,
    likes,
    photographerId,
    price,
    title,
    getPictureCardDOM,
  };
}
