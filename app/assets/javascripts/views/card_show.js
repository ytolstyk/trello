TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],

  initialize: function () {
    this.listenTo(this.model, "sync add remove", this.render);
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