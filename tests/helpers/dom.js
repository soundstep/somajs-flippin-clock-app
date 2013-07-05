var jsdom = require('jsdom').jsdom;

document = jsdom('<html><head></head><body></body></html>');
window = document.createWindow();

// libs
soma = require('./../../components/soma.js/build/soma-v2.0.3.min.js');
template = require('./../../components/soma-template/build/soma-template-v0.2.1.min.js');
soma.plugins.add(template.Plugin);

// app
require('./../../js/app/clock');
require('./../../js/app/models/timer');
require('./../../js/app/mediators/clock');
require('./../../js/app/views/selector');
require('./../../js/app/views/clocks/digital/digital');
require('./../../js/app/views/clocks/polar/polar');
require('./../../js/app/views/clocks/analog/analog');
require('./../../js/app/views/clocks/analog/face');
require('./../../js/app/views/clocks/analog/needle-hours');
require('./../../js/app/views/clocks/analog/needle-minutes');
require('./../../js/app/views/clocks/analog/needle-seconds');

module.exports = window.clock;

