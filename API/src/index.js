import { openDB } from "./configDB.js";
import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
}
);

openDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    }
)