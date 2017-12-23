# ion-icon-generator

[![Join the chat at https://gitter.im/ion-icon-generator/Lobby](https://badges.gitter.im/ion-icon-generator/Lobby.svg)](https://gitter.im/ion-icon-generator/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> This is a quick and dirty fork of the excellent CLI tool: [icon-font-generator](https://github.com/Workshape/icon-font-generator). Stay tuned

## About
This tool is a fork of [icon-font-generator](https://github.com/Workshape/icon-font-generator) with customizations for generating Ionic icons. It runs with NodeJS, generates fonts with [
webfonts-generator](https://www.npmjs.com/package/webfonts-generator) and integrates easily with your Ionic project build (WIP).

## How to use from the command line

```
npm i -g ion-icon-generator
ion-icon-generator inputFolder/*.svg -o outputFolder
```
See `ion-icon-generator  -h` for help

Copy `icons.scss` to `src/theme` and all fonts from the output folder to `src/assets/fonts`. Make sure your import `icons.sccs` in `app.scss`.

[More info](https://yannbraga.com/2017/06/28/how-to-use-custom-icons-on-ionic-3/)