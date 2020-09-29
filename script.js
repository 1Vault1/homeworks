'use strict';

const TITLE_ALBUM_CLASS = 'title-album';
const ACTIVE_ALBUM_CLASS = 'active';

const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';
const urlPhotos = 'https://jsonplaceholder.typicode.com/photos?albumId={{id}}';

const albumsTemplate = document.getElementById('albumsTemplate').innerHTML;
const photosTemplate = document.getElementById('photosTemplate').innerHTML;

const albumsEl = document.getElementById('albums');
const photosEl = document.getElementById('photos');

albumsEl.addEventListener('click', onAlbumsElClick);

addAlbums().then(addFirstPhotos);

function onAlbumsElClick(e) {
  if (e.target.classList.contains(TITLE_ALBUM_CLASS)) {
    addPhotos(e.target.dataset.id);
  }
}

function addFirstPhotos(photos) {
  addPhotos(photos[0].id);
}

function addAlbums() {
  return fetch(urlAlbums)
    .then((res) => res.json())
    .then((data) => {
      renderAlbumList(data);
      return data;
    });
}

function renderAlbumList(list) {
  return list.forEach((item) => renderAlbum(item));
}

function renderAlbum(item) {
  const html = Object.keys(item).reduce(
    (template, key) => template.replace('{{' + key + '}}', item[key]),
    albumsTemplate
  );

  albumsEl.insertAdjacentHTML('beforeend', html);
}

function addPhotos(id) {
  return fetch(urlPhotos.replace('{{id}}', id))
    .then((res) => res.json())
    .then(renderPhotosList);
}

function renderPhotosList(photos) {
  photosEl.innerHTML = photos.map((item) => renderPhotos(item)).join('');
}

function renderPhotos(item) {
  return Object.keys(item).reduce(
    (template, key) => template.replace('{{' + key + '}}', item[key]),
    photosTemplate
  );
}