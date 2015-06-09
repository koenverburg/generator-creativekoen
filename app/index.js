'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require('inquirer');
// var _ = require('underscore').string;

var base = 'assets';

var myflow = module.exports = function myflow(args, options){
    yeoman.generators.Base.apply(this, arguments);
    this.welcome;


};

util.inherits(myflow, yeoman.generators.Base);

myflow.prototype.welcome = function welcome(){
    if (!this.options['skip-welcome-message']){
        this.log(yosay('Welcome to CreativeKoen\'s workflow generator!'));
    };
};

myflow.prototype.askForClient = function askForClient() {
    var done = this.async();
    this.prompt([{
            name: 'appName',
            message: 'what is the name of your client name ?',
            default: 'best-project-ever'
    }], function(props){
        this.appname = props.appName;
        done();
    }.bind(this));
};

myflow.prototype.askForCss = function askForCss() {
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
    // ask for sass deps
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeSass') !== -1;
        },
        type: 'confirm',
        name: 'bourbon',
        value: 'includeBourbon',
        message: 'Would you like to use bourbon?',
        default: false
    }, {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeSass') !== -1;
        },
        type: 'confirm',
        name: 'breakpoint',
        value: 'includeBreakpoint',
        message: 'Would you like to use breakpoint?',
        default: false
    },
    // ask for stylus deps
    {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeStylus') !== -1;
        },
        type: 'confirm',
        name: 'nib',
        value: 'includeNib',
        message: 'Would you like to use nib?',
        default: false
    }, {
        when: function (answers) {
        return answers && answers.features &&
          answers.features.indexOf('includeStylus') !== -1;
        },
        type: 'confirm',
        name: 'rupture',
        value: 'includeRupture',
        message: 'Would you like to use rupture?',
        default: false
    }




    ];

    this.prompt(prompts, function (answers) {
        var features = answers.features;

        function hasFeature(feat) {
            return features && features.indexOf(feat) !== -1;
        }

        this.includeSass = hasFeature('includeSass');

        this.includeBourbon = answers.includeBourbon;
        this.includeBourbon = !answers.includeNib;

        this.includeBreakpoint = answers.includeBreakpoint;
        this.includeBreakpoint = !answers.includeRupture;

        console.log(this.includeSass);
        console.log(this.includeBourbon);
        console.log(this.includeBreakpoint);

        this.includeStylus = hasFeature('includeStylus');

        this.includeNib = answers.includeNib;
        this.includeNib = !answers.includeBourbon;
        this.includeRupture = answers.includeRupture;
        this.includeRupture = !answers.includeBreakpoint;

        console.log(this.includeStylus);
        console.log(this.includeNib);
        console.log(this.includeRupture);
        done();
    }.bind(this));
};
