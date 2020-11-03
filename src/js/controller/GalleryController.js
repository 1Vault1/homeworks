import $ from 'jQuery';

import AlbumsView from "../view/AlbumsView";
import PhotosView from "../view/PhotosView";
import AlbumsCollection from "../model/AlbumsCollection";
import PhotosCollection from "../model/PhotosCollection";

export default class GalleryController {
  constructor() {
    this.albumsView = new AlbumsView({
      onToggleAlbum: (id) => this.onToggleAlbum(id),
    });
    this.photosView = new PhotosView();

    this.albumsCollection = new AlbumsCollection();
    this.photosCollection = new PhotosCollection();

    $('.container')
      .append(this.albumsView.$el)
      .append(this.photosView.$el);

    this.albumsCollection.getAlbums()
      .then(() => this.renderAlbums())
      .then(() => this.renderFirstPhotos());
    this.photosCollection.getPhotos().then(() => this.renderPhotos());
  }

  onToggleAlbum(id) {
    this.photosCollection.getPhotos(id).then(() => this.renderPhotos());
  }

  renderAlbums() {
    this.albumsView.render(this.albumsCollection.albumsList);
  }

  renderPhotos() {
    this.photosView.render(this.photosCollection.photosList);
  }

  renderFirstPhotos() {
    const id = this.albumsCollection.albumsList[0].id;

    this.photosCollection.getPhotos(id).then(() => this.renderPhotos());
  }
} 