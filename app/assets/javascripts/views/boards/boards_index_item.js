TrelloClone.Views.BoardsIndexItem = Backbone.CompositeView.extend({
  template: JST['boards/index_item'],
  tagName:   "li",
  className: "list list-group-item",

  events: {
    'click' : 'handleClick'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  handleClick: function(event) {
    event.preventDefault();

    if ($(event.target).is("button.destroy")) {
      this.destroy();
    } else {
      Backbone.history.navigate(
        '#boards/' + this.model.id,
        {trigger: true});
    }
  },

  destroy: function() {
    this.model.destroy();
  }
});
