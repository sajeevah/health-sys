require("../helpers");

describe('GET /events', function() {
    it('returns a list of events', function(done) {
        request.get('/events')
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.a('array');
                done(err);
            });
    });
});

describe('GET /comments/event/:id', function() {
    it('returns list of comments', function(done) {
        var id = "597f8d7e1b9cce4107c621da";
        request.get('/comments/event/'+ id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.a('array');
                done(err);
            });
    });
});

describe('GET /heartrates/event/:id', function() {

    it('returns a hartrates by event id id', function(done) {
        var  id = '597f8d7e1b9cce4107c621da'
        request.get('/heartrates/event/' + id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.a('array');
                done(err);
            });
    });

});


describe('GET /events/publish', function() {
    it('returns a list of publish events', function(done) {
        request.get('/events/publish')
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.a('array');
                done(err);
            });
    });
});


describe('GET /events/user/:id', function() {
    it('returns a list of events by user id', function(done) {
        var  id = '597f8bd1eca8404052260bde'
        request.get('/events/user/' + id)
            .expect(200)
            .end(function(err, res) {
                res.body.should.be.a('array');
                done(err);
            });
    });
});