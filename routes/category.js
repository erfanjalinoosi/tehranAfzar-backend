const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
    try {

        const result = []

        const categories = await Category.find({
            parent: {
                $exists: false
            }
        }).exec();

        for (const category of categories) {
            result.push({
                _id: category._id,
                title: category.title,
                slug: category.slug,
                children: await findCategoryChildren(category._id)
            })
        }

        res.send({
            message: "Categories indexed successfully.",
            date: result
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});

const findCategoryChildren = async (categoryId) => {

    const result = []

    const categories = await Category.find({
        parent: categoryId
    }).exec();

    for (const category of categories) {
        result.push({
            _id: category._id,
            title: category.title,
            slug: category.slug,
            children: await findCategoryChildren(category.id)
        })
    }

    return result
}

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id
        });

        if (!category) {
            throw new Error("Category not found.")
        }

        res.send({
            message: "Category find successfully.",
            data: category
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});


module.exports = router;
