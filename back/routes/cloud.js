const express = require('express');
const cloud_model = require('../models/cloud_model');
var path = require('path');
var mime = require('mime-types')
const fs = require('fs');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('sealpasssecret');

const router = express.Router();

router.get('/', (req, res) => {
	//TODO Récuperer la liste de tous les fichiers
});
router.post('/upload/:userid', async (req, res) => {
	if(req.files === null) {
		return res.status(400).json({msg: 'No file uploaded'})
	}console.log(req.params)
	const file = req.files.file
	file.mv(`${__dirname}/files/${req.params.userid}/${file.name}`, err => {
		if(err){
			console.error(err);
			return res.status(500).send();
		}
		let date = getDate()
		let encryptedPassword = cryptr.encrypt(`/files/${req.params.userid}/${file.name}`);
    	const fileSaved = new cloud_model({
			fileName: file.name,
			fileType: file.name.split('.')[1],
			filePath: encryptedPassword,
			userId: req.params.userid,
			date: date
		})
		try {
			const saved_file = fileSaved.save()
		} catch (err) {
			res.json({message: err})
		}

		res.json({fileName: file.name, filePath: `/files/${file.name}`})
	})
	
})
router.post('/', async (req, res) => {
	let date = getDate()
    const file = new cloud_model({
		fileName: req.body.fileName,
		fileType: req.body.fileType,
		filePath: "../files/" + req.body.userId + "/" + req.body.fileName,
		userId: req.body.userId,
		date: date
	})
	try {
		const saved_file = await file.save()
		res.json(saved_file)
	} catch (err) {
		res.json({message: err})
	}
});
router.post('/getfiles', async (req, res) => {
	try {
		const get_files = await cloud_model.find({userId: req.body.userId})
		res.json(get_files)
	} catch (err) {
		res.json({message: err})
	}
})
router.post('/download', async (req, res) => {
	let file = `${__dirname}/files/${req.body.userId}/${req.body.fileName}`
	  let filename = path.basename(file);
	  let mimetype = mime.lookup(file);
	  
	  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
router.delete('/:id', (req, res) => {
	//TODO supprimer un fichier
});

getDate= () => {
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	return dateTime = date+' '+time;
}


module.exports = router;