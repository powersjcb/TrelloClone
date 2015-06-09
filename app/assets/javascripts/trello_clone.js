window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},
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
