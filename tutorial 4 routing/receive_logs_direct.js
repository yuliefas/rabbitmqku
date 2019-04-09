var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

/**
 * process.argv: (array)
 * 
 * node receive_logs_driver.js one two=three four
 * 0: /usr/local/bin/node
 * 1: /Users/bombom/wonderlabs/rabbitmqku/receive_logs_driver.js
 * 2: one
 * 3: two=three
 * 4: four
 */

if (args.length == 0) {
  console.log("Usage: reveive_logs_direct.js [hero] [warning] [error]");
  process.exit(1);
}

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    var ex = 'direct_logs';

    ch.assertExchange(ex, 'direct', { durable: false });

    // tanpa key name
    ch.assertQueue('', { exclusive: true }, (err, q) => {
      console.log('[*] waiting for logs. To exit press CTRL+C');

      args.forEach((severity) => {
        // ch.bindQueue(queue_name, exchange_name, 'black'); binding with key
        ch.bindQueue(q.queue, ex, severity);;
      })

      ch.consume(q.queue, (msg) => {
        console.log("[x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, { noAck: true }); // save to disk
    });
  })
});