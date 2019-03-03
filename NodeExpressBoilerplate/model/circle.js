exports = module.exports = function (app, mongoose) {
    'use strict';
    let Schema = mongoose.Schema;

    let Members = new Schema({
        memberName: {
            type: String,
            required: true
        },
        memberId: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        logitude: {
            type: String,
            required: true
        },
        pictureUrl: {
            type: String,
            required: true
        }
    })






    let Circle = new Schema({
        ownerId: {
            type: String,
            required: true
        },
        ownerName: {
            type: String,
            required: true
        },
        circleName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        circleMembers: [Members]

    });
    app.db.model('Circle', Circle);
}