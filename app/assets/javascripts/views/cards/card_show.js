// TrelloClone.Views.CardsShow = Backbone.CompositeView.extend({
//
//   template: JST['boards/show'],
//   tagName:   "div",
//   className: "card",
//
//
//   addListView: function(model) {
//     var subView = new TrelloClone.Views.List({ model: model });
//     this.addSubview("ul", subView);
//   },
//
//   initialize: function() {
//     this.listenTo(this.collection, "add", this.addListView);
//     this.listenTo(this.collection, "remove", this.removeListView);
//     this.collection.each(this.addListView.bind(this));
//   },
//
//   removeListView: function (model){
//     this.removeModelSubview('ul', model);
//   },
//
//   render: function() {
//     var content = this.template();
//     this.$el.html(content);
//     this.attachSubviews();
//     return this;
//   }
// });
