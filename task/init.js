var fs = require('fs');
var lodash = require('lodash');
var path = require('path');

var package = require(path.join(process.cwd(), 'package.json'));
var initDir = path.join(__dirname, '..', 'init');
var files = [
  'src/index.js',
  'src/version.js',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc',
  '.gitignore',
  '.gulprc',
  '.travis.yml',
  'README.md',
  'bower.json',
  'gulpfile.js'
];

module.exports = function () {
  files.forEach(function (file, idx) {
    var src = path.join(initDir, file)
    var dst = path.join(process.cwd(), file);
    fs.readFile(src, function (err, content) {
      fs.exists(dst, function (exists) {
        if (!exists) {
          fs.writeFile(dst, replace(content, package));
        }
      });
    });
  });
};