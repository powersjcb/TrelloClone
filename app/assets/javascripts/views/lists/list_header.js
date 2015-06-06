TrelloClone.Views.ListHeader = Backbone.CompositeView.extend({

  _formShow: false,

  tagName: "h4",
  className: "list-header",

  template: function() {
    if (this._formShow) {
      return JST['lists/form_show'];
    } else {
      return JST['lists/header'];
    }
  },

  initialize: function() {
    this.listenTo(this.model, 'reset', this.revertHeader);
  },

  render: function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubViews();
    return this;
  },

  revertHeader: function() {
    this._formShow = false;
  }

});
