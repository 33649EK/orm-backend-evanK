const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id']
        }
      ]
    });

    if (tags.length === 0) {
      res.status(404).json({ message: 'No tags found' });
      return;
    }

    res.status(200).json(tags);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data\
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id']
        }
      ]
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    if (!newTag) {
      res.status(500).json({ message: 'Tag not created!' });
      return;
    }

    res.status(200).json({ message: 'Tag created!' })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' })
      return;
    }

    const updatedTag = await tag.update(req.body);

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
