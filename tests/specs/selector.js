if (typeof require !== 'undefined') {
	// the following code is to perform the tests in a command line
	var expect = require('./../../components/expect/expect');
	var clock = require('./../helpers/dom');
	var simulate = require('./../helpers/events');
}

describe("selector view tests", function () {

	var selector;
	var container;
	var app;

	beforeEach(function () {
		container = document.createElement('div');
		var html = '';
		html += '<div class="clock-selector">';
		html += '    <button data-click="select(\'digital\')">Digital clock</button>';
		html += '    <button data-click="select(\'analog\')">Analog clock</button>';
		html += '    <button data-click="select(\'polar\')">Polar clock</button>';
		html += '</div>';
		container.innerHTML = html;
		app = new soma.Application();
		selector = app.createTemplate(clock.SelectorView, container);
	});

	afterEach(function () {
		container.innerHTML = '';
		container = null;
		selector = null;
		app = null;
	});

	it('create an instance', function() {
		expect(selector).to.be.an(clock.SelectorView);
	});

	it('dispatch a create event on button click', function(done) {
		app.dispatcher.addEventListener('create', function(event) {
			expect(event).to.be.an('object');
			expect(event.type).to.eql('create');
			done();
		});
		var digital = container.querySelector('button[data-click]');
		simulate(digital, 'click');
	});

	it('dispatch a create event on button click with digital parameter', function(done) {
		app.dispatcher.addEventListener('create', function(event) {
			expect(event).to.be.an('object');
			expect(event.type).to.eql('create');
			expect(event.params).to.eql('digital');
			done();
		});
		var digital = container.querySelector('button[data-click*=digital]');
		simulate(digital, 'click');
	});

	it('dispatch a create event on button click with analog parameter', function(done) {
		app.dispatcher.addEventListener('create', function(event) {
			expect(event).to.be.an('object');
			expect(event.type).to.eql('create');
			expect(event.params).to.eql('analog');
			done();
		});
		var digital = container.querySelector('button[data-click*=analog]');
		simulate(digital, 'click');
	});

	it('dispatch a create event on button click with polar parameter', function(done) {
		app.dispatcher.addEventListener('create', function(event) {
			expect(event).to.be.an('object');
			expect(event.type).to.eql('create');
			expect(event.params).to.eql('polar');
			done();
		});
		var digital = container.querySelector('button[data-click*=polar]');
		simulate(digital, 'click');
	});

});
