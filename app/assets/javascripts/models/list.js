TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",


  initialize: function() {
    if (this.board && this.board.get('id')) {
      board_id: this.board.get('id');
    }
  },



  cards: function() {
    if (this._cards) {
      return this._cards;
    }
    this._cards = new TrelloClone.Collections.Cards({ list: this });
    return this._cards;
  },

  parse: function(payload) {
    if (payload.cards) {
      this.cards().set(payload.cards, {parse: true});
      delete payload.cards;
    }
    return payload;
  }

});
