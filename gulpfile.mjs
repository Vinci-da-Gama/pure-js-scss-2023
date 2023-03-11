import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import gulpEslint from 'gulp-eslint';
import gulpUglify from 'gulp-uglify';
import gulpImagemin from 'gulp-imagemin';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import gulpHtmlmin from 'gulp-htmlmin';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const browserSyncInstance = browserSync.create();

const paths = {
  src: {
    images: 'src/_assets/**.*',
    html: 'src/index.html',
    js: 'src/js/**/*.js',
    scss: 'src/scss/**/*.scss',
  },
  dist: {
    images: 'dist/_assets',
    html: 'dist',
    js: 'dist/js',
    css: 'dist/css',
  },
};

const compileHtml = () => {
  return gulp.src(paths.src.html)
    .pipe(gulpHtmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSyncInstance.stream());
}

const optimizeImages = () => {
  return gulp.src(paths.src.images)
    .pipe(gulpImagemin())
    .pipe(gulp.dest(paths.dist.images));
};

const compileJs = () => {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulpUglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSyncInstance.stream());
}

const compileScss = () => {
  return gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSyncInstance.stream());
}

const keepWatch = () => {
  browserSyncInstance.init({
    server: {
      baseDir: './dist',
    },
    port: 5000 // set to 5000, it would displayed in 5001
  });

  gulp.watch(paths.src.html, compileHtml);
  gulp.watch(paths.src.images, optimizeImages);
  gulp.watch(paths.src.js, compileJs);
  gulp.watch(paths.src.scss, compileScss);
}

export const build = gulp.parallel(compileHtml, optimizeImages, compileJs, compileScss);
export const watch = keepWatch;
