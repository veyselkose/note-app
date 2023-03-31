import { model, Schema } from "mongoose";

const NoteSchema = new Schema({
    username:String,
    bgColor: String,
    tag: Array,
    id: Number,
    title: String,
    content: String,
    pin: Boolean,
    archive: Boolean,
    time: Number,
    image: String
});

export const Note = model("Note", NoteSchema);