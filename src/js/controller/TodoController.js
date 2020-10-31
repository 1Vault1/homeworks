class TodoController {
  constructor() {
    this.$container = $('.container');
    this.listview = new TodoListView({
      onToggle: (id) => this.onToggle(id),
      onDelete: (id) => this.onDelete(id),
    });
    this.$container.append(this.listview.$el);
    this.collection = new TodoCollection();

    this.collection.getList()
      .then(() => {
        this.listview.render(this.collection.list);
      });

    this.formView = new TodoFormView({
      addContact: (data) => this.addContact(data),
    });
  }

  onToggle(id) {
    this.collection.toggle(id);
    this.listview.render(this.collection.list);
  }

  onDelete(id) {
    this.collection.delete(id);
    this.listview.render(this.collection.list);
  }

  addContact(contact) {
    this.collection.add(contact);
    this.listview.render(this.collection.list);
  }
}