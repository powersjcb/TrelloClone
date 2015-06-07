TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],
  tagName:   "div",
  className: "board clearfix",


  addListView: function(model) {
    var subView = new TrelloClone.Views.ListShow({ model: model });
    this.addSubview("ul.lists-container", subView);
  },

  addListForm: function() {
    this.resetFormModel();
    var subView = new TrelloClone.Views.ListHeader({
      model: this.formModel,
      collection: this.collection
    });
    this.addSubview('div.list-form', subView);
  },

  clearListForm: function () {
    this.removeFormView(this.formModel);
    this.addListForm();
  },


  initialize: function() {
    this.listenTo(this.collection, "add",    this.addListView);
    this.listenTo(this.collection, "sync",   this.clearListForm);
    this.listenTo(this.collection, "remove", this.removeListView);
    this.listenTo(this.collection, "sync",   this.render);
    this.collection.each(this.addListView.bind(this));
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
    this.removeModelSubview('ul.lists-container', model);
  },

  render: function() {
    var content = this.template({ board: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
