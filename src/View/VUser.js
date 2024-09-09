import UserModel from "../Model/UserModel";

export class VUser {
  model = UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async getData() {
    let users = await this.userModel.list();
    return users;
  }

  // Este método ahora recibe los usuarios actualizados
  async setTable(rows) {
    console.log("Usuarios actualizados en la vista:", rows);
    return rows; // Devolvemos los datos actualizados
  }
}
