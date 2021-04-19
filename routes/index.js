const router = require('express').Router()

router.use('/api', require('./noteRoutes'))
router.use('/api', require('./viewRoutes'))

module.exports = router