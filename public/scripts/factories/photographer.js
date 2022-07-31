export function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const link = document.createElement('a');
    link.classList.add('link');
    link.href = new URL(
      window.location.protocol + '//' + window.location.host + '/photographer.html?id=' + id,
    );
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.classList.add('nom');
    h2.textContent = name;
    const lieu = document.createElement('p');
    lieu.classList.add('lieu');
    lieu.setAttribute('tabindex', 0);
    lieu.innerHTML = city + ',' + country;
    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.setAttribute('tabindex', 0);
    desc.innerHTML = tagline;
    const cost = document.createElement('p');
    cost.classList.add('price');
    cost.setAttribute('tabindex', 0);
    cost.innerHTML = price + '€/jour';
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(lieu);
    article.appendChild(desc);
    article.appendChild(cost);

    return article;
  }

  function leftPartHeader() {
    const contener = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = name;
    h1.classList.add('name');
    h1.setAttribute('tabindex', 0);
    const place = document.createElement('p');
    place.textContent = city + ', ' + country;
    place.classList.add('place');
    place.setAttribute('tabindex', 0);
    const desc = document.createElement('p');
    desc.textContent = tagline;
    desc.setAttribute('tabindex', 0);
    contener.appendChild(h1);
    contener.appendChild(place);
    contener.appendChild(desc);

    return contener;
  }

  function rightPartHeader() {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.classList.add('profilepicture');
    return img;
  }

  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    getUserCardDOM,
    leftPartHeader,
    rightPartHeader,
  };
}
