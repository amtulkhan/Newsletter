const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.listen(3000, function () {
  console.log("we at 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", function (req, res) {
  var last = req.body.lname;
  var first = req.body.fname;
  var email = req.body.email;
  // console.log(first,last,email);

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME:first,
            LNAME:last
        }
      }
    ]
  };
  var jasondata = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/4552199ae8",
    method: "POST",
    headers: {
      "Authorization": "amtul f07afa14b68f18d7628d72d2b4f05ee3-us17",
    },
    body: jasondata
  };
  request(options, function (error, response, body) {
    if (error) {
      res.send(error);
    } else {
      if(response.statusCode===200)
      {
        res.sendFile(__dirname + "/success.html")
      }
      else
      {
        res.sendFile(__dirname + "/failure.html");
      }
     
    }
  });
});

//api key
// f07afa14b68f18d7628d72d2b4f05ee3-us17

//list id
//4552199ae8
