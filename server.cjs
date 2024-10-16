/* eslint-env es6 */
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("dist"));
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
