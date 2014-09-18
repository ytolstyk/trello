TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,

  url: "api/lists",

  initialize: function(models, options) {
    console.log("new lists collection");
    this.board = options.board;
  }
  
});