TrelloClone.Routers.Boards = Backbone.Router.extend({

  routes: {
    "": "boards",
    "boards/:id" : "showBoard"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  boards: function () {
    this.boardsCollection = new TrelloClone.Collections.Boards();

    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: this.boardsCollection
    });
    boardsIndexView.collection.fetch();

    this._swapView(boardsIndexView);
  },

  showBoard: function(id) {
    // TODO: get or fetch this model
    this.boardModel = new TrelloClone.Models.Board({id: id});
    this.listCollection = this.boardModel.lists();
    this.boardModel.fetch();

    var boardView = new TrelloClone.Views.BoardShow({
      collection: this.listCollection,
      model: this.boardModel
    });

    this._swapView(boardView);
  },


  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
