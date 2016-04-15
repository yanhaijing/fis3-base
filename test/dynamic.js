module.exports = function(req, res, next) {    
    if (req['query']['yan'] == 123) {
        res.sendFile(__dirname + '/test.json', function(err) {
            if (err) {
                res.status(err.status).end();
            }
            res.end();
        });
    } else {
        res.end();
    }
};
