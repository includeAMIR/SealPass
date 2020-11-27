const express = require('express');
const bcrypt = require('bcrypt');
const user_model = require('../models/user_model');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const user_list = await user_model.find()
		res.json(user_list)
	} catch (err) {
		res.json({message: err})
	}
});
router.post('/', (req, res) => {
	bcrypt.hash(req.body.password, 10, async (err, hash) => {
		const user = new user_model({
			fullName: req.body.fullname,
			email: req.body.email,
			password: hash
		})
		try {
			const saved_user = await user.save()
			res.json(saved_user)
		} catch (err) {
			res.json({message: err})
		}
	})
});
router.post('/login', async (req, res) => {
	try {
		const get_user = await user_model.findOne({email: req.body.email})
		bcrypt.compare(req.body.password, get_user.password, function(err, result) {
			if(result){
				jwt.sign({get_user}, 'sealpasssecret', (err, token) => {
					res.json({token, status: "true"})
				})
			} else {
				res.json({message: "email ou mot de passe incorect", status: "false"})
			}
		});
	} catch (err) {
		res.json({message: err})
	}
});
router.post('/getmail', async (req, res) => {
	try {
		const get_mail = await user_model.findOne({email: req.body.email})
		res.json(get_mail.email)
	} catch (err) {
		res.json({message: err})
	}
})


module.exports = router;