const app = require('express')();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const crypt = require('./crypt.js');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var fin = function () {
  fs.unlink("uploads/tmp/"", (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
}
eventEmitter.on('verif_fini', fin);


app.get('/', (req, res)=>{
  res.sendfile("downloads/decrypt.txt");
});

app.get('/download/:file(*)',(req, res) => {
var file = req.params.file;
console.log(file);
fs.readFile("uploads/"+file, (err, data) =>{
  if (err) throw err;
  else{
    const encrypted = data;
    const decrypted = crypt.decrypt(encrypted);
    fs.writeFile("uploads/tmp/"+file, decrypted, (err)=>{
      if(err) throw err;
      var fileLocation = path.join('./uploads/tmp',file);
      var verif = res.download(fileLocation, file, (err)=>{
        if(err) throw err;
        fs.unlinkSync(fileLocation);
      });

    });

  }
});
});
// eventEmitter.emit('verif_fini');

app.listen(8000, ()=>{
  console.log("listening 8000");
});
/*
passage memoire
var stream = require('stream');
app.get('/download', function(request, response){
  var fileContents = Buffer.from(fileData, "base64");
  var readStream = new stream.PassThrough();
  readStream.end(fileContents);
  response.set('Content-disposition', 'attachment; filename=' + fileName);
  response.set('Content-Type', 'text/plain');
  readStream.pipe(response);
});
*/
