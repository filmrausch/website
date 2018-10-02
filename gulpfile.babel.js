import gulp from 'gulp'
import ejs from 'gulp-ejs'
import del from 'del'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import movieTestData from './movies.json'
import ddmm from './util/ddmm'
import axios from 'axios'

const server = browserSync.create()

const paths = {
  html: {
    src: './src/pages/**/*.ejs',
    shared: './src/shared/**/*.ejs',
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
  },
  assets: {
    src: './src/assets/**/*',
    dest: './dist/assets'
  }
}

const html = movies =>
  gulp.src(paths.html.src)
    .pipe(ejs({ ...movies, ddmm }, {}, { ext: '.html' }))
    .pipe(gulp.dest(paths.html.dest))


const htmlProd = async () => {
  const movies = await axios.get('http://filmrausch.hdm-stuttgart.de/api')
  return html(movies.data)
}

const htmlDev = () => html(movieTestData)

const scss = () =>
  gulp.src(paths.sass.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest))

const js = () =>
  gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest))

const assets = () =>
  gulp.src('./src/favicon.ico').pipe(gulp.dest('./dist')) &&
  gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest))

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

const clean = () => del('./dist')

const watch = () => {
  gulp.watch([paths.html.src, paths.html.shared], gulp.series(html, reload))
  gulp.watch([paths.sass.src, paths.sass.shared], gulp.series(scss, reload))
  gulp.watch(paths.js.src, gulp.series(js, reload))
  gulp.watch(paths.assets.src, gulp.series(assets, reload))
}

gulp.task('dev', gulp.series(clean, htmlDev, scss, js, assets, serve, watch))
gulp.task('build', gulp.series(clean, htmlDev, scss, js, assets))
gulp.task('build:prod', gulp.series(clean, htmlProd, scss, js, assets))
