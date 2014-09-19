json.(list, :title, :id, :board_id, :ord)
json.cards list.cards do |card|
  json.(card, :title, :description, :ord)
end
