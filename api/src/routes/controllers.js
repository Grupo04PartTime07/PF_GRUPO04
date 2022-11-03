const axios = require('axios');
const { Products, Categories, Brand, Promotion, Score } = require('../db');


const getProductsDb = async () => {
    try {
        let products = await Products.findAll({
            include: [
                {
                    model: Categories,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    }, where: { isDeleted: false }

                },

                {
                    model: Brand,
                    attributes: ["name"],  where: { isDeleted: false }
                },

                {
                    model: Promotion,
                    attributes: ["option"],  where: { isDeleted: false }

                },

            ],

        })
        let response = products.map(p => {
            let categories = p.categories.map(e => e.name)
            return { id: p.id, name: p.name, price: p.price, description: p.description, image: p.image, categories, stock: p.stock, score: p.score_promedio, brand: p.brand.name }
        })
        return response;

    } catch (e) {
        console.log(e)
    }
};

const getCategoriesDb = async () => {
    try {

        let categories = await Categories.findAll({
            attributes: ['name', 'image', 'id']
        });

        //let namesCategories = categories.map(e =>  e.name);

        return categories
    } catch (e) {
        console.log(e)
    }
};

const getBrandsDb = async () => {
    try {
        let brands = await Brand.findAll( where: { isDeleted: false });
        return brands;
    } catch (e) {
        console.log(e)
    }
};

const getPromotionDb = async () => {
    try {
        let promotion = await Promotion.findAll();
        return promotion;
    } catch (e) {
        console.log(e)
    }
};


const createProduct = async (name, price, description, image, stock, score, categories, brand) => {
    try {
        var newProduct = await Products.create({
            name: name,
            price: price,
            description: description,
            image: image,
            stock: stock,
        });

        const brands = await Brand.findOne({
            where: {
                name: brand,
            }
        });

        if (!brands) {
            await Brand.create({
                name: brand
            })
        };

        for (c of categories) {
            category = await Categories.findOne({
                where: {
                    name: c,
                    isDeleted: false
                }
            })
            newProduct.addCategories(category.id);
        }

        newProduct.setBrand(brands);

        return newProduct
    } catch (error) {
        console.log(error)
    }
};

const createCategory = async (name, image) => {
    try {
        var newCategory = await Categories.create({
            name: name,
            image: image,
        });

        return newCategory
    } catch (e) {
        console.log(e)
    }
};



const createBrand = async (name, image) => {
    try {
        var newBrand = await Brand.create({
            name: name,
            image: image,
        });
        return newBrand

    } catch (e) {
        console.log(e)
    }
};

const createPromotion = async (option, value) => {
    try {
        var newPromotion = await Promotion.create({
            option: option,
            value: value,
        });

        return newPromotion
    } catch (e) {
        console.log(e)
    }
};

const getProductDetail = async (id) => {
    try {
    let product = await Products.findByPk(id, {
            include: [
                {
                    model: Categories,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },

                {
                    model: Brand,
                    attributes: ["name"],
                },

                {
                    model: Promotion,
                    attributes: ["option"],
                },
                {
                    model: Score,
                    attributes: ["score", "coment", "id"],
                }
            ],
        })

        if(product.isDeleted === true ){
            return 'This product doesn\'t exist '
        }

        else{
            let categories = product.categories.map(e => e.name)
        let opiniones = product.scores.slice(0, 3)
        let response = { id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, categories, stock: product.stock, score: product.score_promedio, brand: product.brand.name, opiniones: opiniones }

        return response;
        }
        

    } catch (e) {
        console.log(e)
    }
};

const updateProduct = async (id, props) => {

    try {
        await Products.update(
            {
                name: props.name,
                price: props.price,
                description: props.description,
                image: [...props.image],
                stock: props.stock
            }, {
            where: {
                id: id
            }
        })

        const product = await Products.findByPk(props.id, {
            include: [
                {
                    model: Categories,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },

                },

                {
                    model: Brand,
                    attributes: ["name"],
                }

            ],

        })

        const brands = await Brand.findOne({
            where: {
                name: props.brand,
            }
        });

        product.setBrand(brands)
        product.setCategories([])
        for (c of props.categories) {
            category = await Categories.findOne({
                where: {
                    name: c
                }
            })
            product.addCategories(category.id);
        }

        return product
    } catch (e) {
        console.log(e)
    }
};

const createScore = async (id, score, coment) => {
    try {
        let comment = await Score.create({ coment: coment, score: score })
        let product = await Products.findByPk(id)
        product.addScore(comment.id)

    } catch (error) {
        console.log(error)
    }
}

const getScores = async (id) => {
    try {

        let product = await Products.findByPk(id, {
            include: [
                {
                    model: Score,
                    attributes: ["score", "coment", "id", "isDeleted"],
                    where: {
                        isDeleted: false
                    }
                }
            ],
        });


        if(product.isDeleted === true){
            return 'This product doesn\'t exist'
        }
        
       /*  let response = { 
            id: product.id, 
            name: product.name, 
            price: product.price,
            image: product.image, 
            stock: product.stock, 
            score: product.score_promedio, 
            opiniones: [] 
        }

        product.scores.map(e => {
            if(e.isDeleted === false){
                let op = {
                    score: e.score,
                    comment: e.coment,
                    id: e.id
                }
                response.opiniones.push(op)
            }
        })

         */

        /* else if (product.scores[0].isDeleted === true){
            let response = { id: product.id, 
                name: product.name, 
                price: product.price,
                image: product.image, 
                stock: product.stock, 
                score: product.score_promedio, 
                opiniones: product.scores } */

            return product;
        
    } catch (error) {
        console.log(error)
    }
}

const updateScoreProm = async (id) => {
    try {
        let scores = await Score.findAll({
            where: { productId: id }
        })
        const qtty = scores.length
        let total = scores.reduce(function (acc, va) {
            return (acc + va.score)
        }, 0);
        let prom = (total / qtty)
        let product = await Products.findByPk(id)
        product.update({ score_promedio: prom })
        console.log(prom)
        return prom
    } catch (error) {
        console.log(error)
    }
}



const deleteBrand = async(id) => {
    try {
        let brand = await Brand.findByPk(id)
        if(brand.isDeleted === true){
            return 'This brand doesn\'t exists'
        }

        else{
            await Brand.update({
                isDeleted: true
                }, {
                    where: {
                        id: id
                    }
                })

             return 'Brand deleted succesfully'
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async(id) => {
    try{
        let category = await Categories.findByPk(id)
        if(category.isDeleted === true){
            return 'This category doesn\'t exists'
        }   

        else{
            await Categories.update({
                isDeleted: true
            }, {
                where: {
                    id: id
                }
            })
            return 'Category deleted succesfully'
        }
    }
    catch(error){
        console.log(error)
    }
}

const deleteProduct = async(id) => {
    try{
        let prod = await Products.findByPk(id)
        if(prod.isDeleted === true){
            return 'This product doesn\'t exists'
        }

        else{
            await Products.update({
                isDeleted: true
            }, { 
                where: {
                    id: id
                }
            })
            return 'Product deleted succeesfully'
        }
    }
    catch(error){
        console.log(error)
    }
}

const deleteScore = async (id) => {
    try{
        await Score.update({
            isDeleted: true
        }, {
            where: {
                id: id
            }
        })
        return 'Score deleted succesfully'
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    getPromotionDb,
    getProductsDb,
    getCategoriesDb,
    getBrandsDb,
    createProduct,
    createPromotion,
    createCategory,
    createBrand,
    getProductDetail,
    updateProduct,
    createScore,
    getScores,
    updateScoreProm,
    deleteBrand,
    deleteCategory, 
    deleteProduct,
    deleteScore
}
