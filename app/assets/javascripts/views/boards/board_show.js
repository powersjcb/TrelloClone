TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],
  tagName:   "div",
  className: "board clearfix",

  events: {
    "sortupdate div.lists-container": "handleMove"
  },

  addListView: function(model) {
    var subView = new TrelloClone.Views.ListShow({
      model: model,
      collection: this.lists
    });
    this.addSubview("div.lists-container", subView);
  },

  addListForm: function() {
    this.resetFormModel();
    var subView = new TrelloClone.Views.ListHeader({
      model: this.formModel,
      collection: this.lists
    });
    this.addSubview('div.list-form', subView);
  },

  clearListForm: function () {
    this.removeFormView(this.formModel);
    this.addListForm();
  },

  handleMove: function() {
    console.log('move complete?');
  },

  initialize: function(options) {
    this.lists = options.lists;

    this.listenTo(this.lists, "add",    this.addListView);
    this.listenTo(this.lists, "sync",   this.clearListForm);
    this.listenTo(this.lists, "remove", this.removeListView);
    this.listenTo(this.model, "sync",   this.render);
    this.lists.each(this.addListView.bind(this));
    this.addListForm();
  },

  resetFormModel: function () {
    console.log('cats');
    this.formModel = new TrelloClone.Models.List({
      board_id: this.model.get('id'),
      parse: true
    });
  },

  removeFormView: function (model) {
    this.removeModelSubview('div.list-form', model);
  },

  removeListView: function (model){
    this.removeModelSubview('div.lists-container', model);
  },

  render: function() {
    var content = this.template({ board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    this.$el.find('div.lists-container').sortable();
    this.$el.find('div.cards-container').sortable({
      connectWith: "div.cards-container",
      dropOnEmpty: true
    });

    return this;
  }
});
