TrelloClone.Views.ListShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  tagName:   "div",
  className: "list list-group-item",

  events: {
    "click button.btn-danger": "destroyList",
  },

  addCardView: function(model) {
    var subView = new TrelloClone.Views.CardShow({ model: model });
    this.addSubview("div.cards-container", subView);
  },

  addHeaderView: function() {
    var subView = new TrelloClone.Views.ListHeader({
       model: this.model,
       collection: this.collection,
       cards: this.cards });
    this.addSubview('span.list-header', subView);
  },

  destroyList: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  initialize: function() {
    // runs on events
    this.$el.attr('data-id', this.model.id);
    this.cards = this.model.cards();
    this.listenTo(this.cards, "sync reset", this.addCardView);
    this.listenTo(this.cards, "remove", this.removeCardView);
    this.listenTo(this.cards, "sync", this.render);

    // runs on init
    this.addHeaderView();
    this.cards.each(this.addCardView.bind(this));
  },

  removeCardView: function (model){
    this.removeModelSubview('div.cards-container', model);
  },

  removeHeaderView: function(model) {
    this.removeModelSubview('span.list-header', model);
  },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();

    var $el = this.$el;

    setTimeout( function() {
      $el.find('div.cards-container').sortable({
        update: function () {
          this.updateOrder($el, this.cards);
        }.bind(this),
        connectWith: "div.cards-container",
        dropOnEmpty: true
      });
    }.bind(this), 0);

    return this;
  },

  updateOrder: function($list, collection) {
    var listIds = $list.find('.card-item').map(function(i, el) {
        return $(el).data('id');
    });

    for (var i = 0; i < listIds.length; i++) {
      var model = collection.get(listIds[i]);
      model.set('ord', i);
    }
  }

});
