module.exports= {
  main: function (req, res) {
    var me = [{name: "shyam", id: "001", dept: "computer"},
      {name: "ram", id: "002", dept: "admin"},
      {name: "raj", id: "003", dept: "security"}
    ]
    res.render("../views/main",
      {me:me})
  }
    }
