import sql from 'mssql';

const config = {
  "server": "DESKTOP-8G0DB69",
  "database": "TodoAppDB",
  "port": 1433,
  "username": "DESKTOP-8G0DB69\\USER",
  "options": {
    "encrypt": false, // Required for SSL
    "trustServerCertificate": true, // Accept self-signed cert,
  }
};

let connectionPool: sql.ConnectionPool;

export async function getTodoListAppDbConnection(): Promise<sql.ConnectionPool> {
  console.log('config', config)
  if (!connectionPool) {
    connectionPool = await sql.connect(config);
  }

  return connectionPool;
}