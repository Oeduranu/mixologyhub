import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//app.get("/", (req, res) => {
//  res.render("index.ejs")
// });


app.get("/", async (req, res) => {
  try {
    const cocktails = [];
    
    // Fetch three different random cocktails
    for (let i = 0; i < 3; i++) {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const cocktail = response.data.drinks[0]; // Extract the first drink from the response
      cocktails.push(cocktail);
    }

        // Wrap the random cocktails in an array called drinks so it has the same structure as it would have in a search call from the API
        //I didn't do this as first and my locals.data.drinks wouldn't exist bc the cocktails were coming as individual items and not inside the drinks matrix
        const result = { drinks: cocktails };
    
    res.render("index.ejs", { data: result, route: req.route.path });
    // Here I used the route: req... so that my EJS knows that when you access the / route it should run the h1 random cocktails and not when you are in the /search route
    // I could have used route: / here since I'll only use this in the / route but its good practice in case I need it for other paths in the future
  } catch (error) {
    console.error("Failed to make request:", error);
    res.render("index.ejs", { error: error.message });
  }
});







// This is for the search engine //


// Redirect /search GET requests to the root route, this is in case someone directly access the /search route ex. localhost:3000/search in the browser
app.get("/search", (req, res) => {
  res.redirect("/");
});
///////////////////////////////////////////////////////


// Middleware to handle form submission and redirect with search query parameter, search query is the text the user input
app.post("/search", (req, res) => {
  const searchQuery = req.body.search;
  // We encode it so if we have special characters we won't have problems, this is IMPORTANT
  const encodedSearchQuery = encodeURIComponent(searchQuery);
  // Redirect to the route with the search query as a parameter
  res.redirect(`/search/${encodedSearchQuery}`);
});

// Route handler for search with query parameter
app.get("/search/:searchQuery", async (req, res) => {
  // Extract search query from URL parameter so we can use for the actual call to the API
  const input = req.params.searchQuery;

  try {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + input);
      const result = response.data; 
      res.render("index.ejs", {data: result});
  } catch (error) {
      console.error("Failed to make request:", error);
      res.render("index.ejs", { error: error.message });
  }
});



// This is to lookup a random recipe 

// app.get("/random", async (req, res) => {
  // try {
    // const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    // const result = response.data; 
     // console.log(result);

      // res.render("index.ejs", {data: result})
    // } catch (error) {
      // console.error("Failed to make request:", error);
      // res.render("index.ejs", {
        // error: error.message,
      //});
    // }
    // });



  // This is to look by the name of an ingredient 

  // app.post("/search-ingredient", async (req, res) => {

    // const ingredient = req.body.ingredient;
    // console.log(ingredient);

    // try {
      // const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient);
      // const result = response.data; 
    // console.log(result);
  
        // res.render("index.ejs", {data: result})
      // } catch (error) {
        // console.error("Failed to make request:", error);
        // res.render("index.ejs", {
          // error: error.message,
        // });
      // }
      // });


app.listen(port, () => {
        console.log(`Server running on port: ${port}`);});