import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.HOST_NAME,
    port:  3306,
    // port: process.env.PORT && parseInt(process.env.PORT) || 3306,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME || 'root',
    password: process.env.PASSWORD || '',
  }
});
export default async function excuteQuery({ query, values } : {query: string, values?: string[] | null | undefined }) {
  try {
    let results;
    if (values) {
      results = await db.query(query, values);
    } else {
      console.log(results+' and '+query);
      results = await db.query(query);
    }
    await db.end();
    return results;
  } catch (error) {
    return 'errr '+ error;
  }
}

// export async function testDatabaseConnection() {
//   try {
//     // Replace this query with a simple query that you expect to return some results
//     const query = 'SELECT * FROM ticket LIMIT 1';
//     const results = await excuteQuery({ query });
//     console.log('Database connection is working:', results);
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// // Call the test function
// testDatabaseConnection();