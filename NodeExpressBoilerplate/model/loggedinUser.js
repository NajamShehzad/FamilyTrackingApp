exports = module.exports = function (app, mongoose) {

    'use strict';
    var Schema = mongoose.Schema;
    const loggedinUser = new Schema({
        databaseToken: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    });


    app.db.model('loggedinUser', loggedinUser);

}