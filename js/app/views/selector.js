(function(clock) {

	'use strict';

    var SelectorView = function(scope, dispatcher) {

		scope.select = function(event, id) {
			dispatcher.dispatch('create', id);
		};

    };

	clock.SelectorView = SelectorView;

})(window.clock = window.clock || {});