TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],
  tagName:   "div",
  className: "board clearfix",

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

  sortLists: function (event, ui) {
    var context = $(ui.item);
    console.log(context.eq(0));
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

    setTimeout(function() {
      this.$el.find('div.lists-container').sortable({
        update: function() {
          var $list = this.$el.find('div.list-container');
          this.updateOrder($list, this.model.lists());
        }.bind(this)
      });
    }.bind(this), 0);

    return this;
  },

  updateOrder: function($list, collection) {

    var listIds = $list.find('.list').map(function(i, el) {
        return $(el).data('id');
    });

    for (var i = 0; i < listIds.length; i++) {
      var model = collection.get(listIds[i]);
      model.set('ord', i);
      model.save();
    }
  }

});
