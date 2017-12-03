db.item.aggregate([
  {$group: {
    _id: {"category": "$category"},
    num: {$sum: 1}
  }},
  {$sort: {"_id.category": 1}}
]);

db.item.aggregate([
  {$match: {
    "category": "Apparel"
  }},
  {$sort: {"_id": 1}},
  {$limit: 5},
  {$skip: 4}
]);

db.item.aggregate([
{$match: {
  "category": "Apparel"
}}
]);

db.item.createIndex({
  "title": "text",
  "slogan": "text",
  "description": "text"
});

db.item.find({$text: {$search: "leaf"}});


var reviewDoc = {
    name: "Maria",
    comment: "This is a SECOND try to see if I can insert coments",
    stars: 1,
    date: Date.now()
};

db.item.update(
  {_id: 12},
  {$push: {reviews: reviewDoc}
});


db.cart.aggregate([
  { $match: {
    "userId": "558098a65133816958968d88"
  }},
  {$unwind: "$items"},
  { $match: {
    "items._id": 2
  }}
]).pretty();

db.cart.aggregate([
  {$match: {userId: "558098a65133816958968d88"}},
  {$project: {items: 1}}
]).itcount();
