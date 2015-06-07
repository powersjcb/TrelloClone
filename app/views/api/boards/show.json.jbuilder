# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list


json.extract!(@board, :id, :title)


json.members @board.members do |member|
  json.id(member.id)
  json.email(member.email)
end

json.lists @board.lists do |list|
  json.id(list.id)
  json.title(list.title)
  json.ord(list.ord)
  json.board_id(list.board_id)

  json.cards list.cards do |card|
    json.id(card.id)
    json.title(card.title)
    json.list_id(card.title)
    json.description(card.description)
    json.ord(card.ord)
  end
end
