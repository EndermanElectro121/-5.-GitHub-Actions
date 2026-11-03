const {Client} = require('pg');
const client = new Client({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'myuser',
   password: process.env.DB_PASSWORD || 'mypassword',
   database: process.env.DB_NAME || 'mydb',
   port: process.env.DB_PORT || 5432,
});
async function connectToDatabase() {
  console.log('Спроба підключення до PostgreSQL...');
  try {
    await client.connect();
    console.log('Успішно підключено до бази даних PostgreSQL всередині Docker!');
    
    // Створюємо простий інтервал, щоб процес не завершувався і контейнер залишався працювати
    setInterval(() => {
      console.log('Застосунок Node.js працює та тримає зв’язок із БД...');
    }, 60000);

  } catch (err) {
    console.error('Помилка підключення до бази даних:', err.stack);
    process.exit(1);
  }
}
connectToDatabase();
