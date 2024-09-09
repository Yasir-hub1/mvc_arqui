import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VUser } from '../View/VUser';
import UserController from '../Controller/UserController';

const UsersScreens = () => {
  const [userData, setUserData] = useState([]); // Estado para almacenar la lista de usuarios
  const [name, setName] = useState(''); // Estado para el campo de nombre
  const [email, setEmail] = useState(''); // Estado para el campo de email
  const [editingUser, setEditingUser] = useState(null); // Estado para identificar si estamos editando
  const userController = new UserController(); // Instanciamos el controlador

  // Función para obtener los usuarios
  const fetchUserData = async () => {
    const VUsers = new VUser();
    const data = await VUsers.getData(); // Obtenemos los datos de los usuarios
    setUserData(data); // Guardamos los datos en el estado
  };

  // Llamamos a fetchUserData al montar el componente
  useEffect(() => {
    fetchUserData(); // Cargamos los usuarios cuando el componente se monta
  }, []);

  // Función para crear o editar un usuario
  const handleSaveUser = async () => {
    if (editingUser) {
      // Editar usuario existente
      const updatedUser = { id: editingUser.id, name, email };
      await userController.updateUser(updatedUser);
    } else {
      // Crear nuevo usuario
      const newUser = { name, email };
      await userController.createUser(newUser);
    }

    // Limpiar los campos y el estado de edición
    setName('');
    setEmail('');
    setEditingUser(null);
    fetchUserData(); // Recargar los usuarios
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    await userController.deleteUser(id);
    fetchUserData(); // Recargar los usuarios
  };

  // Función para cargar los datos en los campos de edición
  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUser(user); // Marcamos el usuario que se está editando
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {editingUser ? 'Editar Usuario' : 'Crear Usuario'}
      </Text>

      {/* Formulario de Registro/Edición */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title={editingUser ? 'Actualizar Usuario' : 'Crear Usuario'} onPress={handleSaveUser} />

      {/* Lista de Usuarios */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>Lista de Usuarios:</Text>
      <FlatList
        data={userData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`ID: ${item.id}, Nombre: ${item.name}, Email: ${item.email}`}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditUser(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default UsersScreens;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
