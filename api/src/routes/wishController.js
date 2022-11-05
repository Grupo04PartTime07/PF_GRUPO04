const { WishList, Products, UserRegisted, createNewWish } = require('../db')

const getWishList = async() => {
    try {
        let Wish = await WishList.findAll({
            include: {
                model: Products, 
                attributes: ["id", "name", "price", "description", "isDeleted"],
                where: {
                    isDeleted: false
                }
            }
        })
        return Wish
    } catch (error) {
        console.log(error)
    }
}

const getWishListDetail = async (id) => {
    try {
        let wish = await WishList.findByPk(id, {
            include: [
                {
                    model: UserRegisted, 
                    attributes: ['email'],
                    where: {
                        isDeleted: false
                    }
                },
                
                {
                model: Products, 
                attributes: ["id", "name", "price", "description"], 
                where: {
                    isDeleted: false
                }
            }
        ]
        })

        return wish

    } catch (error) {
        console.log(error)
    }
}

const modifyWish = async (id, idProd) => {
    try{
        let wishprod = await WishList.findByPk(id)
        let user = await UserRegisted.findByPk(id)

        if(wishprod.isDeleted === true){
            return 'Lista no encontrada'
        }

        if(user.isDeleted === true){
            return 'Usuario no encontrado'
        }
        
        let newWish = await WishList.findByPk(id, {
            include: [
                {
                    model: UserRegisted, 
                    attributes: ['email'],
                    where: {
                        isDeleted: false
                    }
                },
                    
                {
                    model: Products, 
                    attributes: ["id", "name", "price", "description"], 
                    where: {
                        isDeleted: false
                    }
                }
            ]
            })

            await newWish.addProducts(idProd)

            return newWish
    }
    catch(error){
        console.log(error)
    }
}


const createNewWishList = async(user, products) => {
    try{
        const User = await UserRegisted.findOne({
            where: { email: user }, 
        })

        let wish = await WishList.findOne({
            where: {
                userRegistedId: User.id
            }
        })

        if(!wish){
            wish = await WishList.create({
            userRegistedId: User.id})
            
            await products.forEach(prod => {
            wish.addProducts(prod.id)
            })
        }

        else{
            wish.setProducts([])
            await products.forEach(prod => {
                wish.addProducts(prod.id)
            })
        }

        

    return wish
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getWishList,
    getWishListDetail, 
    modifyWish, 
    createNewWishList
}