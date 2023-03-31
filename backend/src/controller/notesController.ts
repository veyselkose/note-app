import { Request, Response } from "express";
import { Note } from "../model/noteModel";
import { User } from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const base64Img = require('base64-img');
import fs from "fs";


interface JwtPayload {
    username: string
}

const meInfo = async (req: Request, res: Response) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const { username } = await jwt.verify(token, "secret") as JwtPayload;
        const user = await User.findOne({ username: username })
        if (user) { res.status(200).send({ username: user.username, theme: user.theme, tags: user.tags, layout: user.layout, email: user.email, token }) }
    }
    else {
        res.status(400).json({ error: "token verification failed" });
    }
}

const singUp = async (req: Request, res: Response) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        layout: true,
        theme: false,
        tags: [],
    });
    res.send(newUser);
}

const userUpdate = async (req: Request, res: Response) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        user.username = req.body.username;
        user.theme = req.body.theme;
        user.tags = req.body.tags;
        user.layout = req.body.layout;
        user.email = req.body.email;
        user.save()
        res.send(user)
    }
}

const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const result = await bcrypt.compare(req.body.password, user.password)
        if (result) {
            const token = await jwt.sign({ username: user.username }, "secret")
            res.send({ username: user.username, theme: user.theme, tags: user.tags, layout: user.layout, email: user.email, token })
        }
        else {
            res.status(400).json({ error: "password doesn't match" });
        }
    }
    else {
        res.status(400).json({ error: "User doesn't exist" });
    }
}

const getAllNotes = async (req: Request, res: Response) => {
    const { username } = req.user;
    const allNotes = await Note.find({ username });
    res.status(200).json(allNotes);
}

const deleteNote = async (req: Request, res: Response) => {
    const note = await Note.findOne({ id: req.body.id });
    if (note) {
        if (note.image) {
            const pathArr = note.image.split("/")
            const fileName = pathArr[pathArr.length - 1]
            fs.unlinkSync("./src/images/" + fileName);
        }
    }
    await Note.findOneAndDelete({ id: req.body.id })
    res.status(200).json({ status: "success", id: req.body.id });
}

const createNote = async (req: Request, res: Response) => {
    const { username } = req.user;
    const noteId = Date.now()
    if (req.body.image) {
        base64Img.img(req.body.image, './src/images', username + noteId, async function (err: any, filepath: any) {
            const pathArr = filepath.split('\\')
            const fileName = pathArr[pathArr.length - 1];
            const url = "http://localhost:5000/" + fileName
            const newNote = await Note.create({
                username: username,
                bgColor: req.body.bgColor,
                tag: req.body.tag,
                pin: req.body.pin,
                title: req.body.title,
                archive: req.body.archive,
                id: noteId,
                content: req.body.content,
                image: url
            });
            res.send(newNote);
        });
    }
    else {
        const newNote = await Note.create({
            username: username,
            bgColor: req.body.bgColor,
            tag: req.body.tag,
            pin: req.body.pin,
            title: req.body.title,
            archive: req.body.archive,
            id: noteId,
            content: req.body.content,
            image: req.body.image
        });
        res.send(newNote);
    }
}

const editNote = async (req: Request, res: Response) => {
    const note = await Note.findOne({ id: req.body.id });
    if (note) {
        if (req.body.image && req.body.image.includes("data:image")) {
            if (note.image) {
                const pathArr = note.image.split("/")
                const fileName = pathArr[pathArr.length - 1]
                fs.unlinkSync("./src/images/" + fileName);
            }
            base64Img.img(req.body.image, './src/images', note.username + req.body.id + Date.now(), function (err: any, filepath: any) {
                const pathArr = filepath.split('\\')
                const fileName = pathArr[pathArr.length - 1];
                const url = "http://localhost:5000/" + fileName
                note.image = url;
                note.content = req.body.content;
                note.tag = req.body.tag;
                note.bgColor = req.body.bgColor;
                note.id = req.body.id;
                note.title = req.body.title;
                note.pin = req.body.pin;
                note.archive = req.body.archive;
                note.save()
                res.send(note)
            })
        }
        else {
            note.content = req.body.content;
            note.tag = req.body.tag;
            note.bgColor = req.body.bgColor;
            note.id = req.body.id;
            note.title = req.body.title;
            note.pin = req.body.pin;
            note.archive = req.body.archive;
            note.image = req.body.image;
            note.save()
            res.send(note)
        }
    }
}

export {
    getAllNotes,
    createNote,
    editNote,
    deleteNote,
    singUp,
    login,
    userUpdate,
    meInfo
}