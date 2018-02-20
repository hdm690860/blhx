module.exports = function(grunt){
    //require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        watch:{
            jade:{
                files:['views/**'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                //tasks:['jshint']
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                script:'app.js',
                options:{
                    args:[],
                    nodeArgs:[''],
                    ignore:['README.md','node_modules/**','.DS_Store'],
                    ext:'js',
                    watch:['./'],
                    delay:100,
                    env:{
                        PORT:4000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }


        //pkg:grunt.file.readJSON('package.json')
    });
    //引入插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');


    grunt.option('force',true);
    grunt.registerTask('default',['concurrent:target']);

}