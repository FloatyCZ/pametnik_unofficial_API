
const htmlParser = require("htmlparser2");
const select = require('soupselect').select;

var processDom = (err, dom) => {
    var result = [];
    if (err) {
        return console.log(err);
    } else {
        select(dom, ".medal-item").forEach((medalElement) => {
            var resultItem = {};
            resultItem.name = medalElement.children[0].data;
            const tdWithId = medalElement.parent.next.next;
            resultItem.id = tdWithId.children[0].data;
            resultItem.designs = [];
            select(tdWithId.next.next, ".evidence_box").forEach((element) => {
                resultItem.designs.push(element.attribs.value);
            });
            result.push(resultItem);
        });
        return result;
    }
};

module.exports = (httpHandler, token, callback) => {
    const data = "";

    const processData = (err, rawHtml) => {
        const handler = new htmlParser.DomHandler((err, dom) => {
            callback(null, processDom(err, dom));
        });
        const parser = new htmlParser.Parser(handler);
        parser.write(rawHtml);
        parser.done();
    };

    httpHandler(
        'www.pametnik.cz',
         '/evidence-medaili',
          data,
          token,
          processData
    );

}
