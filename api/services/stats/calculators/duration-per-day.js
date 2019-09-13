module.exports = {
  durationPerDay({ aom = null, startDate = '2019-01-01T00:00:00Z' }) {
    const $match = {
      'passenger.start.datetime': { $gte: startDate, $lt: new Date() },
    };
    if (aom) $match['aom._id'] = aom;

    const args = [
      {
        $match,
      },
      {
        $project: {
          year: { $year: '$passenger.start.datetime' },
          month: { $month: '$passenger.start.datetime' },
          day: { $dayOfMonth: '$passenger.start.datetime' },
          duration: { $max: ['$passenger.duration', '$passenger.calc_duration'] },
        },
      },
      {
        $group: {
          _id: {
            name: 'duration_per_day',
            year: '$year',
            month: '$month',
            day: '$day',
          },
          total: { $sum: '$duration' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1,
        },
      },
    ];

    return {
      collection: 'journeys',
      commands: [
        {
          args,
          command: 'aggregate',
        },
        {
          command: 'toArray',
        },
      ],
    };
  },
};