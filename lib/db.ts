import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.HOST_NAME,
  port: 3306,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME || "root",
  password: process.env.PASSWORD || "",
});

export default async function executeQuery({
  query,
  values,
}: {
  query: string;
  values?: string[] | null | undefined;
}) {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.execute(query, values);
    connection.release();
    return results;
  } catch (error) {
    throw error;
  }
}

// export async function testDatabaseConnection() {
//   try {
//     const query = 'SELECT * FROM ticket LIMIT 1';
//     const results = await executeQuery({ query });
//     console.log('Database connection is working:', results);
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// // Call the test function
// testDatabaseConnection();
