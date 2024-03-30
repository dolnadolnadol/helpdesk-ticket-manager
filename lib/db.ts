import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: 'localhost',
    port: 3306,
    database: 'ticket',
    user: 'root',
    password: 'Abc@189',
  }
});
export default async function excuteQuery({ query, values } : {query: string, values?: string[] | null | undefined }) {
  try {
    let results;
    if (values) {
      results = await db.query(query, values);
    } else {
      results = await db.query(query);
    }
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}