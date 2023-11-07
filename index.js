const http = require("http");
const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.write("Hello, World!");
    res.end();
  } else if (req.method === "POST" && req.url === "/") {
    let postData = "";
    req.setEncoding("utf8");
    req.on("data", (data) => {
      postData += data;
    });
    req.on("end", () => {
      console.log("Received data:", postData);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Data received and logged.");

    });
  }
  else if (){
    
  }
});

server.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to listen server on port : 3000 ");
  } else {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
  }
});
