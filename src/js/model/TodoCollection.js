class TodoCollection {
  constructor() {
    this.list = [];
  }

  getList() {
    return fetch(TODOS_URL)
      .then(res => res.json())
      .then((data) => this.list = data);
  }

  toggle(id) {
    const todo = this.list.find(item => item.id == id);
    todo.isDone = !todo.isDone;

    return fetch(`${TODOS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete(id) {
    this.list = this.list.filter((item) => item.id != id);

    return fetch(`${TODOS_URL}/${id}`, {
      method: 'DELETE',
    });
  }

  add(contact) {
    return fetch(TODOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
      .then(res => res.json())
      .then(this.list.push(contact));
  }
}