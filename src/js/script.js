$(() => {
  const photosTemplate = $('#photosTemplate').html();
  const $photos = $('#photos');
  $().fancybox({
    selector: '.imglist a:visible',
    buttons: [
      "zoom",
      "share",
      "slideShow",
      "fullScreen",
      "download",
      "thumbs",
      "close"
    ],
    transitionEffect: "zoom-in-out",
    slideShow: {
      autoStart: true,
    },
    thumbs: {
      autoStart: true,
    },
  });

  let photoList = [];

  init();

  function init() {
    getItems();
  }

  function getItems() {
    API.getList().then((data) => photoList = data)
      .then(renderPhotos);
  }

  function renderPhotos(photoList) {
    $photos.html(
      photoList.map((photo) => photosTemplate
        .replace('{{url}}', photo.url)
        .replace('{{url}}', photo.url)
        .replace('{{title}}', photo.title)
      ).join(''));
  }
});