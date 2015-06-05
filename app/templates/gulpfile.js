// Author -> CreativeKoen
var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var pkg           = require('./package.json');





var displayError = function(error) {
    var errorLog = [];
    errorLog += "[ ERROR ]" + "\n";
    errorLog += '[ plugin: '+ error.plugin + ' ]' + "\n";
    errorLog += 'error says: \n'+ error.message.replace("\n",' ') +"\n";
    errorLog += '[ '+'op lijn ' + error.line + ' ]'+"\n";
    errorLog += '[ '+'in ' + error.file + ' ]'+"\n";
    console.error(errorLog);
}





var paths = {
    styles: {
        src:    'source/scss/main.scss',
        watch:    'source/scss/**/*.scss',
        dest:   '../'+ pkg.name + '/css',
        vendor:   '../'+ pkg.name + '/css/vendor'
    },
    scripts: {
        src:    'source/js/*.js',
        dest:   '../'+ pkg.name + '/js',
        vendor:   '../'+ pkg.name + '/js/vendor'
    },
    php: {
        src:    'source/*.php',
        dest:   '../'+pkg.name+'/'
    }
}





/*
-------------------------------------------------------
    Styles
-------------------------------------------------------
*/
gulp.task('styles', function() {
    gulp.src(paths.styles.src)
        .pipe($.memoryCache('stylesCached'))
        .pipe($.sass({
          errLogToConsole: false
          }))
        .on('error', function(err)  { displayError(err);    })
        .pipe($.autoprefixer({browser: ['last 2 version','Firefox ESR', 'Opera 12.1','ie10','ie11','ie9'],cascade: true} ))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe($.notify('Styles task done'));
  });





/*
-------------------------------------------------------
    Scripts
-------------------------------------------------------
*/
gulp.task('scripts', function() {
    gulp.src(paths.scripts.src)
        .pipe($.memoryCache('scriptsCached'))
        .pipe($.jshint())
        .pipe($.jshint.reporter($.jshintStylish))
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe($.concat('main.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe($.notify('scripts task done'));
});





/*
-------------------------------------------------------
    php
-------------------------------------------------------
*/
gulp.task('php', function(){
    gulp.src(paths.php.src)
        .pipe($.memoryCache('phpCached'))
        .pipe($.header('<!-- DONT EDIT THE FILE -->\n'))
        .pipe(gulp.dest(paths.php.dest))
        .pipe($.notify({ message: 'php task done' }));
});





/*
-------------------------------------------------------
    Vendor
-------------------------------------------------------
*/
gulp.task('vendor:js', function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/modernizr/modernizr.js'
        ])
        .pipe(gulp.dest(paths.scripts.vendor));
});

gulp.task('vendor:css', function(){
    gulp.src(['bower_components/normalize.css/normalize.css'])
        .pipe(gulp.dest(paths.styles.vendor));
});

gulp.task('vendor', gulp.parallel('vendor:js','vendor:css'));





/*
-------------------------------------------------------
    Build
-------------------------------------------------------
*/
gulp.task('build', gulp.parallel('scripts','styles','php') );





/*
-------------------------------------------------------
    phpServer
-------------------------------------------------------
*/
gulp.task('phpserver', function(){
    $.connectPhp.server({
        base: '../'+pkg.name+'/',
        port: 3030,
        keepalive: true
    });
    console.log('php server running...');
});





/*
-------------------------------------------------------
    Watch
-------------------------------------------------------
*/
gulp.task('watch', function(){

    browserSync({
        proxy: '<%= localhost %>',
        port: 3000,
        notify: true,
        open: false,
        ui: false
        // middleware: function(req, res, next){
        //     console.log(req.url);
        //     next();
        // }
    });

    var watchFiles = [
        'source/scss/**/*.scss'
        ,'source/js/**.js'
        ,'source/*.php'
    ];

    gulp.watch( watchFiles[0],
        gulp.parallel('styles', reload ))
            .on('change', function(event){
                console.log('cache check');
                if (event.type === 'deleted'){
                    $.memoryCache.forget('stylesCached', event.path);
                    console.log('a file was deleted');
                }
                else{
                    $.memoryCache.update('stylesCached')
                    // console.log('[scss] cache updated')
                    console.log('[scss] cache updated');
                }
            });

    gulp.watch( watchFiles[1],
        gulp.parallel('scripts', reload ))
            .on('change', function(event){
                console.log('cache check');
                if (event.type === 'deleted'){
                    $.memoryCache.forget('scriptsCached', event.path);
                    console.log('a file was deleted');
                }
                else{
                    $.memoryCache.update('scriptsCached')
                    console.log('[js] cache updated');
                }
            });

    gulp.watch( watchFiles[2],
        gulp.parallel('php', reload ))
            .on('change', function(event){
                console.log('cache check');
                if (event.type === 'deleted'){
                    $.memoryCache.forget('phpCached', event.path);
                    console.log('a file was deleted');
                }
                else{
                    $.memoryCache.update('phpCached')
                    console.log('[php/html] cache updated');
                }
            });
});





/*
-------------------------------------------------------
    Clean
-------------------------------------------------------
*/
gulp.task('clean', function(){
    var file = "../"+pkg.name+"/";

    console.log('\n'+"Deleted "+ pkg.name+" files!"+'\n');

    return gulp.src(file, { read: false })
        .pipe($.rimraf({force:true}));
});
gulp.task('clean:cache', function () {
    $.cached.caches = {};
    $.memoryCache.caches = {};
    console.log('\n'+"Deleted cache files!"+'\n');
});






/*
-------------------------------------------------------
    Default
-------------------------------------------------------
*/
// gulp.task('default', gulp.parallel('clean','clean:cache','build','watch') );
gulp.task('default', gulp.parallel('clean:cache','build','watch') );





/*
-------------------------------------------------------
    Update
-------------------------------------------------------
*/
gulp.task('update', function(){

    var fs      = require('fs');
    var https   = require('https');
    var getRemoteCode;

    getRemoteCode = function(cb) {
        var remoteCode, req;
        console.log('De nieuwste gulpfile aan het downloaden van github');
        remoteCode = "";
        req = https.request({
            host: 'bitbucket.org',
            port: 443,
            path: '/mousecraft/gulp-starter/raw/master/gulpfile.js',
            method: 'GET',
            agent: false
            },
            function(res) {
                res.on('data', function(d) {
                    return remoteCode += d;
                });
                return res.on('end', function() {
                    return cb(remoteCode);
                });
            });
        return req.end();
    };

    getRemoteCode(function(remoteCode){
        var localCode;
        localCode = fs.readFileSync('./gulpfile.js', 'utf8');
        if (localCode.length !== remoteCode.length) {
            fs.writeFileSync('./gulpfile.js', remoteCode);
            return console.log('De locale gulpfile is verouderd. Updating...');
        } else {
            return console.log('Je heb de Laatste Versie. Geen update nodig');
        }
    });
});//end gulp task
