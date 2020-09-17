class Accordeon {
  static CONTENT_CLASS = 'accordeon-content';
  static TITLE_CLASS = 'accordeon-title';
  static VISIBLE_CLASS = 'accordeon-visible';

  constructor(container) {
    this._container = container;
    this.bindClasses();
    this.bindEventListener();
  }

  bindClasses() {
    const contentElements = this._container.querySelectorAll('.content');

    for (let i = 0; i < contentElements.length; i++) {
      contentElements[i].classList.add(Accordeon.CONTENT_CLASS);
    }

    const titleElements = this._container.querySelectorAll('.title');

    for (let i = 0; i < titleElements.length; i++) {
      titleElements[i].classList.add(Accordeon.TITLE_CLASS);
    }
  }

  bindEventListener() {
    this._container.addEventListener('click', (event) => {
      if (event.target.classList.contains(Accordeon.TITLE_CLASS)) {
        this.toggleItem(event.target.parentNode);
      }
    });
  }

  toggleItem(el) {
    if (el.classList.contains(Accordeon.VISIBLE_CLASS)) {
      el.classList.remove(Accordeon.VISIBLE_CLASS);
    } else {
      this.removeAllClasses();
      el.classList.add(Accordeon.VISIBLE_CLASS);
    }
  }

  removeAllClasses() {
    const itemElements = this._container.querySelectorAll('.item');

    for (let i = 0; i < itemElements.length; i++) {
      itemElements[i].classList.remove(Accordeon.VISIBLE_CLASS);
    }
  }
}
