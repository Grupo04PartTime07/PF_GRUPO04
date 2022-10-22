const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Categories = require('./src/models/Categories.js');
const { PORT = 3001 } = process.env



conn.sync({ alter:true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
  });
});
