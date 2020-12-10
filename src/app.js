import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get("/",(req,res) => {
    res.send("Welcome to netflix skinny double");
})

app.listen(port, () => {
    console.log(`Server Running on: ${port}`);
});