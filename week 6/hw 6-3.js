db.companies.aggregate([
  {$match: {
    "founded_year": 2004
  }},
  {$addFields: {
    "num_rounds": {$size: "$funding_rounds"}
  }},
  {$match: {"num_rounds": {$gte: 5}}},
  {$project: {
    _id: 0,
    "name": 1,
    "AVG_amount_raised": {$avg: "$funding_rounds.raised_amount"}
  }},
  {$sort: {"AVG_amount_raised": 1}}
]);
