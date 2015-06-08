TrelloClone.Collections.Lists = Backbone.Collection.extend({

  model: TrelloClone.Models.List,

  url: "api/lists",

  comparator: function(card) {
    return card.get('ord');
  }

});
