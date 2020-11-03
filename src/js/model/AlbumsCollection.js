import $ from 'jQuery';
import { URL_ALBUMS } from "../config";

export default class AlbumsCollection {
  constructor() {
    this.albumsList = [];
  }

  getAlbums() {
    return fetch(URL_ALBUMS)
      .then((res) => res.json())
      .then((data) => {
        this.albumsList = data;
      });
  }
}