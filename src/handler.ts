
import { createConnection } from 'mysql2/promise';

export const handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const connection = await createConnection({
    host: 'mkpdbrds.c7oeaec8cvh1.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '2c254e5621',
    database: 'mkprds',
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM products');
    await connection.end();
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    await connection.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error querying database', error }),
    };
  }
};

const event = {
	  body: JSON.stringify({}),
};
const context = {};

handler(event, context).then((response) => {
  console.log(response);
});
