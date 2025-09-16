const { getProductsPaginated, indexProduct, getCategoriesService, getProductByIdService } = require('../services/productService');
const esClient = require('../configs/elasticsearch');
const Product = require('../models/product');


async function listProducts(req, res) {
    try {
        // Reindex products if needed
        // Xóa index cũ (nếu cần)
        await esClient.indices.delete({ index: 'products' }, { ignore: [404] });
        const products = await Product.find();
        for (const p of products) {
            await indexProduct(p);
        }
        console.log("Reindexed all products into Elasticsearch");

        const { category, page = 1, limit = 12 } = req.query;
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, parseInt(limit, 10) || 12);

        const { items, totalItems } = await getProductsPaginated({
            category,
            page: pageNum,
            limit: limitNum
        });

        const totalPages = Math.ceil(totalItems / limitNum);

        res.json({
            products: items,
            page: pageNum,
            limit: limitNum,
            totalPages,
            totalItems
        });
    } catch (err) {
        console.error('listProducts error', err);
        res.status(500).json({ message: 'Server error' });
    }
}


async function reindexAllProducts(req, res) {
  try {
    const products = await Product.find();
    for (const p of products) {
      await indexProduct(p);
    }
    res.json({ message: "Reindexed all products into Elasticsearch" });
  } catch (err) {
    console.error("Reindex error", err);
    res.status(500).json({ message: "Reindex failed" });
  }
}

async function searchProducts(req, res) {
    try {
       const { keyword, category, minPrice, maxPrice, discount, minViews, page = 1, limit = 12 } = req.query;

        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, parseInt(limit, 10) || 12);
        const from = (pageNum - 1) * limitNum;

        const mustQuery = [];

        // Fuzzy Search theo tên
        if (keyword) {
            mustQuery.push({
                match: {
                    name: {
                        query: keyword,
                        fuzziness: "AUTO"
                    }
                }
            });
        }

        // Lọc theo danh mục
        if (category && category !== 'all') {
            mustQuery.push({
                match: { category }
            });
        }

        // Lọc theo khoảng giá
        if (minPrice || maxPrice) {
            const range = {};
            if (minPrice) range.gte = parseFloat(minPrice);
            if (maxPrice) range.lte = parseFloat(maxPrice);
            mustQuery.push({ range: { price: range } });
        }

        // // Lọc theo giảm giá
        // if (discount) {
        //     mustQuery.push({
        //         range: { discount: { gte: parseFloat(discount) } }
        //     });
        // }

        // // Lọc theo số lượt xem
        // if (minViews) {
        //     mustQuery.push({
        //         range: { views: { gte: parseInt(minViews) } }
        //     });
        // }

        // Nếu không có filter nào -> lấy tất cả
        const queryBody = mustQuery.length > 0
            ? { bool: { must: mustQuery } }
            : { match_all: {} };

        const result = await esClient.search({
            index: "products",
            body: {
                query: queryBody,
                from,
                size: limitNum,
                
            }
        });

        const products = result.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));

        console.log("Search filters:", { keyword, category, minPrice, maxPrice, discount, minViews });
        console.log("Search result:", products);

        res.json({
            products,
            page: pageNum,
            limit: limitNum,
            totalItems: result.hits.total.value,
            totalPages: Math.ceil(result.hits.total.value / limitNum)
        });
    } catch (err) {
        console.error('searchProducts error', err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getCategories(req, res) {
    try {
        const categories = await getCategoriesService();
        res.json(categories);
    } catch (err) {
        console.error('getCategories error', err);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await getProductByIdService(id);

        // Tang views
        product.views = (product.views || 0) + 1;
        await Product.findByIdAndUpdate(id, { views: product.views });

        res.json(product);
    } catch (err) {
        console.error('getProductById error', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { listProducts, searchProducts, reindexAllProducts, getCategories, getProductById };
