TrelloClone.Views.List = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  tagName:   "li",
  className: "list",

  // addCardView: function(model) {
  //   var subView = new TrelloClone.Views.Card({ model: model });
  //   this.addSubview("ul", subView);
  // },
  //
  // initialize: function() {
  //   this.listenTo(this.collection, "add", this.addCardView);
  //   this.listenTo(this.collection, "remove", this.removeCardView);
  //   this.collection.each(this.addCardView.bind(this));
  // },
  //
  // removeCardView: function (model){
  //   this.removeModelSubview('ul', model);
  // },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
