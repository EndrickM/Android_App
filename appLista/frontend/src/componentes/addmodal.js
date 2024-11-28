import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const AddItemModal = ({ isVisible, toggleModal, fetchListas }) => {
    const [name, setName] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleAddItem = async () => {
        try {
            await axios.post('http://172.18.0.1:3000/lista', {
                name,
                categoria,
            });
            setName('');
            setCategoria('');
            fetchListas();  
            toggleModal();  
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={toggleModal}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                        <Icon name="times-circle" size={40} color="#4682b4"/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Categoria"
                        value={categoria}
                        onChangeText={setCategoria}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                        <Text style={styles.addButtonText}>Criar lista</Text>
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
        height: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 60,
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
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#4682b4',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 1,
    },
});

export default AddItemModal;
