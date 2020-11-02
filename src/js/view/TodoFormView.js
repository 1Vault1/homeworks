class TodoFormView {
  constructor(config) {
    this.config = config;
    this.$el = this.initView();
    this.$taskInput = this.$el.find('#taskNameInput');
  }

  initView() {
    return $(`<form id="addTaskForm">
                <div class="row">
                  <div class="ten columns">
                    <input type="text" id="taskNameInput" class="u-full-width" />
                  </div>
                  <div class="two columns">
                    <input id="addBtn" type="submit" class="u-full-width" value="Add" />
                  </div>
                </div>
              </form>`).on('submit', (e) => this.onAddBtnClick(e));
  }

  onAddBtnClick(e) {
    e.preventDefault();

    const task = {
      title: this.$taskInput.val()
    };

    this.config.addContact(task);

    this.clear();
  }

  clear() {
    this.$taskInput.val('');
  }
}

