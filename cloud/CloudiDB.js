var mysql = require('mysql');

var pool = mysql.createPool(
{
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'SealPass'
});
/* id_fichier auto incremente*/
//insertion info sur le fichier enregistrer IMPORTANT id_client session en cours
function insertFileDB(id_client, path, extension, cloud_key ,file_name){
  pool.getConnection((err, connection)=> {
    if (err) throw err;
    console.log("Connected!");
    var sql = 'INSERT INTO Cloud (id_client, path, extension, cloud_key ,file_name) VALUES ?';
    var values = [[id_client, path, extension, cloud_key ,file_name]];
    connection.query(sql,[values],function (err, result) {
			connection.release();
      if (err) throw err;
      //console.log("Number of records inserted: "+ result.affectedRows);
  });
});
}
//supression info fu fichier de la BD a utilisé pour la supression du fichier du serveur
function deleteFileDB(file_name){
  pool.getConnection((err, connection)=> {
		if (err) throw err;
		console.log("Connected");
		var sql = "DELETE FROM  Cloud WHERE file_name = "+ connection.escape(file_name);
		connection.query(sql, (err, result) => {
			connection.release();
		  if (err) throw err;
			console.log("Number of records deleted: " + result.affectedRows);

		})
	});
}

function selectFileDB(nom_fichier){
	pool.getConnection((err, connection)=> {
		if (err) throw err;
		console.log("Connected");
		var sql = "SELECT id_fichier FROM  Cloud WHERE file_name = "+ connection.escape(nom_fichier);
		connection.query(sql, (err, result) => {
			connection.release();
			if (err) throw err;
			console.log("Number of records selected: " + result.length);

		})
	});
}
//insertFileDB(10,'/path', 'ext', 'keu', 'nom2');
deleteFileDB('nom');
exports.insertFileDB = insertFileDB;
exports.deleteFileDB = deleteFileDB;
exports.selectFileDB = selectFileDB;
