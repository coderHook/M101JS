//example to get it from class_1
db.grades.aggregate([
  {$match: {"class_id": 1}},
  {$project: {
    _id: "$class_id",
    student_id: 1,
    scores: {
      $filter: {
        input: "$scores",
        as: "score",
        cond: {$ne: ["$$score.type", "quiz"]}
      }
    }
  }},
  {$unwind: "$scores"},
  {$group: {
    _id: "$student_id",
    "AVG_SCORE": {$avg: "$scores.score"}
  }},
  { $sort: {_id: 1}}
]);



Solucion!!!
//For each class
db.grades.aggregate([
  {$project: {
    _id: 0,
    class_id: 1,
    student_id: 1,
    scores: {
      $filter: {
        input: "$scores",
        as: "score",
        cond: {$ne: ["$$score.type", "quiz"]}
      }
    },
    "AVG_SCORE": {$avg: "$scores.score"}
  }},
  { $group: {
    _id: {
      "class_id": "$class_id"
    },
    "AVG_CLASS_SCORE": {$avg: "$AVG_SCORE"}
  }},
  {$match: {
    "_id.class_id": {$lte: 9}
  }},
  {$sort: {"AVG_CLASS_SCORE": -1}}
]);
