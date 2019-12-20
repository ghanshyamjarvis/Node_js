
module.exports = {

  main: function (req, res)
  {
    var student = [
      { name: 'ram', surname: "chauhan",city:"Ahmedabad" },
      { name: 'raj', surname: "shah",city:"Rajkot" },
      { name: 'ramesh', surname: "asha",city:"Jamnager" },
    ];
    res.render('../views/main.ejs', {
      student:student
    });
  }
}
