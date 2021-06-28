module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				banner: '/**\n * <%= pkg.name %> - v<%= pkg.version %>' +
						'\n * <%= pkg.description %>' +
						'\n * @author <%= pkg.author %>' +
						'\n * @website <%= pkg.homepage %>' +
						'\n * @license <%= pkg.license %>' +
						'\n */\n\n'
			},
			dist: {
				src: [
					'src/lib_header.js',
					'src/CanvasType.js',
					'src/CTFonts.js',
					'src/fonts-array.js',
					'src/lib_footer.js',
				],
				dest: 'canvas-type.js',
			},
		},
		
		'string-replace': {
			source: {
				files: {
					"canvas-type.js": "canvas-type.js"
				},
				options: {
					replacements: [{
						pattern: /{{ VERSION }}/g,
						replacement: '<%= pkg.version %>'
					}]
				}
			},
			readme: {
				files: {
					"README.md": "README.md"
				},
				options: {
					replacements: [{
						pattern: /\d*\.\d*\.\d*/g,
						replacement: '<%= pkg.version %>'
					}]
				}
			}
		},
		
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */'
			},
			build: {
				src: 'canvas-type.js',
				dest: 'canvas-type.min.js'
			}
		}
		
	});

	grunt.registerTask('build-font-list', 'Generate docs', function () {
		
		const fs = require('fs');
		const readline = require('readline');
		const fonts_file = 'src/known-fonts.txt';
		const fonts_array_file = 'src/fonts-array.js';
		var done = this.async();
		
		fs.truncate(fonts_array_file, 0, function () {
			var written_fonts = [];
			const writer = fs.createWriteStream(fonts_array_file, {flags: 'a'});
			writer.write("CTFonts._native_fontlist = [\n");
			
			var rd = readline.createInterface({
				input: fs.createReadStream(fonts_file),
				console: false
			});

			rd.on('line', function (line) {

				// Ignore lines that start with #, and empty lines
				if(/^#/.test(line) || !line.trim()) return;

				var f = [];

				var note = line.match(/\(.*\)/);

				if (note) {
					var perens = note[0].match(/\((.*)\)/)[1];
					var trimmed = line.replace(note[0], '');
					f.push(perens.trim());
					f.push(trimmed.trim());
				} else {
					f.push(line);
				}

				f.forEach(fnt => {
					var perens = fnt.match(/\[.*\]/);
					if (perens) fnt = fnt.replace(perens[0], '').trim();

					if(!written_fonts.includes(fnt)){
						written_fonts.push(fnt);
						writer.write("\t'"+fnt+"',\n");
					}
				});

			});

			rd.on('close', function(){
				writer.write("];\n");
				done();
			});
			
		});
		
	});
	
	grunt.registerTask('update-version', 'Generate docs', function () {
		var pkg = grunt.file.readJSON('package.json');
		pkg.version = pkg.version.split(".");
		var subversion = pkg.version.pop();
		subversion++;
		pkg.version.push(subversion);
		pkg.version = pkg.version.join(".");
		grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	
	grunt.registerTask('default', [
		'update-version',
		'build-font-list',
		'concat',
		'string-replace:source',
		'string-replace:readme',
		'uglify'
	]);

};