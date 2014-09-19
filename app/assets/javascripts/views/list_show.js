TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  newCardTemplate: JST['cards/new'],

  initialize: function () {
    this.listenTo(this.model, "sync add remove", this.render);
    this.listenTo(this.model.cards(), "sync reset add", this.addCard);
    this.listenTo(this.model.cards(), "sync reset remove", this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(card) {
    var cardShow = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview(".ul-cards", cardShow.render());
  },

  removeCard: function(card) {
    var subview = _.find(
      this.subviews(".ul-cards"),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".ul-cards", subview);
  },

  events: {
    "click button.delete-list": "removeSelf"
  },

  removeSelf: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  addCreateCardButton: function() {
    var $cards = this.$("ul.ul-cards");
    var $li = $("<li class='new-card-form'>");
    $li.addClass("li-card");
    var $button = $("<button class='new-card'>");
    $button.text("New Card");
    $li.append($button);
    $cards.append($li);
  },

  render: function() {
    var renderedContent = this.template({ 
      list: this.model,
     });
    this.$el.html(renderedContent);
    
    this.addCreateCardButton();

    return this;
  }

});