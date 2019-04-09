const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'logs';

    ch.assertExchange(ex, 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      // console.log(' [x] Waiting for messages in %s. TO exit press CTRL+C', q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, (msg) => {
        if (msg.content) {
          console.log(" [x] %s", msg.content.toString());
        }
      }, { noAck: true });
    });
  })
});