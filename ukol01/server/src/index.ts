import * as express from "express";
import apiRouter from "./api/index";
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
