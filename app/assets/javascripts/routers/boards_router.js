TrelloClone.Routers.Boards = Backbone.Router.extend({

  routes: {
    "": "boards",
    "boards/:id" : "showBoard"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boardsCollection = new TrelloClone.Collections.Boards();

  },

  boards: function () {
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: this.boardsCollection
    });
    boardsIndexView.collection.fetch();
    this.$rootEl.html(boardsIndexView.render().$el);
  },

  showBoard: function(id) {
    console.log('this');
  }


});
