const { WishList, Products, UserRegisted, createNewWish } = require('../db')

const getWishList = async() => {
    try {
        let wish = await WishList.findAll({
            include:[ {
                model: Products, 
                attributes: ["id", "name", "price", "description", 'image', "isDeleted", 'stock'],
                where: {
                    isDeleted: false
                }
            },
            {
                model: UserRegisted, 
                attributes: ['email'],
                where: {
                    isDeleted: false
                }
            }]
        })
        let wishListFinal = wish.map((e) => {
            
            let cartProducts = e.products

            let productsClean = cartProducts.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    price: e.price,
                    description: e.description,
                    image: e.image[0],
                    stock: e.stock
                }
            })
            
            return {
                    id: e.id,
                    userRegistedId: e.userRegistedId,
                    userRegisted: e.userRegisted.email,
                    products: productsClean
                }
        })

        
        

        
        return wishListFinal
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
                attributes: ["id", "name", "price", "description",'image', 'stock'], 
                where: {
                    isDeleted: false
                }
            }
        ]
        })

        let cartProducts = wish.products

        let productsClean = cartProducts.map((e) => {
            return {
                id: e.id,
                name: e.name,
                price: e.price,
                description: e.description,
                image: e.image[0],
                stock: e.stock
            }
        })

        let wishList = {
            id: wish.id,
            userRegistedId: wish.userRegistedId,
            userRegisted: wish.userRegisted.email,
            products: productsClean
        }

        return wishList

    } catch (error) {
        console.log(error)
    }
}

const modifyWish = async (id, idUsuario, idProd) => {
    try{
        let wishprod = await WishList.findByPk(id)
        let user = await UserRegisted.findByPk(idUsuario)

        if(wishprod.isDeleted === true){
            return 'Lista no encontrada'
        }

        if(user.isDeleted === true){
            return 'Usuario no encontrado'
        }
        
        let newWish = await WishList.findByPk(id)

            await newWish.addProducts(idProd)

            return newWish
    }
    catch(error){
        console.log(error)
    }
}


const createNewWishList = async(userEmail, cart) => {
    try{
        const user = await UserRegisted.findOne({
            where: { email: userEmail }, 
        })

        let wishList = await WishList.findOne({
            where: {
                userRegistedId: user.id
            }
        })

        if(!wishList){
            wishList = await WishList.create({
            userRegistedId: user.id})
            
            await cart.forEach((e) => {
            wishList.addProducts(e.id)
            })
        }

        else{
            wishList.setProducts([])
            await cart.forEach((e) => {
                wishList.addProducts(e.id)
            })
        }  

    return wishList
    }
    catch(error){
        console.log(e)
    }
}

module.exports = {
    getWishList,
    getWishListDetail, 
    modifyWish, 
    createNewWishList
}