exports = module.exports = function (app, mongoose) {
    require('./user')(app, mongoose);
    require('./circle')(app, mongoose);
}