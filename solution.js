import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "dev",
  password: "luke",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/BQ",(req,res) => {
  res.render("BQ.ejs");
});
app.get("/BQr",(req,res) => {
  res.render("BQr.ejs");
});
app.get("/BQh",(req,res) => {
  res.render("BQh.ejs");
});
app.get("/BQyr",(req,res) => {
  res.render("BQyr.ejs");
});
app.get("/hacka",(req,res) => {
  res.render("hacka.ejs");
});
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.render("hacka.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/bqr", async (req,res) => {

  var bname = req.body.brname;
  var bauthor = req.body.brauthor;
  var bedi = req.body.bredition;

  try{
   var res= await db.query(
    "insert into raise (bname,bauthor,edition) values ($1,$2,$3)",
    [bname,bauthor,bedi]
   );alert("Request raised successfully");
   console.log(res);
   
   res.render("BQ");
  }
  catch(err){
  console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.Username;
  const password = req.body.Password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("hacka.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
