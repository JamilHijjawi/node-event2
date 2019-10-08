const event = require('../dist');

event.dispatch('onStart', 99);

event.on('onJamil', console.warn, console.error);