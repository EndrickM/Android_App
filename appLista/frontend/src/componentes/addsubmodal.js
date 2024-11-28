import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const AddSubItemModal = ({ isVisible, addModal, fetchSublista, itemId }) => {
    const [name, setName] = useState('');

    const handleAddItem = async () => {
        if (!name) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            await axios.post(`http://172.18.0.1:3000/lista/${itemId}/sublista`, {
                name,
            });
            setName('');
            fetchSublista(itemId); 
            addModal(); 
        } catch (error) {
            console.log('Lista Id:', itemId);
            console.log('Item Nome:', name);
            console.error('Erro ao adicionar item:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o item.');
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={addModal}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.cancelButton} onPress={addModal}>
                        <Icon name="times-circle" size={40} color="#4682b4" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={styles.addButtonText}>Criar Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        height: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        marginTop: 50,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#4682b4',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
});

export default AddSubItemModal;
