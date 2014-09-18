window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    console.log("started Backbone");

    new TrelloClone.Routers.Board ({
      $main: $("#main")
    });

    Backbone.history.start();
  }
};

$(function () {
  TrelloClone.initialize();
});