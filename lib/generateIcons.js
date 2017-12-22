require('colors')
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const copy = promisify(fs.copyFile);
const path = require('path')
const readline = require('readline');
const createInterface = readline.createInterface;

var generateIcons = async (map, options) => {
  console.log('Generating Ionicons'.yellow)
  const { outputDir } = options

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
  await writeFile(path.join(outputDir, '/icons.scss'), style + '\n');

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
  await appendFile(path.join(outputDir, '/icons.scss'), mixin + '\n');

  //Get fonts
  let lineReader = createInterface({
    input: require('fs').createReadStream(path.join(outputDir, '/icons.css')),
  });
  var lineCounter = 0;
  var wantedLines = [];
  lineReader.on('line', (line) => {
    lineCounter++;
    wantedLines.push(line);
    if (lineCounter == 8) { lineReader.close(); }
  });
  lineReader.on('close', async () => {
    await appendFile(path.join(outputDir, '/icons.scss'), wantedLines.join("\n").replace(new RegExp('./', 'g'), '../assets/fonts/') + '\n');

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
    for (let include of includes) {
      await appendFile(path.join(outputDir, '/icons.scss'), include + '\n');
    }

    //Finally copy to project folders. 
    //TODO check options if enabled + path
    copy(path.join(outputDir, '/icons.scss'), 'src/theme/icons.scss');
    copy(path.join(outputDir, '/icons.eot'), 'src/assets/fonts/icons.eot');
    copy(path.join(outputDir, '/icons.svg'), 'src/assets/fonts/icons.svg');
    copy(path.join(outputDir, '/icons.ttf'), 'src/assets/fonts/icons.ttf');
    copy(path.join(outputDir, '/icons.woff'), 'src/assets/fonts/icons.woff');
    copy(path.join(outputDir, '/icons.woff2'), 'src/assets/fonts/icons.woff2');
  });
}

module.exports = generateIcons;