import express from "express";
import bodyParser from "body-parser";
import {getRows,addTasks, deleteTasks,updateTasks} from "./db/commands.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = await getRows();

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });

});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const isAdded = await addTasks(item);

  if(!isAdded) {
    console.log("Deu ruim");
    return;
  }

  items = await getRows();
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const item = req.body.updatedItemTitle;

  const isUpdate = await updateTasks(item,id);
  if(!isUpdate) {return;}

  items = await getRows();
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const item = req.body.deleteItemId;
  const isDelete = await deleteTasks(item);
  
  if(!isDelete) {return;}

  items = await getRows();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});