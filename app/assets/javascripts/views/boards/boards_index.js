TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],
  tagName:   "div",
  className: "board col-xs-10 col-xs-offset-1 clearfix",
  events: {
    'click div.form' : 'handleFormClick'
  },

  addBoardView: function(model) {
    var subView = new TrelloClone.Views.BoardsIndexItem({ model: model });
    this.addSubview("ul", subView);
  },

  addFormView: function(model) {
    var subView = new TrelloClone.Views.FormView({ model: model });
    this.addSubview("div.form", subView);
  },

  initialize: function() {
    this.listenTo(this.collection, "add", this.addBoardView);
    this.listenTo(this.collection, "remove", this.removeBoardView);
    this.collection.each(this.addBoardView.bind(this));
  },

  removeBoardView: function (model){
    this.removeModelSubview('ul', model);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  handleFormClick: function(event) {
    if ($(event.currentTarget).find('.board-form').length === 0) {
      var boardModel = new TrelloClone.Models.Board();
      this.addFormView(boardModel);
      this.render();
    }
  }
});
