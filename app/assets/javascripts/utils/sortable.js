TrelloClone.Mixins.Sortable = {

  updateOrder: function($list, collection) {
    var listIds = $list.find('.list').map(function(i, el) {
        return $(el).data('id');
    });

    for (var i = 0; i < listIds.length; i++) {
      var model = collection.get(listIds[i]);
      model.set('ord', i);
    }

    collection.save();
  }
};
