import $ from 'jQuery';
import { URL_PHOTOS } from "../config";

export default class PhotosCollection {
  constructor() {
    this.photosList = [];
  }

  getPhotos(id) {
    return fetch(`${URL_PHOTOS}?albumId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.photosList = data;
      });
  }
}