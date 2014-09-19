TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  initialize: function () {
    this.listenTo(this.model, "sync add remove", this.render);
  },

  events: {
    "click .delete-card": "removeSelf"
  },

  removeSelf: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var renderedContent = this.template({ 
      card: this.model,
    });
    this.$el.html(renderedContent);

    return this;
  }

});