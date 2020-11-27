const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const fs = require('fs');
const crypt = require('./crypt.js');
const Cloudi = require('./CloudiDB.js');
const port = 8080;

app.set("views",path.join(__dirname,"views"));
//gestion de la vue moteur template ejs
app.set("view engine","ejs");
//memory storage pour ne pas ecrire dans le disque faire les ope sur la ram directe
const storage = multer.memoryStorage();

var upload = multer({
	storage: storage
}).single("file_na");//single pour ne pas subir d'attaque qui sature le serveur

//renvoi page index.ejs
app.get("/",(req,res) => {
	res.render("index");
});
//lors du clique sur le bouton upload declenche cette fonction
app.post("/uploadFile",function (req, res, next) {

	upload(req,res,(err) => {
		//recuperation nom fichier
		var file_name = req.file.originalname;
		//path cloud init
		var file_path = "uploads/"+file_name;
		//cryptage fichier
		const encrypted = crypt.encrypt(req.file.buffer);
		if (err) throw err;
		//ecriture du crypter
			fs.writeFile(file_path, encrypted, (err)=>{
		      if (err) throw err;
					Cloudi.insertFileDB(10/*id client de la session*/, file_path, path.extname(file_name),'test' ,file_name);
		  });

		if(err) res.send(err);
		else res.send("Votre fichier a été sauvegarder");
	});
});

app.listen(8080,function(error) {
	if(error) throw error
		console.log(`Server created Successfully on /${port}`)
});
