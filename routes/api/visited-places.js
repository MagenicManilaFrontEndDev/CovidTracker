const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const VisitedPlace = require('../../models/VisitedPlace');

// @route   GET api/visited-places
// @desc    Get all posts
router.get('/', async (req, res) => {
    try {
        const visitedPlaces = await VisitedPlace.find().sort({ date: -1 });
        res.json(visitedPlaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/visited-places/:id
// @desc    Get visited place by Id
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const visitedPlace = await VisitedPlace.findById(req.params.id);

        if (!visitedPlace) {
            return res.status(404).json({ msg: 'Record not found.' });
        }

        res.json(visitedPlace);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Record not found.' });
        }

        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/visited-places
// @desc    Add new visited place
router.post(
    '/',
    [
        check('place', 'Place is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('hours', 'Hours is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newVisitedPlace = new VisitedPlace({
                place: req.body.place,
                date: req.body.date,
                hours: req.body.hours,
                isCrowded: req.body.isCrowded,
            });

            await newVisitedPlace.save();

            return res.json(newVisitedPlace);
        } catch (err) {
            console.error(err.message);

            res.status(500).send('Server error');
        }
    }
);

// @route   DELETE api/visited-places
// @desc    Delete by Id
router.delete('/:id', async (req, res) => {
    try {
        const visitedPlace = await VisitedPlace.findById(req.params.id);

        if (!visitedPlace) {
            return res.status(404).json({ msg: 'Record not found.' });
        }

        await visitedPlace.remove();

        res.json({ msg: 'Visited place removed' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Visited place not found.' });
        }

        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/visited-places/:id
// @desc    Update visited place
router.put(
    '/:id',
    [
        check('place', 'Place is required').not().isEmpty(),
        check('date', 'Date is required').not().isEmpty(),
        check('hours', 'Hours is required').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const { place, date, hours, isCrowded } = req.body;

            const visitedPlace = await VisitedPlace.findById(req.params.id);

            if (!visitedPlace) {
                return res
                    .status(404)
                    .json({ msg: 'Visited place not found.' });
            }

            if (place) visitedPlace.place = place;
            if (date) visitedPlace.date = date;
            if (hours) visitedPlace.hours = hours;
            if (isCrowded) visitedPlace.isCrowded = isCrowded;

            await visitedPlace.save();

            res.json(visitedPlace);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
