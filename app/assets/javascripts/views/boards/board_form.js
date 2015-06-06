TrelloClone.Views.FormView = Backbone.View.extend({
  template: JST['boards/form'],
  tagName: "form",
  className: 'board-form',

  events: {
    'submit' : 'submitForm'
  },

  initialize: function() {
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },



  submitForm: function(event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();

    var success = function (model) {
      Backbone.history.navigate('#boards/'+ model.id, {trigger: true});
    }.bind(this);

    function errors (model, response) {
      var $errors = $('.errors');
      var $li;
      response.responseJSON.forEach(function (el) {
        $li = $('<li>');
        $li.text(el);
      }.bind(this));
      $errors.html($li);
    }

    this.model.save(attrs, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  },

});
