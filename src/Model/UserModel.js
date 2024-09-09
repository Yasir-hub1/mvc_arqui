import DatabaseConnection from '../Database/db';

export class UserModel {
  constructor() {
    this.database = new DatabaseConnection();
    this.database.open();
  }

async  save(user) {
    return new Promise((resolve, reject) => {
      console.log("user ",user.email)
      this.database.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (name, email) VALUES (?, ?)',
          [user.name, user.email],
          (tx, result) => {
            console.log('Usuario guardado con éxito', result);
            resolve(result);
          },
          (tx, error) => {
            console.log('Error al guardar usuario', error);
            reject(error);
          }
        );
      });
    });
  }
  update(user) {
    return new Promise((resolve, reject) => {
      this.database.db.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET name = ?, email = ? WHERE id = ?',
          [user.name, user.email, user.id],  // Los datos a actualizar y el id del usuario
          (tx, result) => {
            console.log('Usuario actualizado con éxito', result);
            resolve(result);  // Resolver si la actualización es exitosa
          },
          (tx, error) => {
            console.log('Error al actualizar usuario', error);
            reject(error);  // Rechazar en caso de error
          }
        );
      });
    });
  }
  
  list() {
    return new Promise((resolve, reject) => {
      this.database.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (tx, result) => {
            // console.log('Usuarios obtenidos con éxito', result.rows._array);
            resolve(result.rows._array);
          },
          (tx, error) => {
            console.log('Error al obtener usuarios', error);
            reject(error);
          }
        );
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.database.db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM users WHERE id = ?',
          [id],
          (tx, result) => {
            console.log('Usuario eliminado con éxito', result);
            resolve(result);
          },
          (tx, error) => {
            console.log('Error al eliminar usuario', error);
            reject(error);
          }
        );
      });
    });
  }

  closeConnection() {
    this.database.close();
  }
}

export default UserModel;
