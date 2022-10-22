const { Router, response } = require('express');
const { where } = require('sequelize');
const router = Router();
const {Products, Categories, Brand, Promotion, Score} = require('../db');


router.get('/categories', async (req, res)=>{
    await Categories.bulkCreate([
        {name:'Aceites y Vinagres', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665878963/condimento_pa3ccc.png'},
        {name:'Agua', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/co_rgb:252327,dn_113,e_blackwhite,o_80/v1665878963/agua-potable_yyvszr.png'},
        {name:'Almacén', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665878963/estante_tpm5bf.png'},
        {name:'Bebidas', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665880898/bebidas_gymkh7.png'},
        {name:'Cuidado Personal', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665880898/botellas_ofyith.png'},
        {name:'Desayuno y Merienda', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665882323/desayuno_nn802s.png'},
        {name:'Especias', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665882323/especia_e6o7tj.png'},
        {name:'Golosinas', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665882323/bocadillo_fhmpup.png'},
        {name:'Harinas', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883417/azucar_nfael7.png'},
        {name:'Lácteos', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883417/productos-lacteos_po5p1z.png'},
        {name: 'Licores', image: 'https://res.cloudinary.com/dyycj9vam/image/upload/o_78/v1665877158/wine-bottles_v9vqaq.png'},
        {name:'Limpieza', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/limpieza_m7vx0m.png'},
        {name:'Mascotas', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/mascota_tiycrm.png'},
        {name:'Pastas Secas',  image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/pasta_vd0rg7.png'},
        {name:'Perfumeria', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/perfume_hyqvg6.png'},
        {name:'Reposteria', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883417/batidor_merxpl.png'},
        {name:'Salsas', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/salsas_hhhclo.png'},
        {name:'Secos', image:'https://res.cloudinary.com/dnxvoi5ro/image/upload/o_78/v1665883416/alimentos-para-mascotas_lfyvia.png'}
], { ignoreDuplicates: true})
let categories = await Categories.findAll();
    res.send(categories)
});

router.get('/brand', async (req, res)=>{
    try{
    await Brand.bulkCreate([
        { name: 'Matarazzo', image:"https://tuquejasuma.com/media/cache/f9/59/f959102d4e6da4b971aedd52271d6f59.png"},
        { name: 'Natura', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIxIkg4eofyjtpKxQmsTAqACbIC4oTmG8iGg&usqp=CAU"},
        { name: 'Pureza', image:"https://mayoristasoto.com/img/m/316.jpg"},
        { name: 'Don Satur', image:"https://www.donsatur.com.ar/wp-content/uploads/2020/11/logo-don-satur-RGB-300x164.png"},
        { name: 'Dermaglós', image:"https://http2.mlstatic.com/D_NQ_NP_880411-MLA31131564040_062019-O.jpg"},
        { name: "L'oréal", image:"https://i.pinimg.com/originals/3d/47/17/3d4717a390e0331b8fe70dedba54df62.jpg"},
        { name: 'Elegante', image:"https://http2.mlstatic.com/D_NQ_NP_848419-MLA41272378070_032020-O.jpg"},
        { name: 'Veronica', image:"http://veronica.com.ar/img/logo_print.jpg"},
        { name: 'Las Tres Niñas', image:"https://lastresninas.com/wp-content/uploads/2022/02/logol3n-1.jpg"},
        { name: 'Twinings', image:"https://static.wikia.nocookie.net/logopedia/images/9/9c/Th_%282%29sdfg.jpg/revision/latest?cb=20190610092011"},
        { name: 'Maintenance Criadores', image:"https://prusik.cl/img/m/20.jpg"},
        { name: 'Dog Chow', image:"https://www.purina.es/sites/default/files/2022-06/dog.png"},
        { name: 'Skip', image:"https://cdn.sanity.io/images/92ui5egz/production/b23240c787e6c66911b1542adebb382ded38b7c9-1080x1080.jpg?w=375&h=375&fit=crop&auto=format"},
        { name: 'Make', image:"https://makehogar.com.ar/wp-content/uploads/2022/09/make-logo2.png" },
        { name: 'Glaciar', image:"http://mercosurdistribuciones.com.ar/img/glaciar2.jpg" },
        { name: 'Rutini', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUUdMwT-RL74Wq-OOR92VKsYtzUtQJnxhcTu017su0Sl8A26XKchfOqD_WYvCoR8jbKVM&usqp=CAU"},
        { name: 'Luigi Bosca', image:"https://media-exp1.licdn.com/dms/image/C4E0BAQFi8yXLMqcIqQ/company-logo_200_200/0/1654724213097?e=2147483647&v=beta&t=GlE2nOjsOi0tFA1Mw9LnAbL659axbSIJCGbNKBrgbqw"},
        { name: 'Stella Artois', image:"https://leisureandlux.mx/wp-content/uploads/2020/08/Stella-Artois.png"},
        { name: 'Corona', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuJ-rkPP7rQOV6viGGj5umne8doqA1vpu66tIaSLh-xjHDfV8dehle5l-BZvi4Tx5eYh4&usqp=CAU"},
        { name: 'Pozo', image:"https://productospozo.com.ar/site/images/varios/logo-04.jpg"},
        { name: 'Flynn Paff', image:"https://mayoristasoto.com/img/m/72.jpg"},
        { name: 'Menoyo', image:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Logo_Menoyo.jpg"},
        { name: 'Ledesma', image:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_Ledesma.png"},
        { name: 'Noel', image:"https://mayoristasoto.com/img/m/394.jpg"},
        { name: 'Morixe', image:"https://media-exp2.licdn.com/dms/image/C4D0BAQGPTvsuC7oHog/company-logo_200_200/0/1579879290840?e=2147483647&v=beta&t=QiuRGw8qEnMu7vEcovhB1w9wKAn6YJMg88jHT-Tnon0"},
        { name: 'Playadito', image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0BJRJEe0AVljneq10C10VPNBSGHBAG6X1DJZ8ZxTiQZFCuLcbO_Wj1GvHuIrN0u5KilY&usqp=CAU"},
        { name: 'Alicante', image:"http://1.bp.blogspot.com/-KE4W1YXDH0I/UyoyDWd95LI/AAAAAAAAA1k/FjH_xtXtd8o/s280/Alicante+logo.jpg"},
        { name: 'Ferrero Rocher', image:"https://res.cloudinary.com/dnxvoi5ro/image/upload/c_scale,h_100,w_210/v1666035020/ferrero_wczuhn.png"},
        { name: 'Arcor', image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Arcor_logo.svg/1200px-Arcor_logo.svg.png"},
        { name: 'Granix', image:"https://mayoristasoto.com/img/m/26.jpg"},
        { name: 'Pleny', image: "https://http2.mlstatic.com/D_NQ_NP_902437-MLA44058564251_112020-O.webp" },
        { name: 'Águila', image: "https://seeklogo.com/images/C/cerveza-aguila-logo-F449B95D01-seeklogo.com.jpg" },
        { name: 'Coca-cola', image: "https://tentulogo.com/wp-content/uploads/HistoriadellogodeCocaCola.jpg" },
        { name: 'Branca', image: "https://i.pinimg.com/originals/af/9b/bd/af9bbd2bed400b5c05d9dc0cfbd7a3bf.png" },
        { name: 'Odol', image: "https://www.sprchacek.cz/files/manufacturer_images/4828505318431391744_1.png" },
        { name: 'Just for Men', image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/logo-justformen-1550229554.png?resize=*:100" },
        { name: 'Gillette', image: "https://graffica.info/wp-content/uploads/2020/12/Gillette-Logo-2048x1161-3-2048x951-1-1200x720.png" },
        { name: 'Antonio Banderas', image: "https://www.logolynx.com/images/logolynx/cc/cc8a2a7039fe7180b804527f414560a7.jpeg" },
        { name: 'Boss', image: "https://www.hugoboss.com/on/demandware.static/Sites-US-Site/-/default/dw4fc964d1/svg/output_files/boss_logo.svg" },
        { name: 'Valcatil', image: "https://res.cloudinary.com/dnxvoi5ro/image/upload/v1665963536/download_kiwb4t.jpg" },
        { name: 'Megacistín', image: "https://www.megacistin.com.ar/sites/all/themes/theme1043/logo.png" },
        { name: 'Algabo', image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/130/470/themes/common/logo-1079655723-1657043240-e2f1a80fbbcef29907c1c9c6596452611657043240-480-0.png?0" },
        { name: 'Veet', image: "https://1000marcas.net/wp-content/uploads/2021/05/Veet-logo.png" },
        { name: 'Depimiel' , image: "http://tiendafresh.com.ar/guia.devenado.com/IMG/tienda-fresh-online-id15860subcat2-depimiel-w400-h500-m3.jpg_1-w400-h500-m3.jpg"},
        { name: 'Cariló', image: "https://http2.mlstatic.com/D_NQ_NP_810349-MLA49863344470_052022-O.webp" }
      ], { ignoreDuplicates: true})
let brands = await Brand.findAll();
    res.send(brands)
    }catch(e){
        console.log(e)
    }
}); 

const data =  [
    {
    "name": "Fideos Tirabuzon Matarazzo 500gr",
    "price": 183,
    "image": ["https://masonlineprod.vtexassets.com/arquivos/ids/231079-800-auto?v=637859471084330000&width=800&height=auto&aspect=true"],
    "description": "Empaque de 500gr de fideos 100% trigo candeal seleccionado",
    "id": "2",
    "brand":"Matarazzo",
    "categories": ["Almacén", "Pastas Secas"],
    "stock": 100,
    },
    {
    "name": "Mayonesa Natura 500 Cc",
    "price": 273,
    "image": ["https://masonlineprod.vtexassets.com/arquivos/ids/164533-800-auto?v=637835135753030000&width=800&height=auto&aspect=true"],
    "description": "Liviana y sabrosa, con jugo de limón, sin T.A.C.C.",
    "id": "3",
    "brand":"Natura",
    "categories": ["Almacén", "Salsas"],
    "stock": 90,
    },
    {
    "name": "Aceite Girasol Pureza 1,5 Lt",
    "price": 760,
    "image": ["https://masonlineprod.vtexassets.com/arquivos/ids/241395-800-auto?v=637867897739230000&width=800&height=auto&aspect=true"],
    "description": "Aceite Girasol con Alto contenido en Vintamina E, pico dosificador, NO GMO",
    "id": "4",
    "brand":"Pureza",
    "categories": ["Almacén", "Aceites y Vinagres"],
    "stock": 80,
    },
    {
    "name": "Galletita Don Satur Bizcocho salado 200 g",
    "price": 155,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_737325-MLA43815353288_102020-O.webp"],
    "description": "Bizcocho salado sin conservantes y sin saborizantes",
    "id": "5",
    "brand":"Don Satur",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 50,
    },
    {
    "name": "Protector solar Dermaglós FPS 50 FPS 50 en emulsión de 250 mL",
    "price": 2665,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_881162-MLA43430021629_092020-O.webp"],
    "description": "Disfrutá sin preocupaciones del verano, protegiendo la piel de quienes más querés de los rayos ultravioletas del sol.",
    "id": "6",
    "brand":"Dermaglós",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 24,
    },
    {
    "name": "Acondicionador Hidratación Hialurónico Elvive L'oréal 400ml",
    "price": 828,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_935891-MLA47637134891_092021-O.webp"],
    "description": "Un cabello fresco, más vital y manejable en pocos pasos, de la mano de Elvive.",
    "id": "7",
    "brand":"L'oréal",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 50,
    },
    {
    "name": "Papel Higiénico Elegante Premium Hoja Simple 80 m De 4 u",
    "price": 870,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_674418-MLA48885392019_012022-O.webp"],
    "description": "Nueva Textura, Ultra Suave, Ultra Absorbente",
    "id": "8",
    "brand":"Elegante",
    "categories": ["Almacén", "Limpieza"],
    "stock": 50,
    },
    {
    "name": "Leche Entera Larga Vida Veronica X 1 Litro",
    "price": 240,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_821926-MLA49634022566_042022-O.webp"],
    "description": "Leche Entera Larga Vida Homogenizada Libre de Gluten - Sin T.A.C.C.",
    "id": "9",
    "brand":"Veronica",
    "categories": ["Lácteos", "Almacén"],
    "stock": 48,
    },
    {
    "name": "Leche Chocolatada Parc Descremada Las Tres Niñas 200ml",
    "price": 110,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_648594-MLA49950042513_052022-O.webp"],
    "description": "Leche con cacao Fortificada con vitaminas A y D",
    "id": "10",
    "brand":"Las Tres Niñas",
    "categories": ["Desayuno y Merienda", "Almacén", "Lácteos" ],
    "stock": 56,
    },
    {
    "name": "Te Twinings Frutilla Y Mango Infusion - Caja X10 Sobres",
    "price": 800,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_764232-MLA49314321027_032022-O.webp"],
    "description": "Contiene aromatizantes identicos al natural",
    "id": "11",
    "brand":"Twinings",
    "categories": ["Desayuno y Merienda", "Almacén"],
    "stock": 36,
    },
    {
    "name": "Alimento Maintenance Criadores para perro adulto todos los tamaños sabor carne y pollo en bolsa de 22 kg",
    "price": 5700,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_813302-MLA43970070424_112020-O.webp"],
    "description": "La selección de un alimento adecuado para tu mascota es muy importante para garantizar su crecimiento, desarrollo y salud. Con esta opción de Maintenance Criadores podrás cubrir las necesidades nutricionales y energéticas de tu perro.",
    "id": "12",
    "brand":"Maintenance Criadores",
    "categories": ["Mascotas", "Secos"],
    "stock": 18,
    },
    {
    "name": "Alimento Dog Chow Vida Sana Digestión Sana para perro adulto de raza mediana y grande sabor mix en bolsa de 21 kg",
    "price": 7850,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_869212-MLA40504691778_012020-O.webpv"],
    "description": "Formulado especialemente para perros medianos, Sabor y nutricion completa para tu Mascota",
    "id": "13",
    "brand":"Dog Chow",
    "categories": ["Mascotas", "Secos"],
    "stock": 18,
    },
    {
    "name": "Jabón Líquido Para Diluir Skip Bio-enzimas Tecnologia Superior En Limpieza Y Cuidado 500 Ml",
    "price": 965,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_776978-MLA51453526801_092022-O.webp"],
    "description": "Hasta 20% de Ahorro, Rinde 3 Litros, Con enzimas de origen natural",
    "id": "14",
    "brand":"Skip",
    "categories": ["Limpieza", "Almacén"],
    "stock": 18,
    },
    {
    "name": "Guante De Limpieza Make Latex Amarillo Tipo Mapa Plisse",
    "price": 236,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_904283-MLA49694159342_042022-O.webp"],
    "description": "Interior Afelpado, más resistentes",
    "id": "15",
    "brand":"Make",
    "categories": ["Limpieza", "Almacén"],
    "stock": 48,
    },
    {
    "name": "Agua mineral Glaciar sin gas botella 500 mL",
    "price": 110,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_948697-MLA43773897034_102020-O.webp"],
    "description": "Agua mineral baja en Sodio",
    "id": "16",
    "brand":"Glaciar",
    "categories": ["Bebidas", "Agua"],
    "stock": 80,
    },
    {
    "name": "Vino Rutini Cabernet Malbec 750ml Botella Tinto",
    "price": 2614,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_826358-MLA49900398110_052022-O.webp"],
    "description": "Tiempo en barrica: 12 meses",
    "id": "17",
    "brand":"Rutini",
    "categories": ["Licores", "Bebidas"],
    "stock": 18,
    },
    {
    "name": "Vino Tinto Luigi Bosca Malbec 750ml",
    "price": 2202,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_923118-MLA43950731882_102020-O.webp"],
    "description": "Tiempo en barrica: 12 meses",
    "id": "18",
    "brand":"Luigi Bosca",
    "categories": ["Licores", "Bebidas"],
    "stock": 22,
    },
    {
    "name": "Café instantáneo clásico Nescafé Gold frasco 100 g",
    "price": 1835,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_868393-MLA43567388997_092020-O.webp"],
    "description": "Elaborado Artesanalmente con Granos Arabicos",
    "id": "19",
    "brand":"Twinings",
    "categories": ["Desayuno y Merienda", "Bebidas"],
    "stock": 36,
    },
    {
    "name": "Cerveza Stella Artois Noire Schwarzbier negra lata 473 mL",
    "price": 315,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_956392-MLA44839778484_022021-O.webp"],
    "description": "Graduación alcohólica: 5.4 %",
    "id": "20",
    "brand":"Stella Artois",
    "categories": ["Licores", "Bebidas"],
    "stock": 80,
    },
    {
    "name": "Cerveza Corona American Adjunct Lager rubia 710 mL",
    "price": 553,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_821366-MLA44839743447_022021-O.webp"],
    "description": "La marca mas fina, Graduación alcohólica: 4.5 %",
    "id": "21",
    "brand":"Corona",
    "categories": ["Licores", "Bebidas"],
    "stock": 80,
    },
    {
    "name": "Galletitas Vainillas Pozo X 160 G",
    "price": 178,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_983320-MLA45508690067_042021-O.webp"],
    "description": "Comparte Dulces Momentos, buscá recetas en nuestra Web",
    "id": "22",
    "brand":"Pozo",
    "categories": ["Desayuno y Merienda", "Almacén"],
    "stock": 56,
    },
    {
    "name": "Flynn Paff Confitados 50g Caramelos Mastic. Sin Tacc",
    "price": 115,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_767212-MLA49161299159_022022-O.webp"],
    "description": "Sabores: Tutti Frutti, Anana, Uva y Limon",
    "id": "23",
    "brand":"Flynn Paff",
    "categories": ["Golosinas", "Almacén"],
    "stock": 26,
    },
    {
    "name": "Vinagre De Alcohol Menoyo Botella X 1 L",
    "price": 137,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_917882-MLA46995976880_082021-O.webp"],
    "description": "Libre de gluten, Sin T.A.C.C.",
    "id": "24",
    "brand":"Menoyo",
    "categories": ["Aceites y Vinagres", "Almacén"],
    "stock": 40,
    },
    {
    "name": "Azucar Ledesma Clásica Paquete 1 Kilo",
    "price": 250,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_948863-MLA51093238321_082022-O.webp"],
    "description": "Azúcar Rubia, Sin T.A.C.C.",
    "id": "25",
    "brand":"Ledesma",
    "categories": ["Reposteria", "Almacén", "Desayuno y Merienda"],
    "stock": 46,
    },
    {
    "name": "Pure De Tomate Noel Brick X 520 Gr",
    "price": 75,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_699425-MLA44854581887_022021-O.webp"],
    "description": "Pure de Tomate con Azucares agregado",
    "id": "26",
    "brand":"Noel",
    "categories": ["Almacén", "Salsas"],
    "stock": 48,
    },
    {
    "name": "Harina Morixe 000 X 1kg",
    "price": 184,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_999470-MLA49736408420_042022-O.webp"],
    "description": "Ideal para Panes caseros y pizzas",
    "id": "27",
    "brand":"Morixe",
    "categories": ["Almacén", "Harinas"],
    "stock": 36,
    },
    {
    "name": "Yerba Mate Playadito 1 Kilo",
    "price": 749,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_816322-MLA47045657584_082021-O.webp"],
    "description": "Elaborada con Palo, sin gluten y sin T.A.C.C.",
    "id": "28",
    "brand":"Playadito",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 48,
    },
    {
    "name": "Empaque de 18 und. Jugo Baggio Manzana 200cc",
    "price": 1196,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_694998-MLA47557361961_092021-O.webp"],
    "description": "50% Jugo de mmanzana, enriquecido con Vitamina C",
    "id": "29",
    "brand":"Playadito",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 48,
    },
    {
    "name": "Cif Crema Ultra Blanco Con Lavandina",
    "price": 332,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_724047-MLA42416875416_062020-O.webp"],
    "description": "Doble Poder, Limpia y Blanquea",
    "id": "30",
    "brand":"Make",
    "categories": ["Almacén", "Limpieza"],
    "stock": 48,
    },
    {
    "name": "Alicante Pimenton Dulce Seleccionado X 25 Gr",
    "price": 121,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_995932-MLA48234388678_112021-O.webp"],
    "description": "Pimenton Dulce Seleccionado, Libre de Gluten, Sin T.A.C.C.",
    "id": "31",
    "brand":"Alicante",
    "categories": ["Almacén", "Especias"],
    "stock": 68,
    },
    {
    "name": " Caja Bombon Ferrero Rocher X 12 Un. Chocolate",
    "price": 1403,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_727711-MLA46603599045_072021-O.webp"],
    "description": "Bombones de Chocolate con avellana",
    "id": "32",
    "brand":"Ferrero Rocher",
    "categories": ["Almacén", "Golosinas"],
    "stock": 18,
    },
    {
    "name": "Bombon Bon O Bon Chocolate Aguila Arcor",
    "price": 954,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_646640-MLA50482756831_062022-O.webp"],
    "description": "Caja de 18 unidades de Bombones",
    "id": "33",
    "brand":"Arcor",
    "categories": ["Almacén", "Golosinas"],
    "stock": 18,
    },
    {
    "name": "Cereales Rellenos Frutilla Bocadito Granix Bolsa X 180 Gr",
    "price": 370,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_664690-MLA47751429171_102021-O.webp","https://http2.mlstatic.com/D_NQ_NP_769317-MLA47381371718_092021-O.webp"],
    "description": "La mejor calidad en productos alimenticios y al mejor precio",
    "id": "34",
    "brand":"Granix",
    "categories": ["Almacén", "Golosinas"],
    "stock": 38,
    },
    {
    "name": "Nueces Mariposa Extra Light Pleny Doypack X 200 G ",
    "price": 990,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_780550-MLA46771462214_072021-O.webp", "https://http2.mlstatic.com/D_NQ_NP_819025-MLA42736530385_072020-O.webp"],
    "description": "Nueces Mariposa Naturales",
    "id": "35",
    "brand":"Pleny",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 16,
    },
    {
    "name": "Pasas De Uva Sin Semillas Pleny X 1 Kg",
    "price": 1339,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_869115-MLA45996409354_052021-O.webp", "https://http2.mlstatic.com/D_NQ_NP_937794-MLA47092018044_082021-O.webp"],
    "description": "Pasas De Uva Morocha S/ Semillas 1kg",
    "id": "36",
    "brand":"Pleny",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 32,
    },
    {
    "name": "Chocolate Taza Águila S/amargo X 1kg",
    "price": 1929,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_659256-MLA50106555811_052022-O.webp", "https://http2.mlstatic.com/D_NQ_NP_703022-MLA50106517739_052022-O.webp"],
    "description": "CHOCOLATE TAZA AGUILA SEMI AMARGO X 1KG CACAO 45 %",
    "id": "37",
    "brand":"Águila",
    "categories": ["Almacén", "Desayuno y Merienda", "Reposteria"],
    "stock": 46,
    },
    {
    "name": "Gaseosa Coca-cola Sabor Original 2,25 Lt",
    "price": 435,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_877528-MLA49961093451_052022-O.webp"],
    "description": "Sabor Original, menos azúcares",
    "id": "38",
    "brand":"Coca-cola",
    "categories": ["Almacén", "Bebidas"],
    "stock": 120,
    },
    {
    "name": "Gaseosa Sprite Lima-limón 2,25 Lt",
    "price": 435,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_664809-MLA49961094146_052022-O.webp"],
    "description": "asbor Original, menos azúcares",
    "id": "39",
    "brand":"Coca-cola",
    "categories": ["Almacén", "Bebidas"],
    "stock": 120,
    },
    {
    "name": "Fernet Branca 750cc",
    "price": 1473,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_950861-MLA44885730605_022021-O.webp"],
    "description": "Bebida alcohólica amarga del tipo amaro elaborada a partir de varios tipos de hierbas",
    "id": "40",
    "brand":"Branca",
    "categories": ["Licores", "Bebidas"],
    "stock": 50,
    },
    {
    "name": "Pasta dental Odolito Frutilla en crema 50 g",
    "price": 139,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_677338-MLA43644849437_102020-O.webp"],
    "description": "Crema Dental para niños, con Calcio y flúor, ayuda a prevenir la caries",
    "id": "41",
    "brand":"Odol",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 50,
    },
    {
    "name": "Tintura En Gel Para Barba Y Bigote Cubre Canas Tono Castaño Claro",
    "price": 1472,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_740116-MLA48050665276_102021-O.webp", "https://http2.mlstatic.com/D_NQ_NP_660951-MLA48752338938_012022-O.webp"],
    "description": "Con Biotina, aloe y aceite de Coco, más cremosa",
    "id": "42",
    "brand":"Just for Men",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 35,
    },
    {
    "name": "Máquina para afeitar Gillette Venus Simply3",
    "price": 225,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_817236-MLA51421950692_092022-O.webp", "https://http2.mlstatic.com/D_NQ_NP_631548-MLA50927711973_072022-O.webp"],
    "description": "3 Hojas móviles, con barra de Aloe Vera, Piel Suave con menos irritación",
    "id": "43",
    "brand":"Gillette",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 39,
    },
    {
    "name": "Antonio Banderas King of Seduction Absolute EDT 100 ml para hombre",
    "price": 5873,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_748501-MLA47574177150_092021-O.webp", "https://http2.mlstatic.com/D_NQ_NP_879899-MLA47574044420_092021-O.webp"],
    "description": "La fragancia King of Seduction eau de toilette ofrece la frescura perfecta para épocas de calor. Al caracterizarse por sus aromas ligeros podés usar la cantidad que quieras sin miedo a excederte.",
    "id": "44",
    "brand":"Antonio Banderas",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 19,
    },
    {
    "name": "Boos Intense EDP 90 ml para hombre",
    "price": 4919,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_929477-MLA47617406639_092021-O.webp", "https://http2.mlstatic.com/D_NQ_NP_766787-MLA47617395846_092021-O.webp"],
    "description": "El perfume Intense ofrece una fragancia intensa con un alto nivel de concentración. A diferencia de los eau de toilette, se recomienda para el invierno y noches interminables ya que va a perdurar en tu piel por muchas horas.",
    "id": "45",
    "brand":"Boss",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 15,
    },
    {
    "name": "Valcatil Max P/ Caída Del Pelo X 120 Cáps. Blandas",
    "price": 6989,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_662993-MLA44393760685_122020-O.webp"],
    "description": "El camino hacia un cabello perfecto requiere de un cuidado especial",
    "id": "46",
    "brand":"Valcatil",
    "categories": ["Cuidado Personal"],
    "stock": 14,
    },
    {
    "name": "Megacistín Max Fortalecedor X 30 Cmp.",
    "price": 3508,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_837121-MLA47615899518_092021-O.webp"],
    "description": "El camino hacia un cabello perfecto requiere de un cuidado especial, y hoy podés lograr ese cambio de la mano de Megacistín.",
    "id": "47",
    "brand":"Megacistín",
    "categories": ["Cuidado Personal"],
    "stock": 14,
    },
    {
    "name": "Star Wars Jabón Líquido 3d Baby Yoda 500ml Algabo",
    "price": 1920,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_975371-MLA51838785669_102022-O.webp", "https://http2.mlstatic.com/D_NQ_NP_680913-MLA51838842502_102022-O.webp"],
    "description": "El Jabón líquido de Star Wars 3D con su refrescante espuma convierte la limpieza diaria en una sensación única.",
    "id": "48",
    "brand":"Algabo",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 24,
    },
    {
    "name": "Crema depilatoria Veet Silky Fresh corporal piel sensible 100 ml",
    "price": 932,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_837283-MLA43360892897_092020-O.webp"],
    "description": "Remueve el vello de forma eficaz, incluso hasta los vellos más cortos. Además, su fórmula con vitamina E y aloe vera, humecta y deja tu piel sedosa.",
    "id": "49",
    "brand":"Veet",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 39,
    },
    {
    "name": "Crema depilatoria Depimiel Men Íntimo para zona íntima piel normal 95 g",
    "price": 840,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_603137-MLA43360907587_092020-O.webp", "https://http2.mlstatic.com/D_NQ_NP_832537-MLA43635198717_092020-O.webp"],
    "description": "El Kit contiene: 1 Pelicula protectora Pre-Depilatoria componente, 1 Crema Depilatoria Men intimo componente, 1 Esponja",
    "id": "50",
    "brand":"Depimiel",
    "categories": ["Cuidado Personal", "Perfumeria"],
    "stock": 39,
    },
    {
    "name": "Galletita Molinos sin T.A.C.C. 150g",
    "price": 190,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_657424-MLA43815565507_102020-O.webp", "https://http2.mlstatic.com/D_NQ_NP_886782-MLA49863261854_052022-O.webp"],
    "description": "Elaboradas con ingredientes de primera calidad, nuestras tostadas de arroz se destacan por ser livianas, naturales y crocantes, lo cual las convierte en un imprescindible de tus comidas diarias.",
    "id": "51",
    "brand":"Cariló",
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 50,
    }
    ]

    router.get('/products', async (req, res)=>{
        for(let p of data){
            let nwprod = await Products.create({name: p.name,price: p.price,image: p.image,description: p.description,stock: p.stock, score_promedio: 2.5})
            for(let c of p.categories){
                let dbcat = await Categories.findOne({where: {name: c}});
                await nwprod.addCategories(dbcat.id);
            }
            let dbbrand = await Brand.findOne({where: {name: p.brand}});
            await nwprod.setBrand(dbbrand.id)
        }
        
        let products = await Products.findAll({
            include: [
                {
                model: Categories,
                attributes: ["name"],
                through:{
                    attributes: [],
                },
               
            },

            {
                model: Brand,
                attributes: ["name"],              
            },
        
        ],})
        res.send(products)
    });

    const scores = [
        {id: 13, score: 2, coment: "No siento que vale lo que cuesta"},
        {id: 13, score: 5, coment: "Limpia la ropa y cuida el ambiente y mi bolsillo, me encata"},
        {id: 13, score: 3, coment: "Rinde mucho pero el aroma no perdura"},
        {id:1, score:5, coment:"Muy ricos, muy buena textura"},
        {id:1, score:3, coment:"Normal, safan"},
        {id:1, score:4, coment:"Muy buenos, siempre compro esta marca"},
        {id:2, score:1, coment:"No me gusto, no tiene gusto a nada"},
        {id:2, score:5, coment:"Rica y saludable"},
        {id:2, score:4, coment:"Deliciosa, la uso siempre"},
        {id:3, score:2, coment:"No me agrado mucho"},
        {id:3,score:5, coment:"Me encanto, muy suave"},
        {id:3, score:5, coment:"Saludable y sabroso"},
        {id:4, score:1, coment:"Baja calidad"},
        {id:4, score:3, coment:"Normal, recibis lo que pagas"},
        {id:4, score:2, coment:"Llenadores pero mucha grasa"},
        {id:5, score:5, coment:"Siempre compro esta marca, excelente calidad"},
        {id:5, score:5, coment:"Excelente relacion precio-calidad"},
        {id:5, score:4, coment:"Muy bueno pero medio caro"},
        {id:6, score:3, coment:"Normal pero no para cabellos grasos"},
        {id:6, score:5, coment:"Me encanta como me deja el pelo"},
        {id:6, score:5, coment:"Mas suavidad imposible"},
        {id:7, score:2, coment:"No es premium"},
        {id:7, score:1, coment:"Mala calidad"},
        {id:7, score:3, coment:"Lo justo y necesario"},
        {id:8, score:5, coment:"Muy buena felacion precio-calidad"},
        {id:8, score:4, coment:"Muy buena"},
        {id:8, score:4, coment:"La compro siempre"},
        {id:9, score:3, coment:"Safa, pero nada como la Cindor"},
        {id:9, score:4, coment:"Muy rica"},
        {id:9, score:2, coment:"No tiene mucho gusto"},
        {id:10, score:5, coment:"Mi marca favorita de te"},
        {id:10, score:2, coment:"Muy caros, hay nacionales mejores"},
        {id:10, score:5, coment:"Savor exquisito"},
        {id:11, score:5, coment:"A mi perro le encanta"},
        {id:11, score:3, coment:"Medio caro"},
        {id:11, score:5, coment:"Muy buena calidad"},
        {id:12, score:5, coment:"Me perro se queda contento"},
        {id:12, score:1, coment:"Malisimo"},
        {id:12, score:5, coment:"Indispensable para tu mascota"},
        {id:14, score:3, coment:"Duran lo necesario"},
        {id:14, score:5, coment:"Mis favoritos"},
        {id:14, score:5, coment:"Son lo mas"},
        {id:15, score:5, coment:"La mejor del mercado"},
        {id:15, score:2, coment:"Hay mejores"},
        {id:15, score:4, coment:"Buena y saludable"},
        {id:16, score:5, coment:"Excelente textura y sabor"},
        {id:16, score:2, coment:"Sobrevalorado"},
        {id:16, score:5, coment:"Cumplio ampliamente mis expectattivas"},
        {id:17, score:5, coment:"Mi marca favorita"},
        {id:17, score:5, coment:"Todo lo que esta bien"},
        {id:17, score:3, coment:"Normal, nada wow"},
        {id:18, score:5, coment:"Hace la diferencia esta linea"},
        {id:18, score:4, coment:"Nunca falta en mis desayunos"},
        {id:18, score:5, coment:"Muy buen aroma y sabor"},
        {id:19, score:3, coment:"Pasable"},
        {id:19, score:5, coment:"La amo, mi compa de aventuras"},
        {id:19, score:5, coment:"La mejor del mercado"},
        {id:20, score:3, coment:"Ni fu ni fa"},
        {id:20, score:5, coment:"Es lo mas"},
        {id:20, score:5, coment:"Muy buen precio-calidad"},
        {id:21, score:5, coment:"Ricas, mis hijos siempre la piden"},
        {id:21, score:4, coment:"Sabrosas, especial para el te"},
        {id:21, score:5, coment:"Muy buenas"},
        {id:22, score:5, coment:"Mis masticables favoritos"},
        {id:22, score:1, coment:"Mucha azucar"},
        {id:22, score:4, coment:"Siempre se los llevo de regalo a mis sobrinos"},
        {id:23, score:1, coment:"Muy acido"},
        {id:23, score:3, coment:"Cumple con su funcion"},
        {id:23, score:2, coment:"No es para recomendar pero safa"},
        {id:24, score:5, coment:"Calidad suprema"},
        {id:24, score:5, coment:"Solo compro esta marca"},
        {id:24, score:4, coment:"Nunca falla"},
        {id:25, score:3, coment:"Bueno"},
        {id:25, score:5, coment:"Muy sabroso"},
        {id:25, score:5, coment:"Real gusto a tomate"},
        {id:26, score:1, coment:"Mala calidad"},
        {id:26, score:5, coment:"La recomiendo para hacer pizza"},
        {id:26, score:3, coment:"Me gusta la textura de la masa final"},
        {id:27, score:5, coment:"La mas suave y rica"},
        {id:27, score:5, coment:"No me da acidez como otras"},
        {id:27, score:3, coment:"Esta buena pero hay mejores"},
        {id:28, score:4, coment:"Sabor a manzana dulce, mi preferido"},
        {id:28, score:2, coment:"Gusto artificial"},
        {id:28, score:5, coment:"Siempre compro esta marca, nunca falla"},
        {id:29, score:5, coment:"Limpia como nadie"},
        {id:29, score:1, coment:"Raya las superficies"},
        {id:29, score:5, coment:"Limpia profundamente"},
        {id:30, score:3, coment:"Medio picante"},
        {id:30, score:5, coment:"Mis comidas siempre quedan bien sabrosas"},
        {id:30, score:4, coment:"Muy bueno"},
        {id:31, score:5, coment:"Me encantan, sabor delicioso"},
        {id:31, score:5, coment:"Siempre los compro para regalar"},
        {id:31, score:4, coment:"Excelente calidad"},
        {id:32, score:2, coment:"No me gustaron"},
        {id:32, score:5, coment:"Me encantan"},
        {id:32, score:4, coment:"Delicioso"},
        {id:33, score:5, coment:"Saludable y rico"},
        {id:33, score:5, coment:"Los mejores ingredientes"},
        {id:33, score:5, coment:"Siempre compro esta marca"},
        {id:34, score:1, coment:"Muy caras"},
        {id:34, score:5, coment:"Siempre compro esta marca"},
        {id:34, score:4, coment:"Ricas y saludable"},
        {id:35, score:3, coment:"Mas o menos la calidad"},
        {id:35, score:5, coment:"Las usos siempre en empanadas"},
        {id:35, score:2, coment:"No me gustaron"},
        {id:36, score:3, coment:"Rico sabor a puro chocolate"},
        {id:36, score:1, coment:"Muy amargo"},
        {id:36, score:4, coment:"Lo compro siempre"},
        {id:37, score:5, coment:"Lo mejor de este mundo"},
        {id:37, score:3, coment:"Me gusta pero mucha azucar"},
        {id:37, score:3, coment:"Prefiero la version light"},
        {id:38, score:5, coment:"Muy refrescante"},
        {id:38, score:5, coment:"Nunca falta en mi mesa"},
        {id:38, score:5, coment:"Lo mejor del verano a 40 grados"},
        {id:39, score:5, coment:"Mi preferido"},
        {id:39, score:2, coment:"Solo porque me agarre una mala borrachera"},
        {id:39, score:5, coment:"El mejor"},
        {id:40, score:2, coment:"Prefiero Colgate"},
        {id:40, score:5, coment:"Mis hijos siempre me la piden"},
        {id:40, score:3, coment:"Muy buena"},
        {id:41, score:2, coment:"Mala calidad"},
        {id:41, score:5, coment:"La mejor que encontre"},
        {id:41, score:2, coment:"No deja buen color"},
        {id:42, score:5, coment:"Excelente"},
        {id:42, score:5, coment:"Muy buena"},
        {id:42, score:3, coment:"Precio elevado"},
        {id:43, score:5, coment:"El mejor regalo dia del padre"},
        {id:43, score:3, coment:"Esta bueno pero medio caro"},
        {id:43, score:4, coment:"Durable"},
        {id:44, score:5, coment:"El preferido de mi tio"},
        {id:44, score:5, coment:"Muy buen perfume"},
        {id:44, score:2, coment:"Caro"},
        {id:45, score:5, coment:"Funciono"},
        {id:45, score:2, coment:"No me dio resultado dijo el pelado"},
        {id:45, score:3, coment:"Parece bueno, veremos que pasa"},
        {id:46, score:5, coment:"Me dio resultado"},
        {id:46, score:3, coment:"No me convence"},
        {id:46, score:5, coment:"Son lo mas"},
        {id:47, score:5, coment:"Mi hijo muy contento"},
        {id:47, score:2, coment:"Puro marketing"},
        {id:47, score:5, coment:"Muy lindo"},
        {id:48, score:2, coment:"No es sbuena"},
        {id:48, score:5, coment:"La mejor del mercado"},
        {id:48, score:5, coment:"La super recomiendo"},
        {id:49, score:1, coment:"Malisima"},
        {id:49, score:5, coment:"Me funciono"},
        {id:49, score:4, coment:"Son lo mas"},
        {id:50, score:5, coment:"Ricas y nutritivas"},
        {id:50, score:5, coment:"Especial para el mate"},
        {id:50, score:3, coment:"No son tan buenas"},
        {id:51, score:5, coment:"Siempre me sacan e apuro"},
        {id:51, score:5, coment:"Rico sabor"},
        {id:51, score:3, coment:"Muy buena"}
    ];

    router.get('/comments', async (req, res) => {
        for(let c of scores){
            let comment = await Score.create({coment: c.coment, score: c.score});
            let product = await Products.findByPk(c.id)
            product.addScore(comment.id)

            let scores = await Score.findAll({
                where: { productId: c.id}
            })
            const qtty = scores.length
            let total = scores.reduce(function ( acc, va){
                return (acc + va.score)
              },0);
            let prom = Math.ceil(total/qtty)
            product.update({score_promedio: prom})

        }

        let response = await Score.findAll()
        res.send(response)
    })

module.exports = router