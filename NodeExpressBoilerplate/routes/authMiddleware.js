exports = module.exports = function (app, mongoose) {

    
    app.userAuthMiddleware = function (req, res, next) {

        console.log("auth middle ware =====>>>>>")

        const LoggedinUser = app.db.models.loggedinUser;
        // console.log(req.body);


        LoggedinUser.findOne({ databaseToken: req.body.databaseToken }).then(userToken => {
            if (!userToken) {
                return res.send({ sucess: false, message: "Unauthorize access please login and try again " })
            } else {
                req.userId = userToken.userId;
                req.fullName = userToken.fullName;
                next();
            }
        }).catch(err => {
            return res.send({ sucess: false, message: err.message })
        })


    }


}

