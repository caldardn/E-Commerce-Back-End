const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const allTags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });

    if(allTags.length === 0){
      res.status(404).json({message: 'No tags found!'});
      return;
    }

    res.json(allTags);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagFind = await Tag.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if(!tagFind){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.json(tagFind);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{

    const tagNew = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.json(tagNew);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
   const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!tagUpdate){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.json(tagUpdate);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{

    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagDelete){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.json(tagDelete);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
