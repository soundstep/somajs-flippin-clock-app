if (typeof require !== 'undefined') {
	// the following code is to perform the tests in a command line
	var expect = require('./../../components/expect/expect');
	var clock = require('./../helpers/dom');
}

describe("timer model tests", function () {

	var model;

	beforeEach(function () {
		model = new clock.TimerModel();
	});

	afterEach(function () {
		model.dispose();
		model = null;
	});

	it('create an instance', function() {
		expect(model).to.be.an(clock.TimerModel);
	});

	it('contains the time', function() {
		var now = new Date();
		var time = model.time;
		expect(time).to.be.an('object');
		expect(time.date).to.be(now.getDate());
		expect(time.day).to.be(now.getDay() + 1);
		expect(time.hours).to.be(now.getHours());
		expect(time.minutes).to.be(now.getMinutes());
		expect(time.seconds).to.be(now.getSeconds());
		expect(time.month).to.be(now.getMonth() + 1);
		expect(time.now.toString()).to.be(now.toString());
	});

	it('add a callback', function(done) {
		var handler = function(time) {
			expect(time).to.be.an('object');
			done();
		}
		model.add(handler);
	});

	it('remove a callback', function(done) {
		var handler = function(time) {
			expect().fail(function() {
				return 'Callback should not have been called';
			});
			done();
		};
		model.add(handler);
		model.remove(handler);
		setTimeout(function() {
			model.remove(handler);
			done();
		}, 2000);
	});

	it('handler is called every second', function(done) {
		var count = 0;
		var handler = function(time) {
			count++;
		};
		model.add(handler);
		setTimeout(function() {
			expect(count).to.eql(2);
			done();
		}, 2500);
	});

	it('callback gets the correct time on each tick', function(done) {
		var now = new Date();
		var count = 0;
		var handler = function(time) {
			count++;
			expect((now.getSeconds() + count) % 60).to.eql(time.seconds);
			expect(time.date).to.be(now.getDate());
			expect(time.day).to.be(now.getDay() + 1);
			expect(time.hours).to.be(now.getHours());
			expect(time.minutes).to.be(now.getMinutes());
			expect(time.month).to.be(now.getMonth() + 1);
			if (count > 2) {
				done();
			}
		};
		model.add(handler);
	});

});
