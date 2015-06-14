'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require('inquirer');

var base = 'assets';

var creativekoen = module.exports = function creativekoen(args, options){
    yeoman.generators.Base.apply(this, arguments);
    this.welcome;
    this.on('end', function(){
        this.installDependencies({
            skipInstall: options['skip-install'],
            skipMessage: options['skip-install']
        })
    });
};

util.inherits(creativekoen, yeoman.generators.Base);

creativekoen.prototype.welcome = function welcome(){
    if (!this.options['skip-welcome-message']){
        this.log(yosay('Welcome to CreativeKoen\'s workflow generator!'));
    };
};

creativekoen.prototype.askForClient = function askForClient() {
    var done = this.async();
    this.prompt([{
            name: 'appName',
            message: 'what is the name of your client name ?',
            default: 'best-project-ever'
    }], function(answers){
        this.appname = answers.appName;
        done();
    }.bind(this));
};

creativekoen.prototype.askForCss = function askForCss() {
    var done = this.async();
    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Would you like Sass or Stylus?',
      choices: [{
        name: 'Stylus',
        value: 'includeStylus',
        checked: true
      },{
        name: 'Sass',
        value: 'includeSass',
        checked: false
      }]
    },
    //ask for sass deps
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeSass') !== -1;
        },
        type: 'confirm',
        name: 'SassStack',
        value: 'includeSassStack',
        message: 'Would you like to use Bourbon,breakpoint and Jeet?',
        default: false
    },
    //ask for stylus deps
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeStylus') !== -1;
        },
        type: 'confirm',
        name: 'StylusStack',
        value: 'includeStylusStack',
        message: 'Would you like to use Nib, Rupture and Jeet?',
        default: true
    }
    ];

    this.prompt(prompts, function (answers) {
        var features = answers.features;

        function hasFeature(feat) {
            return features && features.indexOf(feat) !== -1;
        }

        this.includeSass = hasFeature('includeSass');
        this.includeStylus = hasFeature('includeStylus');

        this.includeStylusStack = hasFeature('includeStylusStack');
        this.includeSassStack = hasFeature('includeSassStack');

        // if (this.includeSass && this.includeSassStack) {
        //    console.log('Sass with a glass of bourbon breakpoint and jeet');
        // }

        // if (this.includeStylus && this.includeStylusStack) {
        //    console.log('stylus with nib rupter and jeet selected');
        // }

        done();
    }.bind(this));
};

creativekoen.prototype.askForLost = function askForLost() {
    var done = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'What kind to html templating engine do you want use?',
        choices: [{
                name: 'Html',
                value: 'includeHtml',
                checked: false
            },{
                name: 'Html (in jade)',
                value: 'includeHtmlPhp',
                checked: false
            },{
                name: 'Php',
                value: 'includePhp',
                checked: false
            },{
                name: 'Php (in jade)',
                value: 'includePhpJade',
                checked: false
            }
            ]
        }];

    this.prompt(prompts, function(answers){
        var features = answers.features;
        function hasFeature(feat){
            return features && features.indexOf(feat) !== -1;
        }

        this.includeHtml = answers.includeHtml;
        this.includeHtmlJade = answers.includeHtmlJade;

        this.includePhp = answers.includePhp;
        this.includePhpJade = answers.includePhpJade;

        done();
    }.bind(this));
};

creativekoen.prototype.askForDeploy = function askForDeploy() {
    var done = this.async();
    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Are you planning on deploying this project?',
      choices: [{
        name: 'github',
        value: 'includeGH',
        checked: false
      },{
        name: 'ftp',
        value: 'includeFTP',
        checked: false
      }]
    },
    // asking for git info
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeGH') !== -1;
        },
        name: 'github username',
        value: 'githubName',
        message: 'What is your github username?',
        default: 'CreativeKoen'
    },
    // {
    //     when: function (answers) {
    //     return answers && answers.features &&
    //       answers.features.indexOf('includeGH') !== -1;
    //     },
    //     name: 'github repo',
    //     value: 'githubName',
    //     message: 'What is your github usrname?',
    //     default: 'CreativeKoen'
    // },
    // asking for ftp info
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeFTP') !== -1;
        },
        name: 'ftpInfo',
        value: 'ftp_username',
        message: 'What is your ftp username?',
        default: 'username'
    },
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeFTP') !== -1;
        },
        name: 'ftpInfo',
        value: 'ftp_password',
        message: 'What is your ftp password?',
        default: 'password'
    },
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeFTP') !== -1;
        },
        name: 'ftpInfo',
        value: 'ftp_path',
        message: 'What is your ftp path?',
        default: 'path/to/www/'
    }
    ];

    this.prompt(prompts, function (answers) {
        var features = answers.features;
        function hasFeature(feat) {
            return features && features.indexOf(feat) !== -1;
        }

        this.includeSass = hasFeature('includeSass');
        this.includeStylus = hasFeature('includeStylus');

        this.includeStylusStack = hasFeature('includeStylusStack');
        this.includeSassStack = hasFeature('includeSassStack');
        done();
    }.bind(this));
};
