const { Router } = require('express');
const { NotFound } = require('http-errors');

const { products, product } = require('../controllers/products');

const router = Router();

//
// ─── API ROUTES ──────────────────────────────────────────────────────
//
router.get('/', (req, res) => res.status(200).send('Mercado Livre Middleware API'));

router.get('/api/items', (req, res) => products(req, res));
router.get('/api/items/:id', (req, res) => product(req, res));

//
// ─── 404 ERROR HANDLING ───────────────────────────────────────────────────────────────
//
router.use((req, res, next) => {
  const err = new NotFound('This route does not exist.');

  next(err);
});

module.exports = router;
