class TodoFormView {
  constructor(config) {
    this.config = config;

    this.$el = $('#addTaskForm').on('click', '#addBtn', (e) => this.onAddBtnClick(e));
    this.$taskNameInputEl = $('#taskNameInput');
  }

  onAddBtnClick(e) {
    e.preventDefault();

    this.config.addContact({
      title: this.$taskNameInputEl.val()
    });
  }
}