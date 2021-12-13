const { Router } = require('express')
const express = require('express')
const router = express.Router()

const { index , store, show, update, destroy } = require('./TaskController')

router.route('/').get(index).post(store)
router.route('/:id').get(show).patch(update).delete(destroy)

module.exports = router