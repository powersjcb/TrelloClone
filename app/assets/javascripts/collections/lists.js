TrelloClone.Collections.Lists = Backbone.Collection.extend({

  model: TrelloClone.Models.List,
  url: "api/lists",
  mixins: TrelloClone.Mixins.Sortable,

  comparator: function(card) {
    return card.get('ord');
  }

});
