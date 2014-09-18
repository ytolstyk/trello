TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  url: "/api/boards",
  
  getOrFetch: function(id) {

  }

});

TrelloClone.boards = new TrelloClone.Collections.Boards();