const event = require('../dist').event;

event.on('onStart', val => console.log('on '+ val));


const handler1 = (val) => {
  console.log('handlerrrr1 '+ val);
}

const handler2 = (val) => {
  console.log('handlerrr2   '+ val);
}

event.on('onStart', handler2, handler1);


// event.on('onStart', handler1);
// event.on('onStart', handler2);

event.dispatch('onStart', 'Him im here');

event.removeListener('onStart', handler1);

event.dispatch('onStart', 'Him im here againnnnnn');