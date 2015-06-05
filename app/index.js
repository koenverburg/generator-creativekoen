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
        // this.log('\n This personal framework comes with jade,php,html,stylus,sass,lost,bower,browserSync etc..')
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
        }
        ,{
            type: 'confirm',
            name: 'php server',
            message: 'Do you me to spin up a php server ?',
            default: false
        }
        ,{
            type: 'checkbox',
            name: 'prepros',
            message: 'Which css prepocessor do you want to use ?',
            choices: [
            {
                value: 'preStylus',
                name: 'Stylus',
                checked: true
            },
            {
                value: 'preSass',
                name: 'Sass',
                checked: false
            }]
        }
        ,{
            type: 'confirm',
            name: 'gridSystem',
            message: 'Do you want to use the Lost grid system ?',
            default: true
        }



        ];

        this.prompt(prompts, function(answers){

            this.includeAppName = answers.appName;
            this.includeLocalName = answers.localName;

            done();
        }.bind(this));
    }//end promtUser
    //
    //
    // copyFiles: function(){
    //
    //     var approot = base+this.includeAppName+'/';
    //
    //     this.template('.gitignore',    approot+'.gitignore');
    //     this.template('editorconfig',  approot+'editorconfig');
    //     this.template('README.md',     approot+'README.md');
    //     this.template('bower.json',     approot+'bower.json');
    //
    //     // passing app name to package.json
    //     var appname = { clientname: this.includeAppName};
    //     var localname = { localhost: this.includeLocalName};
    //
    //     this.template('package.json', approot+'package.json', appname);
    //     this.template('gulpfile.js', approot+'gulpfile.js', localname);
    //     this.template('_yo-rc.json', approot+'.yo-rc.json');
    // },//end copy files
    //
    // move_ASSETS_Files: function(){
    //
    //     var approot = base+this.includeAppName+'/';
    //     var clientname2 = { clientname: this.includeAppName};
    //
    //     this.template('source/index.php',approot+'source/index.php', clientname2);
    //     this.template('source/js/main.js',approot+'source/js/main.js');
    //     this.template('source/scss/main.scss',approot+'source/scss/main.scss');
    //
    //     // smacks
    //     this.template('source/scss/vars/_base.scss',approot+'source/scss/vars/_base.scss');
    //     this.template('source/scss/vars/_fonts.scss',approot+'source/scss/vars/_fonts.scss');
    //     this.template('source/scss/vars/_state.scss',approot+'source/scss/vars/_state.scss');
    //     this.template('source/scss/vars/_theme.scss',approot+'source/scss/vars/_theme.scss');
    //     this.template('source/scss/vars/_layout.scss',approot+'source/scss/vars/_layout.scss');
    //     this.template('source/scss/vars/_navbar.scss',approot+'source/scss/vars/_navbar.scss');
    //     this.template('source/scss/vars/_vars.scss',approot+'source/scss/vars/_vars.scss');
    //
    // }, //end move_ASSETS_Files
    // end: function () {
    //
    //     this.log(chalk.yellow(
    //         '\n Go and get yourself a coffee, It will take a while...'
    //     ));
    //
    //     //  new folder thats created with the appname
    //
    //     var approot = "\\"+base+this.includeAppName+"\\";
    //
    //     // add that to the current directory
    //     var npmdir = process.cwd()+approot;
    //
    //     process.chdir(npmdir);
    //
    //     this.installDependencies({
    //         callback: function(){
    //             this.log(chalk.yellow(
    //                 '\n Enjoying your coffee ? I\'m almost done...'
    //             ));
    //             setTimeout(function(){
    //                 this.spawnCommand('gulp',['build']);
    //                 this.spawnCommand('gulp',['vendor']);
    //             }, 3000);//sleep for 3 secs
    //         }.bind(this) // bind the callback to the parent scope
    //     });
    // },
    // whatToDoNext: function() {
    //     this.on('end', function(){
    //         this.log(chalk.yellow("\n run")+chalk.bold.red('gulp')+chalk.yellow(' to start the app'));
    //     });
    // }
});
module.exports = myflow;
