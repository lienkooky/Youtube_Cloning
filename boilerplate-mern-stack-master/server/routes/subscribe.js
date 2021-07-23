const express = require('express');
const router = express.Router();
const { subscriber } = require('../models/subscriber');

//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
  subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post('/subscribed', (req, res) => {
  subscriber
    .find({ userTo: req.body.userTo, userForm: req.body.userForm })
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err);
      let result = false;
      if (subscribe.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, subscirbed: result });
    });
});

router.post('/unsubscribe', (req, res) => {
  subscriber
    .findOneAndDelete({ userTo: req.body.userTo, userForm: req.body.userForm })
    .exec((err, res) => {
      if (err) return res.status(200).send({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
});

router.post('/subscribe', (req, res) => {
  const subscribe = new subscriber(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
