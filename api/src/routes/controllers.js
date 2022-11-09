const axios = require('axios');
const { Products, Categories, Brand, Promotion, Score, UserRegisted } = require('../db');


const getProductsDb = async () => {
    try {
        let products = await Products.findAll({
            where: { isDeleted: false },
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
            where: { isDeleted: false},
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
        let brands = await Brand.findAll({where: { isDeleted: false }});
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


const createProduct = async (name, price, description, image, stock, categories, brand) => {
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

const createPromotion = async (option, value, userRegistedId) => {
    try {
        var user = await UserRegisted.findOne({where: {email: userRegistedId}})
        
        var newPromotion = await Promotion.create({
            option: option,
            value: value,
            userRegistedId: user.id
        });
        return newPromotion
        console.log('esto es newPromotion',newPromotion)
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
                    model: Score,
                    attributes: ["score", "coment", "id"],
                }
            ],
        })

        let categories = product.categories.map(e => e.name)
        let opiniones = product.scores.slice(0, 4)

        let response = { id: product.id, name: product.name, price: product.price, description: product.description, image: product.image, categories, stock: product.stock, score: product.score_promedio, brand: product.brand.name, opiniones: opiniones }

        return response;
        
        

    } catch (e) {
        console.log(e)
    }
};

const updateProduct = async (id, name, price, description, stock, image, brand, categories) => {

    try {
        const product = await Products.findByPk(id, {
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

        await product.update(
            {
                name: name,
                price: price,
                description: description,
                image: [...image],
                stock: stock
            }, {
            where: {
                id: id
            }
        })

        const brands = await Brand.findOne({
            where: {
                name: brand,
            }
        });

        await product.setBrand();

        await product.setBrand(brands.id)

        await product.setCategories([]);
        
        for (c of categories) {
           let category = await Categories.findOne({
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
            return 'El producto no fue encontrado'
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
            return 'La marca no fue encontrada'
        }
        else{
            await Brand.update({
                isDeleted: true
                }, {
                    where: {
                        id: id
                    }
                })

             return 'La Marca fue borrada con éxito'
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async(id) => {
    try{
        let category = await Categories.findByPk(id)
        if(category.isDeleted === true){
            return 'La categoría no fue encontrada'
        }   

        else{
            await Categories.update({
                isDeleted: true
            }, {
                where: {
                    id: id
                }
            })
            return 'La categoría fue Borrada exitosamente'
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
            return 'El producto no fue encontrado'
        }

        else{
            await Products.update({
                isDeleted: true
            }, { 
                where: {
                    id: id
                }
            })
            return 'El Producto fue Borrado exitosamente'
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
        return 'La opinión fue Borrada exitosamente'
    }
    catch(error){
        console.log(error)
    }
}



const updateScoreUser = async (option, value, userRegistedId) => {
    console.log(value);
    try {
        await Promotion.update(
            {
                option: option,
                value: value,
                userRegistedId: userRegistedId
            },
            {
                where: {
                    userRegistedId: userRegistedId
                }
            }
            )

        let scoreUser = await Promotion.findOne({ where: { userRegistedId: userRegistedId } })
        return scoreUser
        // console.log(scoreUser)
    } catch(e) {
        console.log(e)
    }
};

const getScoresUser = async (id) => {
    try {

        let scoreUser = await UserRegisted.findOne({where : {email: id},
            include: [
                {
                    model: Promotion,
                    attributes: ["value"],
                    where: {
                        isDeleted: false
                    }
                }
            ],
    });


        // if(scoreUser.isDeleted === true){
        //     return 'no se encontraron puntos'
        //}
        
            return scoreUser;
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getScoresUser,
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
    updateScoreUser,
    deleteBrand,
    deleteCategory, 
    deleteProduct,
    deleteScore
    

}
