'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var base = 'assets';

var myflow = yeoman.generators.Base.extend({

    greeting: function() {
        this.log(yosay(
            'Welcome to CreativeKoen\'s workflow generator!'
        ));
    },

    promtUser: function() {

        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'what is the name of your client name ?'
            ,default: 'best-project-ever'
        }
        ,{
            name: 'localName',
            message: 'what is your localhost vhosts name ?'
            ,default: 'local.best-project-ever'
        }];

        this.prompt(prompts, function(answers){

            this.includeAppName = answers.appName;
            this.includeLocalName = answers.localName;

            done();
        }.bind(this));
    },//end promtUser


    copyFiles: function(){

        var approot = base+this.includeAppName+'/';

        this.template('.gitignore',    approot+'.gitignore');
        this.template('editorconfig',  approot+'editorconfig');
        this.template('README.md',     approot+'README.md');
        this.template('bower.json',     approot+'bower.json');

        // passing app name to package.json
        var appname = { clientname: this.includeAppName};
        this.template('package.json', approot+'package.json', appname);

        // passing localhost name to gulpfile.js
        var localname = { localhost: this.includeLocalName};
        this.template('gulpfile.js', approot+'gulpfile.js', localname);

        var installDep = { newroot: approot};
        this.template('_yo-rc.json', approot+'.yo-rc.json', installDep);
    },//end copy files

    move_ASSETS_Files: function(){
        var approot = base+this.includeAppName+'/';
        //index php
        var clientname2 = { clientname: this.includeAppName};
        this.template('source/index.php',approot+'source/index.php', clientname2);
        // main js file
        this.template('source/js/main.js',approot+'source/js/main.js');
        // main scss file
        this.template('source/scss/main.scss',approot+'source/scss/main.scss');

        // smacks
        this.template('source/scss/vars/_base.scss',approot+'source/scss/vars/_base.scss');
        this.template('source/scss/vars/_fonts.scss',approot+'source/scss/vars/_fonts.scss');
        this.template('source/scss/vars/_state.scss',approot+'source/scss/vars/_state.scss');
        this.template('source/scss/vars/_theme.scss',approot+'source/scss/vars/_theme.scss');
        this.template('source/scss/vars/_layout.scss',approot+'source/scss/vars/_layout.scss');
        this.template('source/scss/vars/_navbar.scss',approot+'source/scss/vars/_navbar.scss');
        this.template('source/scss/vars/_vars.scss',approot+'source/scss/vars/_vars.scss');

        // griddle
        this.template('source/scss/vars/_griddle-build.scss',approot+'source/scss/vars/_griddle-build.scss');
        this.template('source/scss/vars/_griddle-lg.scss',approot+'source/scss/vars/_griddle-lg.scss');
        this.template('source/scss/vars/_griddle-md.scss',approot+'source/scss/vars/_griddle-md.scss');
        this.template('source/scss/vars/_griddle-sm.scss',approot+'source/scss/vars/_griddle-sm.scss');
        this.template('source/scss/vars/_griddle-xs.scss',approot+'source/scss/vars/_griddle-xs.scss');
        this.template('source/scss/vars/_griddle.scss',approot+'source/scss/vars/_griddle.scss');

        // breakpoint
        this.template('source/scss/vars/_breakpoint.scss',approot+'source/scss/vars/_breakpoint.scss');

        this.template('source/scss/vars/breakpoint/_context.scss',approot+'source/scss/vars/breakpoint/_context.scss');
        this.template('source/scss/vars/breakpoint/_helpers.scss',approot+'source/scss/vars/breakpoint/_helpers.scss');
        this.template('source/scss/vars/breakpoint/_no-query.scss',approot+'source/scss/vars/breakpoint/_no-query.scss');
        this.template('source/scss/vars/breakpoint/_respond-to.scss',approot+'source/scss/vars/breakpoint/_respond-to.scss');

        this.template('source/scss/vars/breakpoint/_parsers.scss',approot+'source/scss/vars/breakpoint/_parsers.scss');
        this.template('source/scss/vars/breakpoint/parsers/_double.scss',approot+'source/scss/vars/breakpoint/parsers/_double.scss');
        this.template('source/scss/vars/breakpoint/parsers/_query.scss',approot+'source/scss/vars/breakpoint/parsers/_query.scss');
        this.template('source/scss/vars/breakpoint/parsers/_resolution.scss',approot+'source/scss/vars/breakpoint/parsers/_resolution.scss');
        this.template('source/scss/vars/breakpoint/parsers/_single.scss',approot+'source/scss/vars/breakpoint/parsers/_single.scss');
        this.template('source/scss/vars/breakpoint/parsers/_triple.scss',approot+'source/scss/vars/breakpoint/parsers/_triple.scss');

        this.template('source/scss/vars/breakpoint/parsers/double/_default-pair.scss',approot+'source/scss/vars/breakpoint/parsers/double/_default-pair.scss');
        this.template('source/scss/vars/breakpoint/parsers/double/_default.scss',approot+'source/scss/vars/breakpoint/parsers/double/_default.scss');
        this.template('source/scss/vars/breakpoint/parsers/double/_double-string.scss',approot+'source/scss/vars/breakpoint/parsers/double/_double-string.scss');

        this.template('source/scss/vars/breakpoint/parsers/resolution/_resolution.scss',approot+'source/scss/vars/breakpoint/parsers/resolution/_resolution.scss');

        this.template('source/scss/vars/breakpoint/parsers/single/_default.scss',approot+'source/scss/vars/breakpoint/parsers/single/_default.scss');
        this.template('source/scss/vars/breakpoint/parsers/triple/_default.scss',approot+'source/scss/vars/breakpoint/parsers/triple/_default.scss');
    }, //end move_ASSETS_Files
    end: function () {

        this.log(chalk.yellow(
            '\n Go and get yourself a coffee, It will take a while...'
        ));
        //  new folder thats created with the appname
        var approot = "\\"+base+this.includeAppName+"\\";
        // add that to the current directory
        var npmdir = process.cwd()+approot;

        process.chdir(npmdir);

        this.installDependencies({
            callback: function(){
                this.log(chalk.yellow(
                    '\n Enjoying your coffee ? I\'m almost done...'
                ));
                this.spawnCommand('gulp',['build']);
                this.spawnCommand('gulp',['vendor']);
                // this.spawnCommand('gulp');
            }.bind(this) // bind the callback to the parent scope
        });
    }
    ,whatToDoNext: function() {
        this.on('end', function(){
            this.log(chalk.yellow("\n and read the README file"));
            this.log(chalk.yellow("\n run")+chalk.bold.red('gulp')+chalk.yellow(' to start the app'));
        });
    }
});
module.exports = myflow;
