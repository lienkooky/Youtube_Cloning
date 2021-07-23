const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { subscriber };
