const JoinModal = require('../model/join');

module.exports = {
  innerJoin: async function (req, res) {
    JoinModal.innerJoinTbl().then(async (results) => {
      res.json({message: 'inner Join done', data:results})
    });
  },

  leftJoin: async function (req, res) {
    JoinModal.leftJoinTbl().then(async (results) => {
      res.json({status: true, message: 'left done', data: results})
    })
  },

  rightJoin: function (req, res) {
    JoinModal.rightJoinTbl().then(async (results) => {
      res.json({status: true, message: 'Right Left Done', data: results})
    })
  },
  crossJoin: function (req, res) {
    JoinModal.crossJoinTble().then(async (results) => {
      res.json({status: true, message: "Cross Join Done", data: results})
    })
  }
}
