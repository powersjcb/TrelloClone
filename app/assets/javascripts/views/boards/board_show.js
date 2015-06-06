TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],
  tagName:   "div",
  className: "board col-xs-10 col-xs-offset-1 clearfix",


  addListView: function(model) {
    var subView = new TrelloClone.Views.ListShow({ model: model });
    this.addSubview("ul.lists-container", subView);
  },

  


  initialize: function() {
    this.listenTo(this.collection, "add", this.addListView);
    this.listenTo(this.collection, "remove", this.removeListView);
    this.listenTo(this.collection, "sync", this.render);
    this.collection.each(this.addListView.bind(this));
  },

  removeListView: function (model){
    this.removeModelSubview('ul.lists-container', model);
  },

  render: function() {
    var content = this.template({ board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
