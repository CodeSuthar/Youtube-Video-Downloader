const express = require('express')
const HomeRouter = express.Router()

HomeRouter.get
('', async(req ,res) => {
  res.render('home.ejs', {
    req: req
  })
})
module.exports = HomeRouter;