TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  url: "api/cards",

  initialize: function(models, options) {
    console.log("new cards collection");
    this.list = options.list;
  }
});