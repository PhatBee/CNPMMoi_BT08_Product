const Product = require('../models/product');
const esClient = require('../configs/elasticsearch');

async function getProductsPaginated({ category, page = 1, limit = 12 }) {
  const skip = (Math.max(1, page) - 1) * limit;
  const filter = {};
  if (category && category !== 'all') filter.category = category;

  // Parallel: fetch items + count
  const [items, totalItems] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Product.countDocuments(filter)
  ]);

  return {
    items,
    totalItems
  };
}

async function indexProduct(product) {
  await esClient.index({
    index: "products",
    id: product._id.toString(),
    body: {
      name: product.name,
      category: product.category,
      price: product.price,
      discount: product.discount,
      views: product.views,
      image: product.image
    },
  });
}

async function getCategoriesService() {
  const categories = await Product.distinct('category');
  return categories;
}

module.exports = { getProductsPaginated, indexProduct, getCategoriesService };
