exports = module.exports = function (app, mongoose) {

  //All Modules
  var express = require('express');
  var router = express.Router();
  const cloudinary = require("cloudinary");
  var {
    SHA256
  } = require('crypto-js');


  //Cloudnary Configuration
  cloudinary.config({
    cloud_name: app.get("cloud_name"),
    api_key: app.get("api_key"),
    api_secret: app.get("api_secret")
  });






  /* POST users listing. */
  router.post('/signup', async function (req, res, next) {
    try {
      let body = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: SHA256(JSON.stringify(req.body.password)).toString(),
        pictureUrl: await uploadImage(req.body.profilePicture.path)
      };

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

  app.use('/users', router);






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




};