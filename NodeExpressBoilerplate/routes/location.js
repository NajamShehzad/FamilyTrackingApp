exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    router.post('/update', async function (req, res, next) {
        try {
            let CircleModel = app.db.models.Circle;
            let newobj = await CircleModel.findOneAndUpdate(
                { _id: req.body.circleId, "circleMembers.memberId": req.body.memberId },
                { $set: { "circleMembers.$.latitude": req.body.latitude, "circleMembers.$.longitude": req.body.longitude } },
                { new: true }
            );
            // console.log(newobj)

            res.send({
                success: true,
                message: "Location Update Succesfully"
            });
            app.io.emit(req.body.circleId,
                {
                    memberId: req.body.memberId,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                }
            );

        } catch (err) {
            console.log(err);
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    app.use('/user/location', router);

}

