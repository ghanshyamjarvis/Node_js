module.exports= {
  main: function (req, res) {
    var person = [{name: "shyam", id: "001", dept: "computer"},
      {name: "ram", id: "002", dept: "admin"},
      {name: "raj", id: "003", dept: "security"}
    ]
    res.render("../views/main.ejs", {person: person})

  }
}