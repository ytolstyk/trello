TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,

  url: "/api/boards",
  
  initialize: function() {
    console.log("new boards collection");
  },

  getOrFetch: function(id) {
    var board = this.get(id);

    if (!board) {
      board = new TrelloClone.Models.Board({ id: id });
      board.fetch({
        success: function() {
          this.add(board)
        }.bind(this)
      });
    }

    return board;
  }

});

TrelloClone.boards = new TrelloClone.Collections.Boards();