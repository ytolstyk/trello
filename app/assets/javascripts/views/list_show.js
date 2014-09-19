TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  newCardTemplate: JST['cards/new'],

  initialize: function () {
    this.listenTo(this.model, "sync add remove", this.render);
    this.listenTo(this.model.cards(), "sync reset add", this.addCard);
    this.listenTo(this.model.cards(), "sync reset remove", this.removeCard);

    this.model.lists().each(this.addCard.bind(this));
  },

  

  events: {
    "click button.delete-list": "removeSelf"
  },

  removeSelf: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function() {
    var renderedContent = this.template({ 
      list: this.model,
     });
    this.$el.html(renderedContent);

    return this;
  }

});