const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const router = require('express').Router();
const can = require('@pdc/shared/middlewares/can');
const { apiUrl } = require('@pdc/shared/helpers/url/url')(process.env.APP_URL, process.env.API_URL);
const applications = require('./applicationhttp');
const operatorService = require('../operator');

// add sub routes
router.use('/applications', applications);

/**
 * List all operators with a minimal set of data
 */
router.get('/dropdown', can('operator.dropdown'), async (req, res, next) => {
  try {
    let { query } = req;

    /**
     * Filter by authorised aom ids
     */
    if (req.user.aom) {
      query = { ...query, 'authorisations._id': ObjectId(req.user.aom) };
    }

    const results = await operatorService.find(query);
    results.data = results.data.map((r) => _.pick(r, ['_id', 'nom_commercial']));

    res.json(results);
  } catch (e) {
    next(e);
  }
});

/**
 * Add a user to an operator
 */
router.post('/:id/authorisations/add', can('operator.authorisations.add'), async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await operatorService.addAuthorisations(req.params.id, req.body.orgId, req.body.orgType));
  } catch (e) {
    next(e);
  }
});

/**
 * Remove a user to an operator
 */
router.post('/:id/authorisations/remove', can('operator.authorisations.remove'), async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await operatorService.removeAuthorisations(req.params.id, req.body.orgId, req.body.orgType));
  } catch (e) {
    next(e);
  }
});

/**
 * List all authorisations from an operator
 */
router.get('/:id/authorisations', can('operator.authorisations.list'), async (req, res, next) => {
  try {
    res.json(await operatorService.authorisations(req.params.id));
  } catch (e) {
    next(e);
  }
});

/**
 * Add a user to an operator
 */
router.post('/:id/users/add', can('operator.users.add'), async (req, res, next) => {
  try {
    res.json(await operatorService.addUser(req.params.id, req.body.user));
  } catch (e) {
    next(e);
  }
});

/**
 * Remove a user to an operator
 */
router.post('/:id/users/remove', can('operator.users.remove'), async (req, res, next) => {
  try {
    res.json(await operatorService.removeUser(req.params.id, req.body.user));
  } catch (e) {
    next(e);
  }
});

/**
 * List all users from an operator
 */
router.get('/:id/users', can('operator.users.list'), async (req, res, next) => {
  try {
    res.json(await operatorService.users(req.params.id));
  } catch (e) {
    next(e);
  }
});

/**
 * get an Operator by ID
 */
router.get('/:id', can('operator.read'), async (req, res, next) => {
  try {
    res.json(await operatorService.find({ _id: req.params.id }));
  } catch (e) {
    next(e);
  }
});

/**
 * update an Operator by ID
 */
router.put('/:id', can('operator.update'), async (req, res, next) => {
  try {
    res.json(await operatorService.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
});

/**
 * Soft delete or force delete an Operator
 */
router.delete('/:id', can('operator.delete'), async (req, res, next) => {
  try {
    res.json({
      id: req.params.id,
      deleted: !!(await operatorService.delete(req.params.id)),
    });
  } catch (e) {
    next(e);
  }
});

/**
 * List all Operators
 */
router.get('/', can('operator.list'), async (req, res, next) => {
  try {
    res.json(await operatorService.find(req.query));
  } catch (e) {
    next(e);
  }
});

/**
 * Create a new Operator
 */
router.post('/', can('operator.create'), async (req, res, next) => {
  try {
    const operator = await operatorService.create(req.body);

    res
      .set('Location', apiUrl(`operators/${operator._id.toString()}`))
      .status(201)
      .json(operator);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
