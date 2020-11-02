class TodoController {
  constructor() {
    this.listview = new TodoListView({
      onToggle: (id) => this.onToggle(id),
      onDelete: (id) => this.onDelete(id),
    });
    this.formView = new TodoFormView({
      addContact: (task) => this.addContact(task),
    });

    $('.container')
      .append(this.listview.$el)
      .append(this.formView.$el);

    this.collection = new TodoCollection();

    this.collection.getList().then(() => this.renderList());
  }

  onToggle(id) {
    this.collection.toggle(id);
    this.renderList();
  }

  onDelete(id) {
    this.collection.delete(id);
    this.renderList();
  }

  addContact(task) {
    this.collection.add(task).then(() => this.renderList());
  }

  renderList() {
    this.listview.render(this.collection.list);
  }
}