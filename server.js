var express = require('express');
var app = express();
var fs = require("fs");
var port = 8080;

//Listing users
app.get('/', function (req, res) {
    fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })


// add user to the json file
app.get("/addUser", (req, res) => {
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(8080).send("Error reading data.json file.");
      }

const users = JSON.parse(data);
const newUser = 
{
    "id": 4,
    "name": "Luke",
    "surname":"Everton",
    "career": "Son"
 };
 
 
 users["user4"] = newUser;

const updatedData = JSON.stringify(users, null, 2);

    fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
      if (err) {
        console.error("Error writing to db.json file: ", err);
        return res.status(500).send("Error writing data to file.");
      }

      console.log("User added successfully!");
      res.send("User added successfully!");
    });
  });
});

// app.get('/:id', function (req, res) {
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
//        var users = JSON.parse( data );
//        var user = users["user" + req.params.id] 
//        console.log( user );
//        res.end( JSON.stringify(user));
//     });
//  })

 //Update user
// app.get("/updateUser/:id", (req, res) => {
//     const userId = req.params.id;
//     fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
//       if (err) {
//         console.error("Error reading the file: ", err);
//         return res.status(500).send("Error reading data.json file.");
//       }
  
//       const users = JSON.parse(data);
//       if (!users.hasOwnProperty(`user${userId}`)) {
//         return res.status(404).send(`User with ID ${userId} not found.`);
//       }
  
//       const updatedUser = {
//         id: 3,
//         name: "Sean",
//         surname: "Lesar",
//         career: "Father"
//       };
  
//       users[`user${userId}`] = updatedUser;
  
//       const updatedData = JSON.stringify(users, null, 2);
  
//       fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
//         if (err) {
//           console.error("Error writing to data.json file: ", err);
//           return res.status(500).send("Error writing data to file.");
//         }
  
//         console.log(`User with ID ${userId} updated successfully!`);
//         res.send(`User with ID ${userId} updated successfully!`);
//       });
//     });
//   });

// Update user
app.get("/updateUser/:id", (req, res) => {
  const userId = req.params.id;
  fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the file: ", err);
      return res.status(500).send("Error reading db.json file.");
    }

    const users = JSON.parse(data);
    if (!users.hasOwnProperty(`user${userId}`)) {
      return res.status(404).send(`User with ID ${userId} not found.`);
    }

    // Get the existing user data
    const existingUser = users[`user${userId}`];

    // Update the fields you want to change
    existingUser.name = "Ethan";
    existingUser.surname = "Green";
    existingUser.career = "Best";

    const updatedData = JSON.stringify(users, null, 2);

    fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
      if (err) {
        console.error("Error writing to db.json file: ", err);
        return res.status(500).send("Error writing data to file.");
      }

      console.log(`User with ID ${userId} updated successfully!`);
      res.send(`User with ID ${userId} updated successfully!`);
    });
  });
});


  //DELETE USER
  app.get("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading data.json file.");
      }
  
      const users = JSON.parse(data);
      if (!users.hasOwnProperty(`user${userId}`)) {
        return res.status(404).send(`User with ID ${userId} not found.`);
      }
  
      delete users[`user${userId}`];
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to data.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log(`User with ID ${userId} deleted successfully!`);
        res.send(`User with ID ${userId} deleted successfully!`);
      });
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

