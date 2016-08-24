
const http = require("http");

module.exports = (url, path, data, token, callback) => {
    var options = {
        hostname: url,
        path: path,
        method: 'post',
        port: 80,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'Cookie': 'PHPSESSID=' + token
        }
    };

    var request = http.request(options, (response) => {
        var rawHtml = '';
        response.on('data', (chunk) => {
            rawHtml += chunk;
        });
        response.on('end', () => {
            console.log(rawHtml);
            callback(null, rawHtml);
        });
    });

    request.write(data);
    request.end();
};
