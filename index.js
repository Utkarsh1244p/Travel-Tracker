import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Creating and connect Client and Database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "855488",
  port: 5432
})
db.connect()

// Declaration of app and port variable
const app = express();
const port = 4000;

//Use of Middleware to get user input data 
app.use(bodyParser.urlencoded({ extended: true }));

//express.static to render static css styling in ejs(dynamically)
app.use(express.static("public"));


async function checkVisited(){
  const result = await db.query("SELECT country_code FROM visited_countries")
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

//Get Home Page
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    res.status(500).send("Error fetching visited countries");
  }
});

//Insert New Country
app.post("/add", async (req, res) => {
  const original_country = req.body.country;

  try{
    const result = await db.query(
        "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", 
        [original_country.toLowerCase()]
      );
    
      if(result.rows.length !== 0){
        const data = result.rows[0];
        const code = data.country_code;
        try{
            await db.query(
                "INSERT INTO visited_countries (country_code) VALUES ($1)", 
                [code]
            );
            res.redirect("/")
        }catch(err) {
            console.log(err);
            const countries = await checkVisited();
            res.render("index.ejs", {
                countries: countries,
                total: countries.length,
                error: "Country has already been added, try again.",
            });
         } 
      }
  }catch(err){
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country name does not exist, try again.",
    });
  }


});

//Port Running At
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
