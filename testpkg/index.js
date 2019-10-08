const event = require('../dist').event;

require('./subscribe');
require('./dispatch');

event.dispatch('onJamil', 'HIII');

event.dispatch('onStart', 100);

event.removeAllListener('onJamil');


event.dispatch('onJamil', 'HIII');



event.once('onStart', val => console.log('onceeeeeeee '+ val));

event.dispatch('onStart', '101');

event.dispatch('onStart', '102');

event.removeAllListener('onStart');

event.dispatch('onStart', '104');