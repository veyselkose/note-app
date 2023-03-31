require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { login, singUp, createNote, deleteNote, editNote, getAllNotes, userUpdate, meInfo } from "./controller/notesController"
import { Note } from "./model/noteModel"
import { items } from "./initialList";
import bodyParser from "body-parser";
import isLoggedIn from "./middleware";
import path from "path";

const port = process.env.PORT || 5000
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/images')))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

mongoose
  // .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.rscmz7j.mongodb.net/?retryWrites=true&w=majority`)
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });


// items.map(x =>
//   Note.create({
//     username:"veysel" ,
//     bgColor: x.bgColor,
//     tag: ["all"],
//     id: x.id,
//     title:x.content.slice(0,5),
//     content: x.content,
//     archive: false,
//     pin: false,
//     image:""
//   })
// )

// ! Users İşlemleri
app.post("/singUp", singUp);
app.post("/meInfo", isLoggedIn, meInfo);
app.post("/userUpdate", isLoggedIn, userUpdate);
app.post("/login", login);

// ! Notları Listeleme
app.get("/getAllNotes", isLoggedIn, getAllNotes);

// ! Not Oluşturma
app.post("/createNote", isLoggedIn, createNote);

// ! Not Düzenleme
app.post("/editNote", isLoggedIn, editNote)

// ! Not Silme
app.post("/deleteNote", isLoggedIn, deleteNote)


app.listen(port, () => console.log("Server listening on http://localhost:" + port));


