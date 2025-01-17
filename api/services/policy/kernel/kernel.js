const { ObjectId } = require('mongoose').Types;
const moment = require('moment');
const Trip = require('@pdc/service-trip/entities/models/trip');
const Campaign = require('../entities/models/campaign');
const processTripCampaign = require('./process/tripCampaign');

module.exports = {
  async processTrip(trip, callback) {
    // select campaign then process trip
    const aoms = trip.aom.map(tripAom => ObjectId(tripAom._id));

    const campaigns = await Campaign.find({
      aom: {
        $in: aoms,
      },
      start: {
        $lte: trip.start,
      },
      end: {
        $gte: trip.start,
      },
      status: 'active',
    }).exec();

    let incentives = [];
    campaigns.forEach((campaign) => {
      incentives = [...incentives, ...processTripCampaign({ trip, campaign }, callback)];
    });

    return incentives;
  },
  async processCampaign(campaign, callback) {
    // select trips the process campaign
    const campaignStart = moment(campaign.start);
    const campaignEnd = moment(campaign.end);

    const request = {
      'aom._id': ObjectId(campaign.aom),
      start: {
        $gte: campaignStart.toDate(),
        $lte: campaignEnd.toDate(),
      },
      status: 'active',
    };

    const trips = await Trip.find(request).exec();

    let incentives = [];
    trips.forEach((trip) => {
      incentives = [
        ...incentives,
        ...processTripCampaign({ trip: trip.toObject(), campaign }, callback),
      ];
    });

    return incentives;
  },
};
