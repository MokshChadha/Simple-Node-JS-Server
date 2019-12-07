const http = require("http");
const fs = require("fs");
const path = require("path");

const hostName = "localhost";
const port = "5310";

const server = http.createServer((req, res) => {
  //console.log(req.headers);
  console.log("request for " + req.url + "by method used" + req.method);
  res.statusCode = 200;
  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") {
      fileURL = "/index.html";
    } else {
      filerURL = req.url;
    }
    var filePath = path.resolve("./public" + fileURL);

    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, exists => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end("<html> <body><h1>not found sorry</h1></body></html>");
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        //crux
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<html> <body><h1>it si not a html file</h1></body></html>");
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content Type", "text/html");
    res.end(
      "<html> <body><h1>It is not a GET method hence not supported </h1></body></html>"
    );
  }
});

server.listen(port, hostName, () => {
  console.log("server runnig at " + hostName + " " + port);
});
