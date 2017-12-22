const fs = require("fs");
const path = require('path')
const readline = require('readline');

var generateIcons = function (map, options) {
  console.log('Generating Ionicons') //TODO use options
  const { outputDir } = options

  //Now generate scss includes
  let includes = []
  for (let icon in map) {
    if (map.hasOwnProperty(icon)) {
      if (options.classPrefix) {
        includes.push(`@include makeIcon(${options.classPrefix + "-" + icon}, '${map[icon]}');`)
      } else {
        includes.push(`@include makeIcon(${icon}, '${map[icon]}');`)
      }
    }
  }

  //Add css classes for icons
  const style = `
[class^="icon-"], [class*=" icon-"] {
font-family: 'icons';
speak: none;
font-style: normal;
font-weight: normal;
font-variant: normal;
text-transform: none;

/* Better Font Rendering =========== */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}`

  return fs.writeFile(path.join(outputDir, '/icons.scss'), style + '\n', function (err) {
    if (err) throw err;
  }, function (res) {
    //Add scss mixin
    const mixin = `
     @mixin makeIcon($arg, $val) {
     .#{$arg}:before ,
     .ion-ios-#{$arg}:before ,
     .ion-ios-#{$arg}-outline:before ,
     .ion-md-#{$arg}:before ,
     .ion-md-#{$arg}-outline:before  {
     content: $val;
     font-size: 26px;
     }
     }
     `
    return fs.appendFile(path.join(outputDir, '/icons.scss'), mixin + '\n', function (err) {
      if (err) throw err;
    }, function (res) {
      //Get fonts
      let lineReader = readline.createInterface({
        input: require('fs').createReadStream(path.join(outputDir, '/icons.css')),
      });
      var lineCounter = 0;
      var wantedLines = [];
      lineReader.on('line', function (line) {
        lineCounter++;
        wantedLines.push(line);
        if (lineCounter == 8) { lineReader.close(); }
      });
      lineReader.on('close', function () {
        fs.appendFile(path.join(outputDir, '/icons.scss'), wantedLines.join("\n").replace(new RegExp('./', 'g'), '../assets/fonts/') + '\n', function (err) {
          if (err) throw err;
          //Add includes to file
          for (let include of includes) {
            fs.appendFile(path.join(outputDir, '/icons.scss'), include + '\n');
          }
        });
      });
    })
  })
}

module.exports = generateIcons;