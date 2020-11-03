import $ from 'jQuery';

export default class PhotosView {
  constructor(config) {
    this.config = config;
    this.$el = this.initView();
  }

  initView() {
    return $(`<div id="photos" class="photos"></div>`);
  }

  render(list) {
    this.$el.html(list.map(this.getPhoto).join('\n'));
  }

  getPhoto(photo) {
    return `<div class="photo" data-id="${photo.albumId}">
                <img src="${photo.url}" alt="image">
            </div>`;
  }
}