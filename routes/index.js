const path = require("path");
const router = require('express').Router();

// about page
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

// if no routes are hit, go to index
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../views'));
});

module.exports = router;