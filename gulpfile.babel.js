import gulp from 'gulp'
import ejs from 'gulp-ejs'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import movies from './movies.json'

const server = browserSync.create()

const paths = {
  html: {
    src: './src/pages/**/*.html',
    shared: './src/shared/**/*.html',
    dest: './dist'
  },
  sass: {
    src: './src/pages/**/*.scss',
    shared: './src/shared/**/*.scss',
    dest: './dist'
  },
  js: {
    src: './src/pages/**/*.js',
    dest: './dist'
  }
}

const html = () =>
  gulp.src(paths.html.src)
    .pipe(ejs(movies))
    .pipe(gulp.dest(paths.html.dest))

const scss = () =>
  gulp.src(paths.sass.src)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest(paths.sass.dest))

const js = () =>
  gulp.src(paths.js.src)
  .pipe(babel())
  .pipe(gulp.dest(paths.js.dest))

const reload = done => {
  server.reload()
  done()
}

const serve = done => {
  server.init({
    server: {
      baseDir: './dist'
    }
  })
  done()
}

const watch = () => {
  gulp.watch([paths.html.src, paths.html.shared], gulp.series(html, reload))
  gulp.watch([paths.sass.src, paths.sass.shared], gulp.series(scss, reload))
  gulp.watch(paths.js.src, gulp.series(js, reload))
}

gulp.task('dev', gulp.series(html, scss, js, serve, watch))