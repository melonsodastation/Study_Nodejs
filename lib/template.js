module.exports = {
  Html: function (title, list, body, control) {
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
  },
  list: function (filelist) {
    var list = `<ul>`;
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
};
