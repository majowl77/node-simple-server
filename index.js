const http = require("http");
const PORT = '8080'

http
  .createServer((req, res) => {
    /* handle http requests */
    /* here is the code  */
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);