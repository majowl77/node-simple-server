const http = require("http");
const fs = require("fs");
const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello, World!</h1>");
    res.end();
  } else if (req.method === "POST" && req.url === "/") {
    let postData = "";
    req.setEncoding("utf8");
    req.on("data", (data) => {
      postData += data;
    });
    req.on("end", () => {
      console.log("Received data:", postData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end("Data received and logged.");
    });
  } else if (req.method === "GET" && req.url === "/products") {
    fs.readFile("./products.json", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === "POST" && req.url === "/products") {
    //Handling POST requests to "/products"

    //just to check
    const sampleProduct = {
      name: "Sample Product",
      price: 25.99,
      category: "Electronics",
    };
    // const samplePostBody = JSON.stringify(sampleProduct);

    //the request body that contains data ex:web form where a user submits their name and email addres
    //all stored in the postBody
    let postBody = "";
    req.on("data", (data) => {
      postBody += data;
    });

    // handling the reading and saveing the received data to a file on the server
    req.on("end", () => {
      if (!postBody) {
        // Handle the case when there's no data in the request body
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Empty request body");
        return;
      }
      try {
        const postBodyProducts = JSON.parse(postBody);
        console.log("Request Body Data in a json format", postBodyProducts);

        fs.readFile("product.json", (err, existingData) => {
          if (err) {
            console.error("Error reading product data:", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            const products = JSON.parse(existingData);
            products.push(postBodyProducts);
            fs.writeFile("product.json", JSON.stringify(products), (error) => {
              if (error) {
                console.error("Error saving product data:", error);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
              } else {
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end(
                  "Product data received and saved in the products.js file"
                );
              }
            });
          }
        });
      } catch {
        // Handle JSON parsing error
        console.error("Error parsing request body as JSON:", parseError);
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Invalid JSON data");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, (error) => {
  if (error) {
    console.log(`Failed to listen server on port : ${PORT} `);
  } else {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  }
});
