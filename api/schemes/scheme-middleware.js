const db = require('../../data/db-config')



module.exports = {
 /*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async  checkSchemeId (req, res, next) {
    const scheme = await db('schemes').where('scheme_id', req.params.scheme_id).first()
    if (scheme) {
      next()
    } else {
      next({ message: `scheme with scheme_id ${req.params.scheme_id} not found`})
    }
},

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
validateScheme (req, res, next) {
  if (
      !req.body.scheme_name || 
      !req.body.scheme_name.trim() || 
      typeOf(req.body.scheme_name) !== String
      ) {
    next({ message: 'invalid scheme_name'})
  } else {
    next()
  }
},

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
validateStep (req, res, next) {
  if (!req.body.instructions || 
      !req.body.instructions.trim() || 
      typeOf(req.body.instructions) !== String
      ) {
      next({ message: 'invalid step'})
  } else if (
      typeOf(req.body.step_number) !== Number ||
      req.body.step_number < 1
      ) {
      next({ message: 'invalid step'})
  } else {
    next()
  }
},

}
