import gulp from 'gulp'
import mustache from 'gulp-mustache'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'

const server = browserSync.create()

const paths = {
  html: {
    src: './src/html/pages/**/*.html',
    partials: './src/html/partials/**/*.html',
    dest: './dist'
  },
  sass: {
    src: './src/sass/**/*.scss',
    dest: './dist/css'
  }
}

const html = () =>
  gulp.src(paths.html.src)
    .pipe(mustache('movies.json'))
    .pipe(gulp.dest(paths.html.dest))

const scss = () =>
  gulp.src(paths.sass.src)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest(paths.sass.dest))

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
  gulp.watch([paths.html.src, paths.html.partials], gulp.series(html, reload))
  gulp.watch(paths.sass.src, gulp.series(scss, reload))
}

gulp.task('dev', gulp.series(html, scss, serve, watch))