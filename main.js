var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function TemplateHtml(title, list, body, control) {
  return `
        <!doctype html>
        <html>
        <head>
            <title>WEB - ${title}  </title>
            <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        <p>${body}</p>
        </body>
        </html>
        `;
}

function FileList(filelist) {
  var i = 0;
  var list = `<ul>`;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ul>";

  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (err, filelist) {
        console.log(filelist);
        var title = "welcome";
        var description = "Hello, Node.js";
        var list = FileList(filelist);
        var template = TemplateHtml(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        fs.readdir(`./data`, function (err, filelist) {
          var title = queryData.id;
          var list = FileList(filelist);
          var template = TemplateHtml(
            title,
            list,
            `
             <h2>${title}</h2>${description}
            `,
            `<a href="/create">create</a> <a href="/update">update</a>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = queryData.id;
      var list = FileList(filelist);
      var template = TemplateHtml(
        title,
        list,
        `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p><input type="submit"></p>
        </form>
        `
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";

    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
