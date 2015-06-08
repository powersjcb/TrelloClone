TrelloClone.Views.ListHeader = Backbone.CompositeView.extend({

  _formShow: false,

  tagName: "strong",
  className: "form-header",

  template: function(args) {
    if (this._formShow) {
      return JST['lists/form_show'](args);
    } else if (this.model.id) {
      return JST['lists/header'](args);
    } else {
      return JST['lists/form_hide'](args);
    }
  },

  events: {
    "click" : "handleClicks",
    "submit" : "submitForm"
  },


  handleClicks: function() {
    // starts not shown
    if (this._formShow === false) {
      this._formShow = true;
      this.render();
    }



  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
        list: this.model,
    });
    this.$el.html(content);
    return this;
  },

  clearForm: function() {
    console.log(this.model);
    this._formShow = false;
    console.log(this.model);
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
