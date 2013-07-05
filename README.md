somajs-flippin-clock-app
========================

Demo built with soma.js for a flippinawesome.org article

[http://soundstep.github.io/somajs-flippin-clock-app/](http://soundstep.github.io/somajs-flippin-clock-app/)

# bower

Components can be updated using [Bower.io](http://bower.io/)

	$ bower install

# run tests

Tests are available from the browser:

[http://soundstep.github.io/somajs-flippin-clock-app/tests/](http://soundstep.github.io/somajs-flippin-clock-app/tests/)

And the command line:

	$ npm install
	$ npm install -g mocha

Then run:

	$ npm test

or:

	$ mocha -u bdd --reporter spec --timeout 5000 tests/specs/*.js