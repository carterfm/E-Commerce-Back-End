const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });

    if (!tagData) {
      return res.status(404).json({ message: 'No tag found with that id!'});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//I was having a hard time figuring out what to do for the post and put request here, so I just
//went ahead and cannibalized the starter code from product-routes--hence the use of .then 
//rather than async and await

router.post('/', (req, res) => {
  // create a new tag
    /* req.body should look like this...
    {
      product_name: "yellow",
      productIds: [1, 2, 3, 4]
    }
  */
    Tag.create(req.body)
      .then(tag => { 
        if (req.body.productIds.length) {
          const tagProductIdArr = req.body.productIds.map(product_id => {
            return {
              tag_id: tag.id,
              product_id
            };
          });
          return ProductTag.bulkCreate(tagProductIdArr);
        }
        res.status(200).json(tag);
      })
      .then(tagProductIds => res.status(200).json(tagProductIds))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(tag => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then(productTags => {
      // get list of current product_ids
      const tagProductIds = productTags.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newProductTags = req.body.productIds
        .filter(product_id => !tagProductIds.includes(product_id))
        .map(product_id => {
          return {
            tag_id: req.params.id,
            product_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then(updatedProductTags => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      return res.status(404).json({ message: 'No product found with that id!' });
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
