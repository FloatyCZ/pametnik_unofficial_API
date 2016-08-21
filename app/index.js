
'use strict';

const httpHandler = require('./httpHandler');

exports.userMedalsList = (event, context, callback) => {
    const userMedalsList = require('./userMedalsList');
    userMedalsList(httpHandler, event.token, callback);
};