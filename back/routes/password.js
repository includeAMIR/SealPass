const express = require('express');
const password_model = require('../models/password_model');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('sealpasssecret');

const router = express.Router();

router.post('/getpass', async (req, res) => {
	try {
		let getPasswords = await password_model.find({userId: req.body.userId})
		res.json(getPasswords)
	} catch (err) {
		res.json({message: err})
	}
});
router.post('/', async (req, res) => {
	let encryptedPassword = cryptr.encrypt(req.body.password);
    let password = password_model({
		site: req.body.site,
		email: req.body.email,
		password: encryptedPassword,
		userId: req.body.userId
	})
	try {
		let savedPassword = await password.save()
		res.json(savedPassword)
	} catch (err) {
		res.json({message: err})
	}
});
router.put('/', async (req, res) => {
	try{
		let update = await password_model.findOneAndUpdate({_id: req.body.id},{$set:{site: req.body.site, email: req.body.email, password: req.body.password}},{new:true})
		res.json(update)
	} catch (err) {
		res.json({message: err})
	}	
});
router.post('/delete', async (req, res) => {
	try {
		let delet = await password_model.deleteOne({_id: req.body.id})
		res.json(delet)
	} catch (err) {
		res.json({message: err})
	}
});
router.get('/generatePassword', (req, res) => {
	//TODO générateur de mot de passe
})



module.exports = router;