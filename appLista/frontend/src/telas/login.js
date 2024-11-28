import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Cadastro from './cadastro';   

const Login = ({ navigation }) => {
      const [form, setForm] = useState({
        email: '',
        password: '',
      });
    
      const handleSignIn = ({valueemail, valuepassword}) => {

        console.log(form);
        navigation.navigate('Home');  
      };
    
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>
                Second Memory <Text style={{ color: '#075eec' }}></Text>
              </Text>
            </View>
    
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="Email"
                  onChangeText={email => setForm({ ...form, email })}
                  placeholder="Digite um email"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  valueemail={form.email}
                />
              </View>
    
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={password => setForm({ ...form, password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  valuepassword={form.password}
                />
              </View>
    
              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleSignIn}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Entrar</Text>
                  </View>
                </TouchableOpacity>
              </View>
    
              <TouchableOpacity
                onPress={() => {
                  console.log('Forgot password');
                }}
              >
                <Text style={styles.formLink}>Esqueceu sua senha?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
    
          <TouchableOpacity
            onPress={() => {

              navigation.navigate('Cadastro');  
            }}
          >
            <Text style={styles.formFooter}>
              Não tem uma conta?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Crie uma</Text>
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        paddingVertical: 24,
        flexGrow: 1,
        flexShrink: 1,
      },
      title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
      },
      subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
      },
      header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
      },
      form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
      },
      formAction: {
        marginTop: 4,
        marginBottom: 16,
      },
      formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#075eec',
        textAlign: 'center',
      },
      formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
      },
      input: {
        marginBottom: 16,
      },
      inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
      },
      inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
      },
      btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
      },
      btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
      },
    });
    

export default Login;
