// const express = require("express");
// const birds = require("./birds");

// const app = express();
// const port = 3000;

// app.use(express.static("public"));

// app.use("/birds", birds);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/", (req, res) => {
//   res.send("Got a POST request");
// });

// app.put("/user", (req, res) => {
//   res.send("Got a PUT request at /user");

//   // res.send(`Hello World!, this is the job Id ${req.params.jobId}`);
//   // res.json({
//   //   message: "Hello World!",
//   //   jobId: req.params.jobId
//   // });
// });

// app.delete("/user", (req, res) => {
//   res.send("Got a DELETE request at /user");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// /*



// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css

// OR 

// app.use('/static', express.static('public')) 
// - 
// app.use('/static', express.static(path.join(__dirname, 'public')))

// http://localhost:3000/static/images/kitten.jpg
// http://localhost:3000/static/css/style.css

// */
