exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    router.post('/updatelocation', async function (req, res, next) {
        try {
            let CircleModel = app.db.models.Circle;
            let newobj = await CircleModel.updateMany(
                { "circleMembers.memberId": req.body.memberId },
                { $set: { "circleMembers.$.latitude": "954786321", "circleMembers.$.longitude": "754786321" } },
                { new: true }
            );
            console.log(newobj)

        } catch (err) {
            console.log(err);
        }
    });

    app.use('/user/location', router);

}

