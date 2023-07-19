const dataCollection = require('../db').collection("data");
const flash = require('connect-flash')
const bcrypt = require('bcrypt')

exports.login = async function(req, res) {
  const passwordDocument = await dataCollection.findOne({ password: { $exists: true, $ne: null } });
  console.log(passwordDocument);

  if (passwordDocument && passwordDocument.password) {
    const password = passwordDocument.password;
    const tryPassword = req.body.passTry;

    if (bcrypt.compareSync(tryPassword, password)) {
      res.redirect('/admin/posts');
    } else {
      req.flash('errors', 'You are not allowed to access this resource.');
      res.render('admin-login', {err: req.flash('errors')}); // Redirect to the login page with the error message
    }
  } else {
    console.error('Error: Password document not found');
    res.status(500).send('Internal Server Error');
  }
};

exports.changepassword = async function(req, res) {
  console.log('4')
  const passwordDocument = await dataCollection.findOne({ password: { $exists: true, $ne: null } })
  const oldPassword = passwordDocument.password
  const oldPasswordtry = req.body.old
  if (oldPassword == oldPasswordtry) {
    console.log('passed 1st if')
    const newPassword = req.body.new
    const confirmNewPassword = req.body.confirm
    if (newPassword == confirmNewPassword) {
      console.log('passed 2nd if')
      const salt = bcrypt.genSaltSync(10)
      console.log('3')
      const hashedNewPassword = bcrypt.hashSync(newPassword, salt)
      console.log('2')
      await dataCollection.updateOne(passwordDocument, {$set: {password: hashedNewPassword}})
      console.log('1')
      res.redirect('/admin/posts')
    } else {
      req.flash('New Password Fields do not Match')
    }
  } else {
    req.flash('Incorrect Old Password')
  }
}