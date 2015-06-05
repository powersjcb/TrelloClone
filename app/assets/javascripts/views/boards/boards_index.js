TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],
  tagName:   "div",
  className: "",
  events: {
    'submit' : 'submitForm'
  },

  addBoardView: function(model) {
    var subView = new TrelloClone.Views.BoardsIndexItem({ model: model });
    this.addSubview("ul", subView);
  },

  initialize: function() {
    this.listenTo(this.collection, "add", this.addBoardView);
    this.listenTo(this.collection, "remove", this.removeBoardView);
    this.collection.each(this.addBoardView.bind(this));
  },

  removeBoardView: function (model){
    this.removeModelSubview('ul', model);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();

    this.model = new TrelloClone.Models.Board();
    var attrs = $(event.target).serializeJSON();

    var success = function () {
      this.collection.add(this.model);
      this.$el.find('input').val('');
    }.bind(this);

    function errors (model, response) {
      var $errors = $('.errors');
      response.responseJSON.forEach(function (el) {
        var $li = $('<li>');
        $li.text(el);
      }.bind(this));
      $('.errors').append($li);
    }

    this.model.save(attrs, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  },



});
