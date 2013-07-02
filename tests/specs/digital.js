describe("digital view tests", function () {

	var container;
	var view;
	var time = {
		hours: 1,
		minutes: 1,
		seconds: 1
	};

	beforeEach(function () {
		container = document.createElement('div');
		view = new clock.DigitalView(container);
	});

	afterEach(function () {
		view.dispose();
		view = null;
		container = null;
	});

	it('create an instance', function() {
		expect(view).to.be.an(clock.DigitalView);
	});

	it('has a dispose method', function() {
		expect(typeof view.dispose).to.eql('function');
	});

	it('has an update method', function() {
		expect(typeof view.update).to.eql('function');
	});

	it('update the time correctly', function() {
		view.update(time);
		expect(container.innerHTML).to.eql('01:01:01');
	});

});
