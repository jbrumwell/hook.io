/*
 * Creates a helloworld hook, then spawns three helloworld children
 */

var Hook = require('../../../lib/hookio').Hook;


var hook1 = new Hook({ 
  name: "server-hook",
  debug: true
});

var hook2 = new Hook({ 
  name: "callback-hook",
  debug: true
});


hook2.on('hello', function(data, callback){
  //
  // callback is the callback for this event,
  // should it exist
  //
  var result = {
    "text": "Why hello there!"
  };
  console.log('got call');
  callback(null, result);

})

hook1.on('hook::ready', function(){
  
  hook2.start();
  
  hook2.on('hook::ready', function(){

    //
    // Event with data
    // event, data, callback
    //
    hook2.emit('hello', 'data1', function(err, data){
      console.log('callback1 ', err, data);
    });

  });
  
});

hook1.start();