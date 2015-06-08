TrelloClone.Views.ListShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  tagName:   "div",
  className: "list list-group-item",

  events: {
    "click button.btn-danger": "destroyList",
  },

  addCardView: function(model) {
    var subView = new TrelloClone.Views.CardShow({ model: model });
    this.addSubview("div.cards-container", subView);
  },

  addHeaderView: function() {
    var subView = new TrelloClone.Views.ListHeader({
       model: this.model,
       collection: this.collection,
       cards: this.cards });
    this.addSubview('span.list-header', subView);
  },

  destroyList: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  initialize: function() {
    // runs on events
    this.cards = this.model.cards();
    this.listenTo(this.cards, "sync reset", this.addCardView);
    this.listenTo(this.cards, "remove", this.removeCardView);

    // runs on init
    this.addHeaderView();
    this.cards.each(this.addCardView.bind(this));
  },

  removeCardView: function (model){
    this.removeModelSubview('div.cards-container', model);
  },

  removeHeaderView: function(model) {
    this.removeModelSubview('span.list-header', model);
  },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    this.$el.find('div.cards-container').sortable();
    return this;
  }
});
