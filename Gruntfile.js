module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "website/styles.css": "src/styles/root.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['src/**/*.less', 'website/**/*.js', 'website/**/*.html'], // which files to watch
        tasks: ['less'],
        options: {
          livereload: {
            host: 'localhost',
            port: 9000,
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
