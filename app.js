//jshint esversion:6
require("dotenv").config;
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/cbee918f46",
    method: "POST",
    headers: {
      Authorization: "VanshK de6e096a047ec325986c5594134576af-us17",
    },
    body: jsonData,
  };

  request(options, function (error, response, body) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
      console.log(response);
    } else {
      res.sendFile(__dirname + "/failure.html");
      console.log(error);
    }
  });
});

// app listening at port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("server started at port 3000");
});
// de6e096a047ec325986c5594134576af-us17
