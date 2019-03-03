exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    router.post('/create', async function (req, res, next) {
        try {

            let body = req.body;
            if (!body.ownerId) {
                return res.send({ success: false, message: "Please Provide OwnerId" });
            }
            if (!body.ownerName) {
                return res.send({ success: false, message: "Please Provide ownerName" });
            }
            if (!body.circleName) {
                return res.send({ success: false, message: "Please Provide circleName" });
            }
            if (!body.password) {
                return res.send({ success: false, message: "Please Provide password" });
            }
            body.circleMembers = [];

            //Getting User info
            let userObj = await getUserInfo(body.ownerId);
            body.circleMembers.push(userObj);
            //Saving new Cirlce
            let CircleModel = new app.db.models.Circle(body);
            let newCirlce = await CircleModel.save();
            res.send({ success: true, data: newCirlce });
        } catch (err) {
            res.send({ success: false, message: err.message })
        }
    });

    router.post('/join', async function (req, res, next) {
        try {
            let body = req.body;
            if (!body.circlePassword) {
                return res.send({ success: false, message: "Please Provide CirclePassword" });
            }
            if (!body.memberId) {
                return res.send({ success: false, message: "Please Provide memberId" });
            }
            let memberToSave = await getUserInfo(body.memberId);

            let CircleModel = app.db.models.Circle;

            let CircleObj = await CircleModel.findOneAndUpdate(
                { password: body.circlePassword },
                {
                    $push: { circleMembers: memberToSave }
                },
                { new: true }
            );
            console.log(CircleObj);
            if (!CircleObj) {
                return res.send({ success: false, message: "Provided Password is invalid" });
            }

            res.send({ success: true, data: CircleObj });

        } catch (err) {
            res.send({ success: false, message: err.message })
        }

    })





    app.use('/circle', router);


    //Helper fucntions




    /**
     * 
     * @param {String} userId ownerId to get his/her info
     */
    async function getUserInfo(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                let UserModel = app.db.models.User;
                let userObj = await UserModel.findOne({ _id: userId });
                if (!userObj) {
                    return reject({ message: "Check userId no record found" });
                }
                let userToSave = {
                    memberName: userObj.fullName,
                    memberId: userObj._id,
                    latitude: userObj.latitude,
                    logitude: userObj.logitude,
                    pictureUrl: userObj.pictureUrl
                }
                resolve(userToSave);
            } catch (err) {
                reject(err)
            }
        })
    }





}

