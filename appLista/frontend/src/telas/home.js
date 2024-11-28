import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Home = ({ navigation }) => {

  const [items, setItems] = useState([]);
  
  const fetchFavoritas = async () => {
    try {
        const response = await axios.get(`http://172.18.0.1:3000/lista`);
        const favoritas = response.data.filter(item => item.favorito === true); 
        setItems(favoritas); 
        console.log('Listas:', response.data);
        console.log('Favoritas:', favoritas);
    } catch (error) {
        console.error('Erro ao buscar sublistas:', error);
    }
};

useEffect(() => {
  fetchFavoritas();
}, []);

return (
  <View style={styles.container}>
    <View style={styles.favoritesSection}>
      <Text style={styles.sectionTitle}>Favoritas</Text>
      <ScrollView style={styles.limitedScroll}>
        {items.map((item) => (
          <View key={item.id} style={styles.box}>
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.name}</Text>
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
        ))}
      </ScrollView>
    </View>
    <View style={styles.recentSection}>
      <Text style={styles.sectionTitle}>Últimas Listas</Text>
      <ScrollView style={styles.limitedScroll}>
        {items.map((item) => (
          <View key={item.id} style={styles.box}>
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.name}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{item.categoria}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
    </View>
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('Listas')}
    >
      <Icon name="plus-circle" size={60} color="#4682b4" />
    </TouchableOpacity>

  </View>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 90,
  },
  favoritesSection: {
    padding: 20,
    backgroundColor: '#F7E8A4',
    borderRadius: 20,
    marginHorizontal: 35,
    marginBottom: 10,
    marginTop: 20,
    maxHeight: 270, 
  },
  recentSection: {
    padding: 20,
    backgroundColor: '#A9A9A9',
    borderRadius: 20,
    marginHorizontal: 35,
    marginBottom: 30,
    marginTop: 10,
    maxHeight: 270, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  limitedScroll: {
    maxHeight: 270, 
    paddingBottom: 20, 
  },
  box: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    flex: 1,
    fontSize: 16,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 12,
  },
  addButton: {

    bottom: -15, 
    left: 300, 
    width: 60, 
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,

  },
  
  favoritoButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



export default Home;
