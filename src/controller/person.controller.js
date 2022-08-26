const db = require('../db/db');

class PersonController {
    async createPerson(req, res) {
        const {login, password} = req.body;
        const fullname = req.body.fullname ?? null;
        const email = req.body.email ?? null;
        try {
            let newPerson = await db.query(`INSERT INTO person (login, password, fullname, email)
                                            VALUES ($1, $2, $3, $4)
                                            RETURNING *`, [login, password, fullname, email]);
            res.json(newPerson.rows);
        } catch (e) {
            switch (e.code) {
                case "23502":
                    if (e.column === 'password') {
                        res.json('password field cannot be empty');
                    } else if (e.column === 'login') {
                        res.json('login field cannot be empty');
                    }
                    break;
                case '23505':
                    res.json('login already exists');
                    break;
                default:
                    res.json(e)
            }
        }
    }

    async getPersons(req, res) {
        const persons = await db.query(`SELECT *
                                        FROM person`)
        res.json(persons.rows)
    }

    async getOnePerson(req, res) {
        const id = req.params.id;
        const person = await db.query(`SELECT *
                                       FROM person
                                       WHERE person_id = $1`, [id]);
        res.json(person.rows);
    }

    async updatePerson(req, res) {
        try {
            const id = req.body.person_id;
            const person = await db.query(`SELECT *
                                           FROM person
                                           WHERE person_id = $1`, [id]);
            const login = req.body.login ?? person.rows[0].login;
            const fullname = req.body.fullname ?? person.rows[0].fullname;
            const email = req.body.email ?? person.rows[0].email;

            const updatedPerson = await db.query(`UPDATE person
                                                  set login    = $1,
                                                      fullname = $2,
                                                      email    = $3
                                                  WHERE person_id = $4
                                                  RETURNING *`, [login, fullname, email, id]);
            res.json(updatedPerson.rows[0]);
        } catch (e) {
            res.send(e);
        }
    }

    async deletePerson(req, res) {
        const person_id = req.params.id;
        try {
            const result = await db.query(`DELETE
                                           FROM person
                                           WHERE person_id = $1`, [person_id]);
            return res.json('ok');
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new PersonController();
