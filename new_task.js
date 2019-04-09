var amqp = require('amqplib/callback_api');
var msg = process.argv.slice(2).join('') || 'Hello World!'

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'hello'; // channel name

    ch.assertQueue(q, { durable: false });

    ch.sendToQueue(q, new Buffer(msg), { persistent: true });
    console.log("[x] Sent '%s'", msg);
  });

  // conn.createChannel((err, ch) => {
  //   var q = 'task_queue';

  //   ch.assertQueue(q, { durable: true }); // pesan tidak akan hilang 
  //   ch.sendToQueue(q, new Buffer(msg), { persistent: true });
  //   /// persistent true
  //   // memberi tahu rabbitmq untuk menyimpan pesan ke disk
  //   // jadi tidak akan hilang ketika rabbitmq restart
  // })

  // conn.createChannel((err, ch) => {
  //   ch.assertQueue('', { eksklusif: true });
  //   // Ketika koneksi yang menyatakan itu ditutup,
  //   // antrian akan dihapus karena dinyatakan sebagai eksklusif

  // })
});