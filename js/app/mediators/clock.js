(function(clock) {

	'use strict';

	var ClockMediator = function(target, dispatcher, mediators, timer, views) {

		var currentClock;

		dispatcher.addEventListener('create', function(event) {

			// destroy previous clock
			if (currentClock) {
				timer.remove(currentClock.update);
				currentClock.dispose();
			}

			// create clock
			var id = event.params;
			var clockView = views[id];
			currentClock = mediators.create(clockView, target);

			// register clock with timer model
			timer.add(currentClock.update);

			// update timer immediately
			currentClock.update(timer.time);

		});

	};

	clock.ClockMediator = ClockMediator;

})(window.clock = window.clock || {});