TrelloClone.Routers.Board = Backbone.Router.extend({
  routes: {
    "": "index",
    ":id": "show"
  },

  initialize: function(options) {
    this.$main = options.$main;
    this.boardCollection = TrelloClone.boards;
  },

  index: function() {
    this.boardCollection.fetch();
    var boardIndex = new TrelloClone.Views.BoardIndex({
      collection: this.boardCollection
    });

    this.$main.html(boardIndex.render().$el);
  },

  show: function(id) {
    var board = TrelloClone.boards.getOrFetch(id);
    board.fetch();
    var boardShow = new TrelloClone.Views.BoardShow({
      model: board
    });

    this._swapView(boardShow);
  },

  _swapView: function(view) {
    if(this._currentView) {
      this._currentView.remove();
    }

    this.$main.html(view.render().$el);
    this._currentView = view;
  }
});