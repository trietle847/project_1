const express =  require("express");
const cors = require("cors")

const dictionaryRouter = require("./app/routes/dictionary.route")
const chatgpt = require("./app/routes/chatgpt.route")
const ApiError = require("./app/app-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dictionary", dictionaryRouter);
app.use("/chatgpt",chatgpt)

app.use((req,res,next) => {
    return next(new ApiError(404,"Resource not found"));
})

app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    })
})

app.get("/", (req, res) => {
    res.json({message: "hello"})
});

module.exports = app;