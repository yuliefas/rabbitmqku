// publisher
var amqp = require('amqplib/callback_api');

// // connect to rabbit mq
// amqp.connect('amqp://localhost', function (err, conn) { });


// // create channel
// amqp.connect('amqp://localhost', function (err, conn) {
//   conn.createChannel(function (err, ch) { });
// })


amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'hello';

    ch.assertQueue(q, { durable: false });

    // mengirim ke antrian
    ch.sendToQueue(q, new Buffer('Hello world!'));
    console.log(" [x] Sent 'Hello World! ")
  })
})