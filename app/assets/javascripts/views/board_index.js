TrelloClone.Views.BoardIndex = Backbone.View.extend({

  template: JST['boards/index'],
  formTemplate: JST['boards/new'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render)
  },

  render: function() {
    var renderContent = this.template({ boards: this.collection });
    this.$el.html(renderContent);

    return this;
  },

  events: {
    "click button.btn-create-board": "newForm",
    "submit .form-new-board": "create",
    "click button.btn-delete-board": "destroy",
    "click button.btn-refresh-board": "refresh",
    "click button.btn-cancel": "cancelForm"
  },

  cancelForm: function(event) {
    event.preventDefault();
    var $form = $(this.$el.find(".form-new-board"));
    this.removeForm($form);
  },

  destroy: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("id");
    var board = this.collection.get(id);
    board.destroy();
  },

  newForm: function() {
    var $form = $(this.$el.find("li.new-board-form"));
    $form.html(this.formTemplate());
  },

  removeForm: function($form) {
    $form.remove();
    var $newBoardButton = $("<button class='btn-create-board'>");
    $newBoardButton.text("Create");
    $("li.new-board-form").append($newBoardButton);
  },

  create: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var that = this;
    var newBoard = new TrelloClone.Models.Board({
      title: $form.find(".new-board-title").val()
    });

    newBoard.save({}, {
      success: function() {
        that.collection.add(newBoard);
        that.removeForm($form);
      }
    });
  },

  refresh: function() {
    this.collection.fetch();
  }

});