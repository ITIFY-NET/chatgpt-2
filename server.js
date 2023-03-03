require("@babel/register");
const app = require("./app");

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API App is listening on port ${port}`);
});
