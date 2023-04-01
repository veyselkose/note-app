
# Note App

note application using expressjs and mongodb in backend and Reactjs in frontend
## Tech Stack

**Client:** React, Redux, SCSS

**Server:** Node, TS, Express, MongoDB


## Features

- Light/dark mode toggle
- User auth
- Note pinning
- Note archiving
- Add colour to notes
- Adding tags to notes
- Add pictures to notes
- Note search
- Two layout plans


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### Backend
`PORT` 

If you are connecting with Mongodb Atlas, add the following environment variables

`MONGODB_PASSWORD`

`MONGODB_USERNAME`

and edit index.ts
```javascript
mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.rscmz7j.mongodb.net/?retryWrites=true&w=majority`) // edit here
  .then(() => {
    console.log("DB CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });
```

### Frontend

`REACT_APP_API_URL`



## Run Locally

Clone the project

```bash
  git clone https://github.com/veyselkose/note-app.git
```

Go to the project directory

```bash
  cd note-app
```

### backend

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### frontend

Go to the frontend directory

```bash
  cd fronted
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Screenshots

![App Screenshot](signup.png)
![App Screenshot](login.png)
![App Screenshot](main.png)
![App Screenshot](main2.png)

