TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],
  newListTemplate: JST['lists/new'],
  newCardTemplate: JST['cards/new'],


  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    this.model.lists().each(this.addList.bind(this));
  },

  addList: function(list) {
    var listShow = new TrelloClone.Views.ListShow({ model: list });
    this.addSubview(".ul-lists", listShow.render());
  },

  removeList: function(list) {
    var subview = _.find(
      this.subviews(".ul-lists"),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview(".ul-lists", subview);
  },

  events: {
    "click button.new-list": "newListForm",
    "submit .new-list-form": "createList",
    "click button.btn-cancel-list": "cancelListForm"
  },

  newListForm: function() {
    var $form = $(this.$el.find("li.new-list-form"));
    $form.html(this.newListTemplate());
  },

  createList: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var that = this;
    var newList = new TrelloClone.Models.List({
      title: $form.find(".new-list-title").val(),
      ord: $form.find(".new-list-order").val(),
      board_id: that.model.id
    });

    newList.save({}, {
      success: function() {
        that.model.lists().add(newList);
        that.removeForm($form);
      }
    });
  },

  cancelListForm: function(event) {
    event.preventDefault();
    var $form = $(this.$el.find(".new-list-form"));
    this.removeForm($form);
  },

  removeForm: function($form) {
    $form.remove();
    this.addCreateListButton();
  },

  addCreateListButton: function() {
    var $lists = $("ul.ul-lists");
    var $li = $("<li class='new-list-form'>");
    $li.addClass("li-list");
    var $button = $("<button class='new-list'>");
    $button.text("New List");
    $li.append($button);
    $lists.append($li);
  },

  render: function() {
    var renderContent = this.template({ board: this.model });
    this.$el.html(renderContent);
    this.attachSubviews();
    this.addCreateListButton();

    return this;
  }


  // events: {
  //   "click button.btn-create-list": "newForm",
  //   "submit .form-new-list": "create",
  //   "click button.btn-delete-list": "destroy",
  //   "click button.btn-cancel": "cancelForm",

  //   "click button.btn-delete-card": "destroyCard",
  //   "click button.btn-create-card": "newCardForm",
  //   "submit .form-new-card": "createCard"
  // },

  // createCard: function(event) {
  //   event.preventDefault();
  //   var $form = $(event.currentTarget);
  //   var that = this;
  //   var listId = $form.parent().data("list-id");
  //   var list = this.model.lists().get(listId);
  //   var newCard = new TrelloClone.Models.Card({
  //     title: $form.find(".new-card-title").val(),
  //     ord: $form.find(".new-card-order").val(),
  //     list_id: listId
  //   });

  //   newCard.save({}, {
  //     success: function() {
  //       $(list).add(newCard);
  //       that.removeCardForm($form, listId);
  //     }
  //   });
  // },



  // removeCardForm: function($form, listId) {
  //   $form.remove();
  //   var $newCardButton = $("<button class='btn-create-card' data-list-id='" + listId + "'>")
  //   $newCardButton.text("add card");
  //   $("li#new-card-form-" + listId).append($newCardButton);
  // },

  // newCardForm: function(event) {
  //   var listId = $(event.currentTarget).data("list-id");
  //   var $form = $(this.$el.find("li#new-card-form-" + listId));
  //   $form.find(".btn-create-card");
  //   $form.html(this.newCardTemplate());
  // },

  

  

  

  // destroyCard: function(event) {
  //   event.preventDefault();
  //   var id = $(event.currentTarget).data("id");
  //   var listId = $(event.currentTarget).data("list-id");
  //   var card = this.model.lists().get(listId).cards().get(id);
  //   var list = this.model.lists().get(listId);
  //   card.destroy({
  //     success: list.fetch()
  //   });
  // },

  // destroy: function(event) {
  //   event.preventDefault();
  //   var id = $(event.currentTarget).data("id");
  //   var list = this.model.lists().get(id);
  //   list.destroy();
  // },


});