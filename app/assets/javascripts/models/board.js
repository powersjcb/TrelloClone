TrelloClone.Models.Board = Backbone.Model.extend({

  urlRoot: "api/boards",

  //
  // members: function () {
  //   if (this._members) {
  //     return this._members;
  //   }
  //   this._members = new TrelloClone.Collections.Members({ board : this });
  //   return this._members;
  // },

  lists: function() {
    if (this._lists) {
      return this._lists;
    }
    this._lists = new TrelloClone.Collections.Lists({ board: this });
    return this._lists;
  },

  parse: function (payload) {
    if (payload.members) {
      // this.members().set(payload.members, {parse: true});
      delete payload.members;
    }

    if (payload.lists) {
      this.lists().set(payload.lists, {parse: true});
      delete payload.lists;
    }

    return payload;
  }
});
