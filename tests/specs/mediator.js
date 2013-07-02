describe("clock mediator tests", function () {

	var container;
	var app;
	var mediator;

	var DummyView = function() {
		this.update = function(){};
		this.dispose = function(){};
	};

	var DummyModel = function() {
		this.time = {};
		this.add = function(){};
		this.remove = function(){};
	};

	var views;

	beforeEach(function () {
		container = document.createElement('div');
		app = new soma.Application();
		views = {
			'digital': DummyView,
			'analog': DummyView,
			'polar': DummyView
		};
	});

	afterEach(function () {
		container.innerHTML = '';
		app = null;
		mediator = null;
		container = null;
	});

	it('create an instance', function() {
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		expect(mediator).to.be.an(clock.ClockMediator);
	});

	it('create an analog clock', function(done) {
		var IntendedDummyView = function() {
			this.update = function(){};
			this.dispose = function(){};
			done();
		};
		views.analog = IntendedDummyView;
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		app.dispatcher.dispatch('create', 'analog');
	});

	it('create an digital clock', function(done) {
		var IntendedDummyView = function() {
			this.update = function(){};
			this.dispose = function(){};
			done();
		};
		views.digital = IntendedDummyView;
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		app.dispatcher.dispatch('create', 'digital');
	});

	it('create an polar clock', function(done) {
		var IntendedDummyView = function() {
			this.update = function(){};
			this.dispose = function(){};
			done();
		};
		views.polar = IntendedDummyView;
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		app.dispatcher.dispatch('create', 'polar');
	});

	it('update view with time immediately', function(done) {
		var IntendedDummyView = function() {
			this.update = function(){
				done();
			};
			this.dispose = function(){};
		};
		views.analog = IntendedDummyView;
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		app.dispatcher.dispatch('create', 'analog');
	});

	it('add view to timer model', function(done) {
		var TestModel = function() {
			this.add = function(){
				done();
			};
			this.remove = function(){};
		};
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new TestModel(), views);
		app.dispatcher.dispatch('create', 'analog');
	});

	it('remove view from timer model', function(done) {
		var TestModel = function() {
			this.add = function(){};
			this.remove = function(){
				done();
			};
		};
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new TestModel(), views);
		app.dispatcher.dispatch('create', 'analog');
		app.dispatcher.dispatch('create', 'digital');
	});

	it('dispose view', function(done) {
		var IntendedDummyView = function() {
			this.update = function(){};
			this.dispose = function(){
				done();
			};
		};
		views.analog = IntendedDummyView;
		mediator = new clock.ClockMediator(container, app.dispatcher, app.mediators, new DummyModel(), views);
		app.dispatcher.dispatch('create', 'analog');
		app.dispatcher.dispatch('create', 'analog');
	});

});
