TrelloClone.Views.ListShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  tagName:   "li",
  className: "list list-group-item",

  addCardView: function(model) {
    var subView = new TrelloClone.Views.CardShow({ model: model });
    this.addSubview("ul", subView);
  },

  addHeaderView: function() {
    var subView = new TrelloClone.Views.ListHeader({ model: this.model });
    this.addSubview('div.list-header', subView);
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.addHeaderView);

    this.collection = this.model.cards();
    this.listenTo(this.collection, "add", this.addCardView);
    this.listenTo(this.collection, "remove", this.removeCardView);
    this.collection.each(this.addCardView.bind(this));
  },

  removeCardView: function (model){
    this.removeModelSubview('ul', model);
  },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
