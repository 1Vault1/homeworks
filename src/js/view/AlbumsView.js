import $ from 'jQuery';

export default class AlbumsView {
  constructor(config) {
    this.config = config;
    this.$el = this.initView();
  }

  initView() {
    return $(`<div id="albums" class="albums"></div>`)
      .on('click', '.title-album', (e) => this.onAlbumClick(e));
  }

  render(list) {
    this.$el.html(list.map(this.getAlbum).join('\n'));
  }

  getAlbum(album) {
    return `<div class="title-album" data-id="${album.id}">
                ${album.title}
            </div>`;
  }

  onAlbumClick(e) {
    const id = $(e.target).data('id');

    this.config.onToggleAlbum(id);
  }
}