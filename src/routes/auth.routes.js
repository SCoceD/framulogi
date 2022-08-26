const {Router} = require('express');
const router = new Router();
const db = require('../db/db.js');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const authMiddleware = require('../middleware/auth.middleware');
const personController = require('../controller/person.controller');

router.post('/registration', personController.createPerson);
// Login Json params (login, password);
// POST https://splastun2.node.shpp.me/api/login
router.post('/login',
    async (req, res) => {
        try {
            const {login, password} = req.body;
            const person = await db.query('SELECT * FROM person WHERE login = $1', [login]);
            if (!person.rows[0]) {
                return res.status(404).json({message: 'User not found'});
            }
            if (password !== person.rows[0].password) {
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = jwt.sign({id: person.rows[0].person_id}, secretKey, {expiresIn: '1d'});
            return res.json({
                token,
                user: {
                    person_id: person.rows[0].person_id,
                    login: person.rows[0].login,
                    fullname: person.rows[0].fullname,
                    email: person.rows[0].email
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const person = await db.query(`SELECT *
                                           FROM person
                                           WHERE person_id = $1`, [req.person.id]);
            /*todo token  30s*/
            const token = jwt.sign({id: person.rows[0].person_id}, secretKey, {expiresIn: '30s'});
            return res.json({
                token,
                user: {
                    person_id: person.rows[0].person_id,
                    login: person.rows[0].login,
                    fullname: person.rows[0].fullname,
                    email: person.rows[0].email
                }
            })
        } catch (e) {
            console.log(e);
            res.send({message: 'Server error'});
        }
    }
)

module.exports = router;
