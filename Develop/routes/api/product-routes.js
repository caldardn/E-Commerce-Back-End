const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
try {
    const allProducts = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name']
        }
      ]
    });
    
    if (allProducts.length === 0) {
      res.status(404).json({ message: 'No products found' });
      return;
    }

    res.json(allProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const dbProductData = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name']
        }
      ]
    });

    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }

    res.json(dbProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const product = await Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tagIds: req.body.tagIds
      });
  
      if (req.body.tagIds && req.body.tagIds.length) {
        const prodTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
  
        await ProductTag.bulkCreate(prodTagIdArr);
      }
  
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id);

    return res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{

    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!productData){
      res.status(404).json({message: 'No product found with this id!'});
      return;
    }
    res.status(200).json(productData);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
