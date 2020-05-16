const router = require('express').Router();
const HopeDB = require('../../DB/HopeDB')

router.route('/').get(function(req, res){
    HopeDB.find(function (err, hopes){
        if (err) {
            console.log('error while fetching records');
        } else {
            res.json(hopes);
        }
    })
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    HopeDB.findById(id, function (err, hope){
        res.json(hope);
    });
});

router.route('/add').post(function (req, res){
    let HopestoPost = new HopeDB(req.body);
    HopestoPost.save()
        .then(HopestoPost => {
            res.status(200).json({ 'HopeDB': 'added successfully' });
        })
        .catch(err => {
            res.status(400).json( 'adding hope failed' + err );
        });
})

module.exports = router;