const axios = require('axios');

const API_URL_MLA = 'https://api.mercadolibre.com/sites/MLA/';
const API_URL_ITEMS = 'https://api.mercadolibre.com/items/';

const { ProductsModel, ProductModel } = require('../models/product');

const products = async (req, res) => {
  if (req.query.search) {
    const response = await axios.get(`${API_URL_MLA}search?q=${req.query.search}`);
    const data = await response.data;
    return res.status(200).json(ProductsModel(data));
  }

  return res.status(404).json({ msg: 'Search Param not informed' });
};

const product = async (req, res) => {
  if (req.params.id) {
    const resItem = await axios.get(`${API_URL_ITEMS}${req.params.id}`);
    const item = await resItem.data;

    const resDesc = await axios.get(`${API_URL_ITEMS}${req.params.id}/descriptions`);
    const desc = await resDesc.data;

    return res.status(200).json(ProductModel(item, desc));
  }

  return res.status(404).json({ msg: 'Id Param not informed' });
};

module.exports = { products, product };
