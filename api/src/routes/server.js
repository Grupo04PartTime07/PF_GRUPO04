const { Router } = require('express');
const router = Router();
const {Products, Categories, Brand, Promotion} = require('../db');


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
    await Brand.bulkCreate([
        { name: 'Matarazzo', },
        { name: 'Natura' },
        { name: 'Pureza' },
        { name: 'Don Satur' },
        { name: 'Dermaglós' },
        { name: "L'oréal" },
        { name: 'Elegante' },
        { name: 'Veronica' },
        { name: 'Las Tres Niñas' },
        { name: 'Twinings' },
        { name: 'Maintenance Criadores' },
        { name: 'Dog Chow' },
        { name: 'Skip' },
        { name: 'Make' },
        { name: 'Glaciar' },
        { name: 'Rutini' },
        { name: 'Luigi Bosca' },
        { name: 'Stella Artois' },
        { name: 'Corona' },
        { name: 'Pozo' },
        { name: 'Flynn Paff' },
        { name: 'Menoyo' },
        { name: 'Ledesma' },
        { name: 'Noel' },
        { name: 'Morixe' },
        { name: 'Playadito' },
        { name: 'Alicante' },
        { name: 'Ferrero Rocher' },
        { name: 'Arcor' },
        { name: 'Granix' },
        { name: 'Pleny', image: "https:///res-console.cloudinary.com/dnxvoi5ro/thumbnails/transform/v1/image/upload/v1665959035/https:///res-console.cloudinary.com/dnxvoi5ro/thumbnails/transform/v1/image/upload//v1665959035/cGxlbnlfbmYwdXZs/drilldown" },
        { name: 'Águila', image: "https://seeklogo.com/images/C/cerveza-aguila-logo-F449B95D01-seeklogo.com.jpg" },
        { name: 'Coca-cola', image: "https://w7.pngwing.com/pngs/797/25/png-transparent-coca-cola-logo-coca-cola-fizzy-drinks-diet-coke-logo-cocacola-cdr-text-cola.png" },
        { name: 'Branca', image: "https://i.pinimg.com/originals/af/9b/bd/af9bbd2bed400b5c05d9dc0cfbd7a3bf.png" },
        { name: 'Odol', image: "https://www.sprchacek.cz/files/manufacturer_images/4828505318431391744_1.png" },
        { name: 'Just for Men', image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/logo-justformen-1550229554.png?resize=*:100" },
        { name: 'Gillette', image: "https://graffica.info/wp-content/uploads/2020/12/Gillette-Logo-2048x1161-3-2048x951-1-1200x720.png" },
        { name: 'Antonio Banderas', image: "https://www.logolynx.com/images/logolynx/cc/cc8a2a7039fe7180b804527f414560a7.jpeg" },
        { name: 'Boss', image: "https://www.hugoboss.com/on/demandware.static/Sites-US-Site/-/default/dw4fc964d1/svg/output_files/boss_logo.svg" },
        { name: 'Valcatil', image: "https://scontent.fmar7-1.fna.fbcdn.net/v/t1.6435-9/150934883_1081466895598548_2726792265028117390_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NHYjXjxVceYAX8oMiQS&_nc_ht=scontent.fmar7-1.fna&oh=00_AT8qRNK4ITUPRLGVeXYMS4sDDhZh1vTireCUNNHgn8jJow&oe=63729782" },
        { name: 'Megacistín', image: "https://www.megacistin.com.ar/sites/all/themes/theme1043/logo.png" },
        { name: 'Algabo', image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/130/470/themes/common/logo-1079655723-1657043240-e2f1a80fbbcef29907c1c9c6596452611657043240-480-0.png?0" },
        { name: 'Veet', image: "https://1000marcas.net/wp-content/uploads/2021/05/Veet-logo.png" },
        { name: 'Depimiel' , image: "http://tiendafresh.com.ar/guia.devenado.com/IMG/tienda-fresh-online-id15860subcat2-depimiel-w400-h500-m3.jpg_1-w400-h500-m3.jpg"},
        { name: 'Cariló', image: "https://http2.mlstatic.com/D_NQ_NP_810349-MLA49863344470_052022-O.webp" }
      ], { ignoreDuplicates: true})
let brands = await Brand.findAll();
    res.send(brands)
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
    "categories": ["Perfumeria", "Cuidado Personal"],
    "stock": 24,
    },
    {
    "name": "Acondicionador Hidratación Hialurónico Elvive L'oréal 400ml",
    "price": 828,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_935891-MLA47637134891_092021-O.webp"],
    "description": "Un cabello fresco, más vital y manejable en pocos pasos, de la mano de Elvive.",
    "id": "7",
    "brand":"L'oréal",
    "categories": ["Perfumeria", "Cuidado Personal"],
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
    "categories": ["Almacén", "Lácteos"],
    "stock": 48,
    },
    {
    "name": "Leche Chocolatada Parc Descremada Las Tres Niñas 200ml",
    "price": 110,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_648594-MLA49950042513_052022-O.webp"],
    "description": "Leche con cacao Fortificada con vitaminas A y D",
    "id": "10",
    "brand":"Las Tres Niñas",
    "categories": ["Almacén", "Lácteos", "Desayuno y Merienda"],
    "stock": 56,
    },
    {
    "name": "Te Twinings Frutilla Y Mango Infusion - Caja X10 Sobres",
    "price": 800,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_764232-MLA49314321027_032022-O.webp"],
    "description": "Contiene aromatizantes identicos al natural",
    "id": "11",
    "brand":"Twinings",
    "categories": ["Almacén", "Desayuno y Merienda"],
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
    "categories": ["Almacén", "Limpieza"],
    "stock": 18,
    },
    {
    "name": "Guante De Limpieza Make Latex Amarillo Tipo Mapa Plisse",
    "price": 236,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_904283-MLA49694159342_042022-O.webp"],
    "description": "Interior Afelpado, más resistentes",
    "id": "15",
    "brand":"Make",
    "categories": ["Almacén", "Limpieza"],
    "stock": 48,
    },
    {
    "name": "Agua mineral Glaciar sin gas botella 500 mL",
    "price": 110,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_948697-MLA43773897034_102020-O.webp"],
    "description": "Agua mineral baja en Sodio",
    "id": "16",
    "brand":"Glaciar",
    "categories": ["Agua", "Bebidas"],
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
    "categories": ["Bebidas", "Desayuno y Merienda"],
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
    "categories": ["Almacén", "Desayuno y Merienda"],
    "stock": 56,
    },
    {
    "name": "Flynn Paff Confitados 50g Caramelos Mastic. Sin Tacc",
    "price": 115,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_767212-MLA49161299159_022022-O.webp"],
    "description": "Sabores: Tutti Frutti, Anana, Uva y Limon",
    "id": "23",
    "brand":"Flynn Paff",
    "categories": ["Almacén", "Golosinas"],
    "stock": 26,
    },
    {
    "name": "Vinagre De Alcohol Menoyo Botella X 1 L",
    "price": 137,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_917882-MLA46995976880_082021-O.webp"],
    "description": "Libre de gluten, Sin T.A.C.C.",
    "id": "24",
    "brand":"Menoyo",
    "categories": ["Almacén", "Aceites y Vinagres"],
    "stock": 40,
    },
    {
    "name": "Azucar Ledesma Clásica Paquete 1 Kilo",
    "price": 250,
    "image": ["https://http2.mlstatic.com/D_NQ_NP_948863-MLA51093238321_082022-O.webp"],
    "description": "Azúcar Rubia, Sin T.A.C.C.",
    "id": "25",
    "brand":"Ledesma",
    "categories": ["Almacén", "Desayuno y Merienda", "Reposteria"],
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
    "price": 2990,
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

module.exports = router