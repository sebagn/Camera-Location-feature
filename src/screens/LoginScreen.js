import React, {useState, useReducer, useCallback} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {authenticate} from '../store/actions/auth.actions';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    dispatch(authenticate(isLogin, email, password))
    navigation.navigate('Direcciones');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <View style={styles.containerCard}>
        <Text style={styles.formTitle}>{isLogin ? 'Login' : 'Registro'}</Text>
        <View style={styles.containerForm}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.linkText}>
            {isLogin
              ? '¿No tienes una cuenta? registrate'
              : '¿Ya tienes una cuenta?'}
          </Text>
        </TouchableOpacity>
        <Button
          title={isLogin ? 'Ingresar' : 'Registrar'}
          color="#2e78b7"
          onPress={handleAuth}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerCard: {
    height: height / 2,
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerForm: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#333',
    fontSize: 16,
    marginBottom: 15,
  },
  linkText: {
    color: '#2e78b7',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
export default LoginScreen;
