const CatModel = cats => cats.values.map(cat => cat.name);

const PriceModel = item => {
  return {
    currency: item.currency_id,
    amount: Math.trunc(item.price),
    decimals: item.price
      .toFixed(2)
      .replace('.', '')
      .replace(Math.trunc(item.price), '')
  };
};

const ItemsModel = items =>
  items.map(item => {
    // Price
    const price = PriceModel(item);

    return {
      id: item.id,
      title: item.title,
      price,
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      city_from: item.address.state_name || '',
    };
  });

const ProductsModel = data => {
  // Categories
  const catFilter = data.filters.filter(filter => filter.id === 'category')[0];
  const categories = catFilter && CatModel(catFilter);

  // Items
  const itemsFilter = data.results.slice(0, 4);
  const items = itemsFilter && ItemsModel(itemsFilter);

  return {
    author: {
      name: 'Renan',
      lastname: 'Garcia',
    },
    categories,
    items,
  };
};

const ProductModel = (item, desc) => {
  const price = PriceModel(item);

  return {
    author: {
      name: 'Renan',
      lastname: 'Garcia',
    },
    item: {
      id: item.id,
      title: item.title,
      price,
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: desc[0].plain_text || '',
    },
  };
};

module.exports = { CatModel, PriceModel, ItemsModel, ProductsModel, ProductModel };
