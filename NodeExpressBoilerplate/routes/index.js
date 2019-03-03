exports = module.exports = function (app, mongoose) {

  //All The Middlewares
  require('./authMiddleware')(app, mongoose);
  // app.use("/user", app.userAuthMiddleware);

  //All Routes
  require('./users')(app, mongoose);
  require('./home')(app, mongoose);
  require('./circle')(app, mongoose);
  require('./invite')(app, mongoose);

};
