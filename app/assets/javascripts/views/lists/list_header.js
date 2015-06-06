TrelloClone.Views.ListHeader = Backbone.CompositeView.extend({

  _formShow: false,

  tagName: "h4",
  className: "form-header",

  template: function(args) {
    if (this._formShow) {
      return JST['lists/form_show'](args);
    } else {
      return JST['lists/header'](args);
    }
  },

  events: {
    "click" : "displayForm",
    "submit" : "submitForm"
  },


  displayForm: function() {
    if (this._formShow === false) {
      this._formShow = true;
      this.render();
      console.log('displaying form now');
    }
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    console.log(this.model);
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },

  clearForm: function() {
    console.log('cearing form');
    this._formShow = false;
  },

  submitForm: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).find('form').serializeJSON();
    this.model.set(formData);
    this.model.save({},{
      success: this.clearForm.bind(this),
      // errors: errorsListTitle
    });
  },

});
