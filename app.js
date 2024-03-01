const express = require("express");
const mongoose = require("mongoose");

const app = express(); //server

//connect to server with mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/comp") // database
  .then(() => {
    //success then() will execcute
    console.log("connected to mongodb");
  })
  .catch((err) => {
    //if error catch() funct on will execute
    console.log(err);
  });

const empSchema = new mongoose.Schema({
  //structure
  //structure
  name: String,
  id: String,
  salary: Number,
});

const empModel = mongoose.model("emp", empSchema); //collection

app.use(express.json()); // Middleware para permitir
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("about us page");
});

//add new employyee
app.post("/addEmp", async (req, res) => {
  const empData = req.body;
  console.log(empData);
  const data = new empModel(empData);
  const result = await data.save();
  console.log(result);
  res.send("new employee added....");
});

//update employee data
app.put("/updateEmp/:id", async (req, res) => {
  const id = req.params.id;
  let { name, salary } = req.body;
  salary = Number(salary);
  const updateData = await empModel.updateOne(
    { id: id },
    { $set: { name: name, salary: salary } }
  );
  console.log(updateData);

  res.send("employee data updated...1");
});

//delete employee data
app.delete("/delEmp/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Employee  deleted with ID : " + id);
  const data = await empModel.deleteOne({ id: id });
  console.log(data);
  res.send("employee deleted..");
});

//display all employees data
app.get("/showEmps", async (req, res) => {
  console.log("Display Data");
  const showData = await empModel.find();
  res.send(showData);
  console.log(showData);
});

//to display specific data
app.get("/findEmp/:id", async (req, res) => {
  const id = req.params.id;
  const data = await empModel.findOne({ id: id });
  res.send(data);
  console.log("employee found");
});

app.listen(3000, () => {
  console.log("listening.....");
});
