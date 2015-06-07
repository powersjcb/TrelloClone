TrelloClone.Views.ListShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  tagName:   "li",
  className: "list list-group-item",

  addCardView: function(model) {
    var subView = new TrelloClone.Views.CardShow({ model: model });
    this.addSubview("ul", subView);
  },

  addHeaderView: function(model) {
    var subView = new TrelloClone.Views.ListHeader({
       model: model,
       collection: this.collection });
    this.addSubview('div.list-header', subView);
  },

  initialize: function() {
    // runs on events
    this.collection = this.model.cards();
    this.listenTo(this.collection, "sync reset", this.addCardView);
    this.listenTo(this.collection, "remove", this.removeCardView);

    // runs on init
    this.addHeaderView(this.model);
    this.collection.each(this.addCardView.bind(this));
  },

  removeCardView: function (model){
    this.removeModelSubview('ul', model);
  },

  removeHeaderView: function(model) {
    this.removeModelSubview('div.list-header', model);
  },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
