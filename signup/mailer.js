'use strict';
const SENDGRID_API_KEY = null; // add your api key here
if (!SENDGRID_API_KEY) {
    throw new Error("You didn't add a sendgrid API KEY");
}
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports.massMailer = (url_, emails, token) => {

	var url = url_.slice(0,url_.length - 5) + "register"
	for (var i = 0; i < emails.length; i++){
        const msg = {
            to: emails[i],
            from: 'hermes@whistlehq.com',
            subject: "Honor Society",
            text: "Here is your token test"+token,
            html: `<div><h1>VIAGRA</h1><a clicktracking=off href=${url}?token=${token}><img src="http://placehold.it/10x10" alt=""></a></div>`,
            trackingSettings: {
                enabled: false
            }
        };
        if(i < emails.length-1){
            sgMail.send(msg);
        } else {
            return sgMail.send(msg);
        }
    }
}

//html: '<div><p> Here is your link ' + url + '?token=' + token+ ' </p></div>',