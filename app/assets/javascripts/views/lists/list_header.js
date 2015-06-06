TrelloClone.Views.ListHeader = Backbone.View.extend({

  _formShow: false,

  tagName: "h4",
  className: "form-header",

  events: {
    "click" : "displayForm",
    "submit" : "submitForm"
  },


  displayForm: function() {
    if (this._formShow === false) {
      this._formShow = true;
      this.render();
    }
  },

  initialize: function() {
    this.listenTo(this.model, 'reset', this.revertHeader);
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },


  revertHeader: function() {
    this._formShow = false;
  },

  template: function(args) {
    if (this._formShow) {
      return JST['lists/form_show'](args);
    } else {
      return JST['lists/header'](args);
    }
  }
});
