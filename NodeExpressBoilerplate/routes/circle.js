exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    router.post('/create', async function (req, res, next) {
        try {

            let body = req.body.data;
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

            let userObj = await getUserInfo(body.ownerId);
            body.circleMembers.push(userObj);

            let CircleModel = new app.db.models.Circle(body);
            let newCirlce = await CircleModel.save();
            res.send({ success: true, data: newCirlce });
        } catch (err) {
            res.send({ success: false, message: err.message })
        }
    });

    router.post('/join', async function (req, res, next) {
        try {
            let body = req.body.data;
            if (!body.circlePassword) {
                return res.send({ success: false, message: "Please Provide CirclePassword" });
            }
            if (!body.memberId) {
                return res.send({ success: false, message: "Please Provide memberId" });
            }
            let memberToSave = await getUserInfo(body.memberId);
            let CircleObj = await checkPassword(body.circlePassword);

            saveMemberToCircle(res, memberToSave, body.circlePassword);
        } catch (err) {
            res.send({ success: false, message: err.message })
        }

    });

    router.post('/getall', async function (req, res, next) {
        try{

            let CircleModel = app.db.models.Circle;
            let CircleArray = await CircleModel.find({'circleMembers.memberId':req.body.userId});
            res.send({success:true,data:CircleArray})
        }catch(err){
            res.send({ success: false, message: err.message })
        }

    })





    app.use('/user/circle', router);


    //Helper fucntions



    //Get User info
    /**
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

    async function checkPassword(password) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(password);
                let CircleModel = app.db.models.Circle;
                let CircleObj = await CircleModel.findOne({ password: password });
                if (!CircleObj) {
                    console.log(CircleObj)
                    return reject({ message: "Password is invalid" })
                }
                resolve(CircleObj)
            } catch (err) {
                reject(err)
            }
        })
    }



    //Save Member Function 

    /**
     * @param {Object} res object to send response
     * @param {Object} memberToSave to save in member array
     * @param {String} password to get circle info
    */
    async function saveMemberToCircle(res, memberToSave, password) {
        try {

            let CircleModel = app.db.models.Circle;
            let updatedCircle = await CircleModel.findOneAndUpdate(
                { password: password, 'circleMembers.memberId': { $ne: memberToSave.memberId } },
                {
                    $push: { circleMembers: memberToSave }
                },
                { new: true }
            );
            console.log(updatedCircle);
            if (!updatedCircle) {
                return res.send({ success: false, message: "You are Already a member of this circle" });
            }
            res.send({ success: true, data: updatedCircle });
        } catch (err) {
            res.send({ success: false, message: err.message })
        }
    }

}

