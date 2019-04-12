const modelFactory = require('@pdc/shared/packages/mongo/model-factory');
const TripSchema = require('../../entities/schemas/trip');

module.exports = modelFactory('Trip', {
  schema: TripSchema,
});
