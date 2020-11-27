const fs = require('fs');
const Cloudi = require('./CloudiDB.js');
//suppression fichier du serveur et appel fonction suppression info du fichier de la BD
function delete(file_name, id_client){
  fs.unlink("uploads/"+id_client+"/"+file_name, (err) => {
    if (err) {
      console.error(err)
      return
    }
    Cloudi.deleteFileDB(file_name);
  });
}
exports.delete = delete;
