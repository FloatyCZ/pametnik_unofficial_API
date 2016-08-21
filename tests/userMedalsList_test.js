
const userMedalsList = require('./../app/userMedalsList');
const assert = require('assert');
const fs = require('fs');

const token = "token";
const httpHandlerMock = (url, path, data, token, callback) => {
    fs.readFile('./tests/evidence-medaili.html', 'utf8', (err, data) => {
        callback(err, data);
    });
};

const expected = [{
    "name": "Šumava - rozhledna Boubín",
    "id": "235",
    "designs": ["1"]
},
{
    "name": "Bakov nad Jizerou - Restaurace Letadlo",
    "id": "268",
    "designs": ["1"]
}]

describe('UserMedalsList', () => {
    describe('Send http request', () => {
        it('should handle response', (done) => {
            userMedalsList(httpHandlerMock, token, (err, result) => {
                assert.deepEqual(result, expected);
                done(err);
            });
        });
    });
});