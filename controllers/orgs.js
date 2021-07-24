const Org = require('../models/orgs')

module.exports = (app) => {
  app.get('/', (req, res) => {
    var currentUser = req.user

    Org
      .find({})
      .then(orgs => {
        res.render('orgs-index', { orgs, currentUser })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  app.get('/orgs/new', (req, res) => {
    var currentUser = req.user

    res.render('orgs-new', { currentUser })
  })

  app.post('/orgs/new', (req, res) => {
    var currentUser = req.user

    if (req.user) {
      var org = new Org(req.body)

      org
        .save()
        .then(org => {
          res.redirect(`/orgs/${org._id}`, { currentUser })
        })
        .catch(err => {
          console.log(err.message)
        })
    } else {
      return res.status(401)
    }
  })

  app.get('/orgs/:id', (req, res) => {
    var currentUser = req.user

    Org
      .findById(req.params.id)
      .then(org => {
        res.render('orgs-show', { org, currentUser })
      })
      .catch(err => {
        console.log(err.message)
      })
  })
}