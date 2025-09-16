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
      id: product._id.toString(),
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

async function getProductByIdService(productId) {
  if (!productId) throw new Error("Product ID is required");
  const product = await Product.findById(productId).lean();
  if (!product) throw new Error("Product not found");
  return product;
}

async function getSimilarProductsService(productId, limit = 4) {
  if (!productId) throw new Error("Product ID is required");
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const products = await Product.find({
    _id: { $ne: productId },
    category: product.category
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return products;
}

module.exports = { getProductsPaginated, indexProduct, getCategoriesService, getProductByIdService, getSimilarProductsService };
