exports = module.exports = function (app, mongoose) {

  //All Modules
  var express = require('express');
  var router = express.Router();
  const cloudinary = require("cloudinary");
  var { SHA256 } = require('crypto-js');
  var jwt = require('jsonwebtoken');



  //Cloudnary Configuration
  cloudinary.config({
    cloud_name: app.get("cloud_name"),
    api_key: app.get("api_key"),
    api_secret: app.get("api_secret")
  });






  /* POST users listing. */
  router.post('/signup', async function (req, res, next) {
    try {

      if (!req.body.profilePicture) {
        return res.send({ success: false, message: "Please provide a image" })
      }
      if (req.body.profilePicture.path) {
        var pictureUrl = await uploadImage(req.body.profilePicture.path)
      } else {
        var pictureUrl = await uploadImage(req.body.profilePicture);
      }

      let body = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: SHA256(JSON.stringify(req.body.password)).toString()
      };
      body.pictureUrl = pictureUrl;


      let User = new app.db.models.User(body);
      let newUser = await User.save()

      res.send({
        success: true,
        data: newUser
      });

    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  });




  router.post('/signin', async function (req, res, next) {
    try {
      let UserModel = app.db.models.User;
      let hashedPassword = SHA256(JSON.stringify(req.body.password)).toString()
      let UserObj = await UserModel.findOne({ email: req.body.email, password: hashedPassword });
      if (!UserObj) {
        return res.send({ success: false, message: "email or password in not correct" });
      }

      // saveAuthToken(res, UserObj);
      res.send({ success: true, data: UserObj });

    } catch (err) {
      res.send({ success: false, message: err.message })
    }
  })




  app.use('/', router);






  //Helper Functions





  //Upload Image
  async function uploadImage(image) {
    return new Promise((resolve, reject) => {
      try {
        cloudinary.v2.uploader.upload(
          image, {
            secure: true
          },
          (err, imgData) => {
            if (err) {
              return reject(err)
            }
            console.log(imgData.secure_url)
            resolve(imgData.secure_url)
          }
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  async function saveAuthToken(res, UserObj) {
    try {

      let databaseToken = jwt.sign({ userName: UserObj.fullName, userId: UserObj._id, }, app.get('passSalt'));
      let tokenTableData = { databaseToken, fullName: UserObj.fullName, userId: UserObj._id };

      const LoggedinUser = new app.db.models.loggedinUser(tokenTableData);
      let LoggedInObj = await LoggedinUser.save();

      res.send({ success: true, data: LoggedInObj });
    } catch (err) {
      res.send({ success: false, message: err.message })
    }
  }


};