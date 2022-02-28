import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import Input from '../components/Input';
import {authenticate} from '../store/actions/auth.actions';

const LoginScreen = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isNotValid, setIsNotValid] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();

  const dispatch = useDispatch();
  const handleAuth = () => {
    dispatch(authenticate(isLogin, email, password, navigation));
  };

  const onchange = (value, type) => {
    if (type === 'email') {
      setEmail(value);
    }
    if (type === 'password') {
      setPassword(value);
    }

    if (
      emailInput.current.state.validate &&
      passwordInput.current.state.validate
    ) {
      setIsNotValid(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, isKeyboardVisible && styles.containerKeyboard]}
      behavior="height"
      enabled>

      <View style={styles.containerCard}>
        <Text style={styles.formTitle}>{isLogin ? 'Login' : 'Registro'}</Text>

        <View style={styles.containerForm}>
          <Input
            ref={emailInput}
            label="Email"
            placeholder="Ingresa tu correo"
            placeholderTextColor="#999"
            keyboardType="email-address"
            type="email"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeInput={value => onchange(value, 'email')}
            maxLength={60}
          />
          <Input
            ref={passwordInput}
            label="Password"
            placeholder="ingresa tu contraseña"
            placeholderTextColor="#999"
            type="password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeInput={value => onchange(value, 'password')}
            value={password}
            maxLength={20}
          />
        </View>

        <View style={styles.botones}>
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
            onPress={() => handleAuth()}
            disabled={isNotValid}
          />
        </View>
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
  containerKeyboard: {
    justifyContent: 'flex-start',
  },
  containerCard: {
    marginVertical: 20,
    height: height * 0.6,
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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

  linkText: {
    color: '#2e78b7',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
export default LoginScreen;
