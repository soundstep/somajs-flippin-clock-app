if (typeof require !== 'undefined') {
	// the following code is to perform the tests in a command line
	var expect = require('./../../components/expect/expect');
	var clock = require('./../helpers/dom');
}

describe("facade tests", function () {

	var app;
	var container;

	beforeEach(function () {
		container = document.createElement('div');
		var html = '';
		html += '<div class="clock-app">';
		html += '	<div class="clock-selector">';
		html += '	    <button data-click="select(\'digital\')">Digital clock</button>';
		html += '	    <button data-click="select(\'analog\')">Analog clock</button>';
		html += '       <button data-click="select(\'polar\')">Polar clock</button>';
		html += '    </div>';
		html += '    <div class="clock"></div>';
		html += '</div>';
		container.innerHTML = html;
		app = new clock.ClockDemo(container);
	});

	afterEach(function () {
		app.dispose();
		container.innerHTML = '';
		container = null;
		app = null;
	});

	it('create an instance', function() {
		expect(app).to.be.an(clock.ClockDemo);
	});

	it('contain the root DOM Element', function() {
		expect(app.element).to.eql(container);
	});

	it('contain the analog clock views injections', function() {
		expect(app.injector.getValue('face')).to.be.an(clock.FaceView);
		expect(app.injector.getValue('needleHours')).to.be.an(clock.NeedleHours);
		expect(app.injector.getValue('needleMinutes')).to.be.an(clock.NeedleMinutes);
		expect(app.injector.getValue('needleSeconds')).to.be.an(clock.NeedleSeconds);
	});

	it('contain the clock views injections', function() {
		var views = app.injector.getValue('views');
		expect(views).to.be.an('object');
		expect(views.digital).to.eql(clock.DigitalView);
		expect(views.analog).to.eql(clock.AnalogView);
		expect(views.polar).to.eql(clock.PolarView);
	});

	it('contain a timer model injection', function() {
		expect(app.injector.getValue('timer')).to.be.an(clock.TimerModel);
		expect(app.injector.getValue('timer')).to.be.an(clock.TimerModel);
	});

	it('timer model is singleton', function() {
		var model1 = app.injector.getValue('timer');
		var model2 = app.injector.getValue('timer');
		expect(model1).to.eql(model2);
	});

	it('dispatch a create event', function(done) {
		app.dispatcher.addEventListener('create', function(event) {
			expect(event).to.be.an('object');
			expect(event.type).to.eql('create');
			done();
		});
		app.start();
	});

	it('create a default view', function() {
		var clock = container.querySelector('.clock');
		expect(clock.childNodes.length).to.eql(1);
	});

	it('create a analog clock', function() {
		var clock = container.querySelector('.clock');
		app.dispatcher.dispatch('create', 'analog');
		expect(clock.childNodes.length).to.eql(1);
		if (typeof HTMLCanvasElement !== 'undefined') {
			// this assert do not work from command line
			expect(clock.firstChild).to.be.an(HTMLCanvasElement);
		}
	});

	it('create a polar clock', function() {
		var clock = container.querySelector('.clock');
		app.dispatcher.dispatch('create', 'polar');
		expect(clock.childNodes.length).to.eql(1);
		expect(clock.childNodes.length).to.eql(1);
		if (typeof HTMLCanvasElement !== 'undefined') {
			// this assert do not work from command line
			expect(clock.firstChild).to.be.an(HTMLCanvasElement);
		}
	});

	it('create a digital clock', function() {
		var clock = container.querySelector('.clock');
		app.dispatcher.dispatch('create', 'digital');
		expect(clock.childNodes.length).to.eql(1);
		expect(clock.firstChild.nodeType).to.eql(3);
	});

});
