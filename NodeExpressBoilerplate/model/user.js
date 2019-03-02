exports = module.exports = function (app, mongoose) {
    'use strict';
    let Schema = mongoose.Schema;

    let UserSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        pictureUrl: {
            type: String
        }
    });
    app.db.model('User', UserSchema);
}