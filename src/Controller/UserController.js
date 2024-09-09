import UserModel from '../Model/UserModel';
import { VUser } from '../View/VUser';

class UserController {
  constructor() {
    this.userModel = new UserModel();
    this.views = new VUser();
  }

  async createUser(userData) {
    try {
      // console.log("controller ", userData);
       await this.userModel.save(userData);
      // console.log("Usuario creado", user);
      const updatedUsers = await this.userModel.list();
      console.log("List Controller", updatedUsers);
      this.views.setTable(updatedUsers);
      return updatedUsers;
    } catch (error) {
      console.error('Error en createUser:', error);
    }
  }

   // Método para actualizar un usuario existente
   async updateUser(userData) {
    const success = await this.userModel.update(userData); // Actualizar el usuario en la base de datos
    if (success) {
      const updatedUsers = await this.userModel.list(); // Obtener la lista de usuarios actualizada
      return updatedUsers; // Devolver los usuarios actualizados
    }
    return [];
  }

  async deleteUser(id) {
    try {
      const success = await this.userModel.delete(id);
      if (success) {
        const updatedUsers = await this.userModel.list();
        this.views.setTable(updatedUsers);
        return updatedUsers;
      }
    } catch (error) {
      console.error('Error en deleteUser:', error);
    }
  }

  async findUser(id) {
    try {
      const user = await this.userModel.find(id);
      return user;
    } catch (error) {
      console.error('Error en findUser:', error);
    }
  }
}

export default UserController;
