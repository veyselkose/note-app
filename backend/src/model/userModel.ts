import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    theme: { type: Boolean },
    layout: { type: Boolean },
    tags: { type: Array },
});

export const User = model("User", UserSchema);