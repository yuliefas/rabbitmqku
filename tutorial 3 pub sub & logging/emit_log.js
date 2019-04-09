var amqp = require('amqplib/callback_api');

/**
 * exchange
 * proses terjadinya pengiriman pesana adalah
 * berawal dari produse ke queue lalu ke consumer
 * nah exchange ini menambah 1 layer lagi di antara producer dan queue
 * producer ke exchange
 * di salah satu sisi dia menerima message from producee, and di sisi lain
 * mendorong merekan untuk mengantri, exchange harus tau apa yang harus di lakukan
 * untuk pesan yang di terimanya
 * haruskah itu di tambahkan ke queue tertentu?
 * haruskan itu di tambahkan ke banyak antrian?
 * atau harus di buang
 * aturan itu di tentukan oleh exchange type
 * - direct
 * - topic
 * - headers
 * - fanout (menyebar)
 */
amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'logs';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    // sebelumnya disini adalah assertQueue (langsung ke layer queue)
    ch.assertExchange(ex, 'fanout', { durable: false });
    ch.publish(ex, '', new Buffer(msg));
    console.log(`[x] Terkirim %s`, msg);
  })

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500)
})

// belum paham sih beda durable false dan true
// kalo yang sendToQue persistence: true artinya menyimpan pesan ke disk juga