const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });
    
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id` and include associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    // Create a new product
    const product = await Product.create(req.body);
    
    // If there are tagIds provided, create ProductTag associations
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tagId) => {
        return {
          product_id: product.id,
          tag_id: tagId,
        };
      });
      
      await ProductTag.bulkCreate(productTagIdArr);
    }
    
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // Update a product by its `id` value
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (updatedProduct[0] === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    // If there are tagIds provided, update the ProductTag associations
    if (req.body.tagIds && req.body.tagIds.length) {
      // Get the current ProductTag associations
      const currentProductTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      
      const currentTagIds = currentProductTags.map((productTag) => productTag.tag_id);
      const newTagIds = req.body.tagIds;
      
      const productTagsToRemove = currentProductTags.filter(
        (productTag) => !newTagIds.includes(productTag.tag_id)
      );
      
      const productTagsToAdd = newTagIds.filter(
        (tagId) => !currentTagIds.includes(tagId)
      ).map((tagId) => {
        return {
          product_id: req.params.id,
          tag_id: tagId,
        };
      });
      
      // Remove existing ProductTag associations
      await ProductTag.destroy({
        where: { id: productTagsToRemove.map((productTag) => productTag.id) },
      });
      
      // Add new ProductTag associations
      await ProductTag.bulkCreate(productTagsToAdd);
    }
    
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a product by its `id` value
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

