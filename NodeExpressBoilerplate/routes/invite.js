exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const { Expo } = require('expo-server-sdk');


    //Sand Grid API
    const sgMail = require('@sendgrid/mail');
    let sendgrid_apikey = app.get('sendgrid_api_key');
    sgMail.setApiKey(sendgrid_apikey);
    let fromName = "Tracking App";
    let fromEmail = "invites@tracking.com";


    router.post('/send', async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let CircleModel = app.db.models.Circle;
            let UserObj = await UserModel.findOne({ email: req.body.email });
            if (!UserObj) {
                return res.send({ success: false, message: "No record found please check the email address" });
            }
            let CircleObj = await CircleModel.findOne({ _id: req.body.circleId })
            if (!CircleObj) {
                return res.send({ success: false, message: "No record found please check the circle Id" });
            }
            sendNotification(UserObj, CircleObj, req.body.senderName);
            sendEmail(UserObj, CircleModel, req.body.senderName);
            res.send({ success: true, message: "Invitation Send" })
        } catch (err) {
            res.send({ success: false, message: err.message })
        }

    });

    app.use('/user/invite', router);


    async function sendNotification(UserObj, CircleObj, senderName) {
        let messages = [];
        messages.push({
            to: UserObj.expoToken,
            sound: 'default',
            body: `${senderName} invites you to join his/her cirlce ${CircleObj.circleName} use this ${CircleObj.password} password to join this circle `
        });
        if (messages.length) {
            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
                // Send the chunks to the Expo push notification service. There are
                // different strategies you could use. A simple one is to send one chunk at a
                // time, which nicely spreads the load out over time:
                for (let chunk of chunks) {
                    try {
                        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                        console.log(ticketChunk);
                        tickets.push(...ticketChunk);
                        // NOTE: If a ticket contains an error code in ticket.details.error, you
                        // must handle it appropriately. The error codes are listed in the Expo
                        // documentation:
                        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                    } catch (error) {
                        console.error(error);
                    }
                }
            })();
        }

    }




    function sendEmail(UserObj, CircleObj, senderName) {
        const template = `
            <div>
                <div><h1>Tracking App</h1></div>
                <div>
                    <h3>Invitation</h3>
                    <p>
                        Hi ${UserObj.fullName} <br/>
                        ${senderName} invites you to join his/her circle on tracking app <br/>
                        please use "${CircleObj.password}" this password to join ${CircleObj.circleName} cirlce
                    <p/>
                </div>
            </div>
        
        `

        const emailContent = {
            to: UserObj.email,
            from: { email: fromEmail, name: fromName },
            subject: "Tracking App Invitation",
            html: template
        };
        sgMail.send(emailContent).then((data) => {
            app.logLevel1(`Email Sent to ${UserObj.email}`, "");
        })
    }


}

