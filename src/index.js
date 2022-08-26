require("dotenv").config();
const express = require('express');
const app = express();
const multer = require('multer');
const {s3Uploadv3} = require('./services/s3Service');
const {upload} = require('./middleware/uploaderMiddleware');
const personRouter = require('./routes/person.routes');
const authRouter = require('./routes/auth.routes');
const albumRouter = require('./routes/album.routes');
const photoRouter = require('./routes/photo.routes');
const cors = require('cors');

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);

app.get("/", (req, res) => {
    res.send('Hello world!')
});

app.post("/upload", upload.array("file"), async (req, res) => {
    try {
        const results = await s3Uploadv3(req.files);
        console.log(results);                               //todo delete todo
        return res.json({status: "success"});
    } catch (err) {
        console.log(err);
    }
});

app.use(express.json());
app.use('/api', personRouter, authRouter, albumRouter, photoRouter);

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large",
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "File limit reached",
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image",
            });
        }
    }
});

app.listen(4000, () => console.log("listening on port 4000"));
