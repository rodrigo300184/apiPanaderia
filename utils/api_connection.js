import mysql from 'mysql2/promise';
import 'dotenv/config';

const userSQL = process.env.USER_SQL;
const databaseSQL = process.env.DB_NAME;
const passwordSQL = process.env.PASSWORD_SQL;
const port = process.env.PORT;


export const createDatabaseIfNotExists = async () => {
  try {
    // Conectarse al servidor MySQL sin seleccionar una base de datos.
    const connection = await mysql.createConnection({
      port: 3307,
      host: '127.0.0.1',
      user: userSQL,
      password: passwordSQL,
    });

    // Ejecutar consulta para crear la base de datos si no existe.
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseSQL}`);

    // Cerrar la conexión sin seleccionar una base de datos.
    await connection.end();

    
  } catch (error) {
    console.error('Error al crear o seleccionar la base de datos:', error);
    throw error;
  }
};

// Llamar a la función createDatabaseIfNotExists al iniciar la aplicación
createDatabaseIfNotExists();

const pool = mysql.createPool({
  port: 3307,
  host: '127.0.0.1',
  user: userSQL,
  database: databaseSQL,
  password: passwordSQL,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const selectQuery = async (query, values = []) => {
  const [result] = await pool.execute(query, values);
  return result;
};