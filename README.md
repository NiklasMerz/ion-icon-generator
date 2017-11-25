# Refactor of icon-font-generator

> At now this is a quick and dirty fork of the excellent CLI tool: [icon-font-generator](https://github.com/Workshape/icon-font-generator)

## How to use

```
npm i -g ion-icon-generator
ion-icon-generator inputFolder/*.svg -o outputFolder
```

Copy `icons.scss` to `src/theme` and all fonts from the output folder to `src/assets/fonts`. Make sure your import `icons.sccs` in `app.scss`.

[More info](https://yannbraga.com/2017/06/28/how-to-use-custom-icons-on-ionic-3/) 

## TODO

* Use templates for icons.scss generation
* CLI flags
* Ionic project structure copy
* HELP
* README