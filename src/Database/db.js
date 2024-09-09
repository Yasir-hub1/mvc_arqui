import * as SQLite from 'expo-sqlite';

class DatabaseConnection {
  constructor() {
    this.db = null;
  }

  createUserTable() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT ,
            email TEXT 
          );`,
          [],
          (tx, result) => {
            // console.log('Tabla de usuarios creada o ya existe.');
            resolve(result);
          },
          (tx, error) => {
            console.log('Error al crear la tabla de usuarios:', error);
            reject(error);
          }
        );
      });
    });
  }

  open() {
    if (!this.db) {
      this.db = SQLite.openDatabase('trainner1.db');
      // console.log('Conexión a la base de datos abierta');
      this.createUserTable();  // Asegúrate de que la tabla se crea cuando se abre la conexión
    }
  }

  close() {
    if (this.db) {
      this.db._db.close();
      this.db = null;
      // console.log('Conexión a la base de datos cerrada');
    }
  }
}

export default DatabaseConnection;
