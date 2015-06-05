# Mouse Craft Framework

Er is ook een Yeoman generator versie van dit framework.

##### Je moet dit geinstalleerd hebben
* yo
* gulp 4 global*
* node

Om Yo(Yeoman command line tool)
```sh
npm install -g yo bower

```

gulp 4
```sh
npm uninstall gulp -g
npm install "gulpjs/gulp-cli#4.0" -g

```


#### Om te beginnen
```sh
npm install
npm start

```

<!--
#### update naar gulp 4

GLOBAL

```sh
npm uninstall -g gulp
npm install -g "gulpjs/gulp-cli#4.0"


```
-->

<!--
```sh
npm uninstall gulp --save-dev
npm install "gulpjs/gulp#4.0" --save-dev #staat al in de package.json
``` -->

#### Gulpfile update
```
gulp update
```

##### NOTE
De gulp phpserver werkt NIET op windows.
Gebruik de python oneliner hier voor.
`python -m SimpleHTTPServer`
