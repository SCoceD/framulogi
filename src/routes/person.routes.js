const express = require('express');
const router = express.Router();
const personController = require('../controller/person.controller');

router.post('/person', personController.createPerson);
router.get('/persons', personController.getPersons);
router.get('/person/:id', personController.getOnePerson);
router.put('/person', personController.updatePerson);
router.delete('/person/:id', personController.deletePerson);

module.exports = router;
