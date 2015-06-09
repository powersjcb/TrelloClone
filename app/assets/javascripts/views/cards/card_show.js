TrelloClone.Views.CardShow = Backbone.CompositeView.extend({

  template: JST['cards/show'],
  tagName:   "div",
  className: "card-item",

  initialize: function() {
    $(this.$el).attr("data-id", this.model.id);
  },

  render: function() {
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
