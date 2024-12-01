import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddItemModal from '../componentes/addmodal';

const { width, height } = Dimensions.get('window');

const Listas = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchListas();
  }, []);

  const fetchListas = async () => {
    try {
      const response = await axios.get(`http://172.18.0.1:3000/lista`);
      setItems(response.data); 
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar as listas.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  const toggleFavorito = async (id, favoritoAtual) => {
    try {
      await axios.put(`http://172.18.0.1:3000/lista/${id}`, {
        favorito: !favoritoAtual, 
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, favorito: !favoritoAtual } : item
        )
      );
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao alterar o status de favorito.');
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.box}>
      <View style={styles.listItem}>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => navigation.navigate('SubLista', { itemId: item.id })}
        >
          <Text style={styles.listText}>{item.name}</Text>
    
        </TouchableOpacity>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.categoria}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoritoButton}
          onPress={() => toggleFavorito(item.id, item.favorito)}
        >
          <Icon
            name={item.favorito ? "star" : "star-o"} 
            size={24}
            color={item.favorito ? '#FFD700' : '#A9A9A9'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.recentSection}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Icon name="plus-circle" size={55} color="#4682b4"/>
      </TouchableOpacity>

      <AddItemModal
        isVisible={isModalOpen}
        toggleModal={toggleModal}
        fetchListas={fetchListas}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: width * 0.02,
  },
  recentSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    maxHeight: 645, 
  },
  box: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listButton: {
    flex: 1, 
    marginRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    minWidth: 70, 
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    width: 50,
    height: 65,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritoButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default Listas;
