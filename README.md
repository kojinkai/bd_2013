Welcome to boxdeluxe, my portfolio project
==========================================

[1]: http://jekyllrb.com/  "Jekyll"
[2]: http://daringfireball.net/projects/markdown/basics/ "Markdown Basics"
[3]: http://sass-lang.com/ "SASS Language Stylesheets"
[4]: http://gruntjs.com/   "Grunt JS"

Read on for details on how to install and modify the page.

###About Jekyll

[Jekyll][1] is a site generator capable of generating both static sites and blogs.  Content can be added via the [Markdown][2] language and pulled automatically into the content section.  Blog posts can be added the same way.  No database required.

###Installation

Installation is pretty straightforward:

Clone the repo

	git clone git@github.com:kojinkai/bd_2013.git

Install Jekyll

	gem install jekyll

cd to the project directory and run it

	cd bd_2013 && jekyll serve --watch

###Gem Dependencies

install the other Gem dependency - [SASS][3]:

	gem install sass

This will allow you to use the sass compiler which can be set to watch for changes while developing.

Run the following from root:

	sass --watch sass/.:assets/css

If you don't already have capistrano you will need that in order to deploy
    gem install capistrano

Then to deploy run
    cap deploy

N.B. Root access to the server is blocked

**Please note:** this will compile everything to a single, un-minified file in the /assets/css directory which is linked from the templates.  Additional SASS files should be prefixed with an _underscore to ensure that the SASS is compiled without creating a separate file in the destination folder.

###Node Modules, NPM Dependencies and grunt.js

We are using [grunt.js][4] for automating CSS and JS minification, JS linting and JS concatenation. It can be used to run unit tests too, if necessary.

Install node and npm in your system, if not already installed.  The best way is to install them with homebrew.  This will give you both node and npm:

	brew install node

Then, install the grunt-cli globally into your system to access the grunt commands from the command line:

	npm install -g grunt-cli

You should now be able to run
	
	grunt

Which will compress, minify and lint everything into the /assets/ directory.  you can run grunt watch to listen for changes, and run manually when you want to re-build the JS file after changes.  Grunt tasks are configurable via gruntfile.js

Thats it, for now
