var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'hello';

    ch.assertQueue(q, { durable: false });

    ch.prefetch(1);
    // rabbitmq tidak akan memberikan lebih dari 1 pesan
    // kepada seorang worker sekaligus
    // atau dengan kata lain
    // jangan mengirim pesan baru ke worker hingga pesan di proses dan
    // diakui sebelumnya
    // sebagai gantinya dia akan mengirimkan ke worker berikutnya yang
    // masih belum sibuk
    
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    ch.consume(q, function (msg) {
      // fake timeout
      var secs = msg.content.toString().split('.').length - 1;


      console.log('[x] receive %s', msg.content.toString());

      setTimeout(function () {
        console.log("[x] Done")
      }, secs * 1000);
    }, { noAck: false })

    // noAck: false
    // jika kill worker ketika sedang memproses pesan menggunakan crtl+c
    // pesan tidak akan hilang.
    // segera setelah worker mati, all unacknowledged message will be
    // redeliverd (semua pesan yang tidak diakui dikirim kembali)
  })
});