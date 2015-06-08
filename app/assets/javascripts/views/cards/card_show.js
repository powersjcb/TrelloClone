TrelloClone.Views.CardShow = Backbone.CompositeView.extend({

  template: JST['cards/show'],
  tagName:   "li",
  className: "card list-group-item",

  initialize: function() {
    $(this.$el).attr("data-ord", this.model.escape('ord'));
  },

  render: function() {
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
