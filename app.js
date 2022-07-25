const http = require('http');
const fs = require('fs');
const index = "./index.html";
const about = "./about.html";
const contactMe = "./contact-me.html";
const errorPage = "./404.html";

http.createServer( (req, res) => {
   if (req.url === '/') {
      fs.readFile(index, "utf-8", (err, data) => {
         if (err) handleReadFileErr(index, err, res);
         handleReadFileSuccess(res, data);
      });
   } else if (req.url === '/about' || req.url === '/about/') {
      fs.readFile(about, "utf-8", (err, data) => {
         if (err) handleReadFileErr(about, err, res);
         handleReadFileSuccess(res, data);
      });
   } else if (req.url === '/contact-me' || req.url === '/contact-me/') {
      fs.readFile(contactMe, "utf-8", (err, data) => {
         if (err) handleReadFileErr(contactMe, err, res);
         handleReadFileSuccess(res, data);
      });
   } else {
      fs.readFile(errorPage, "utf-8", (err, data) => {
         if (err) handleReadFileErr(errorPage, err, res);
         handleReadFileSuccess(res, data);
      });
   }
}).listen(8080, () => console.log("Server is running at port 8080."));

function handleReadFileErr(filename, err, res) {
   console.error(`Cannot read ${filename} due to ${err}`);
   res.writeHead(404, {"Content-Type": 'text/plain'});
   res.end('Error loading html page, sorry :(');
}

function handleReadFileSuccess(res, data) {
   res.writeHead(404, {"Content-Type": 'text/html'});
   res.end(data);
}