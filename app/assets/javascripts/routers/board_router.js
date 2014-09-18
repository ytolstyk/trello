TrelloClone.Routers.Board = Backbone.Router.extend({
  routes: {
    "": "index",
    "/new": "create"
  },

  initialize: function(options) {
    this.$content = options.$content;
    this.boardCollection = TrelloClone.boards;
  },

  index: function() {
    this.boardCollection.fetch();
    var boardIndex = new TrelloClone.Views.BoardIndex({
      collection: this.boardCollection
    });

    this.$content.html(boardIndex.render().$el);
  },

  _swapView: function(view) {

  }
});