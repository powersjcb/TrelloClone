window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.router = new TrelloClone.Routers.Boards({
      $rootEl: $('div#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
