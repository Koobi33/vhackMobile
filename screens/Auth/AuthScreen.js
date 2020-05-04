import React, { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon, Button, Spinner } from '@ui-kitten/components';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../AuthContext';

const AuthScreen = () => {

  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = useState('ppetrov');
  const [password, setPassword] = useState('12345');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size='small'/>
    </View>
  );

  const handleLoading = async () => {
    setLoading(!loading);
    const token = await AuthService.login({ username, password });
    signIn(token);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout level="1" style={styles.container}>
        <Text style={styles.label}>Команда: Я_Сделаль</Text>
        <Text style={styles.label}>Трек: Образование</Text>
        <View style={styles.formField}>
          <Input
            value={username}
            label={() => <Text style={styles.label}>Логин</Text>}
            placeholder='Введите логин'
            onChangeText={nextValue => setUsername(nextValue)}
          />
        </View>
        <View style={styles.formField}>
          <Input
            value={password}
            label={() => <Text style={styles.label}>Пароль</Text>}
            placeholder='Введите пароль'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={nextValue => setPassword(nextValue)}
          />
        </View>
        <Button style={styles.button} disabled={!password.length || !username.length} onPress={handleLoading} appearance='outline' accessoryLeft={loading ? LoadingIndicator : null} >
          ВХОД
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formField: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // flexBasis: '16%',
    width: '100%',
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#8F9BB3',
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
    width: 120,
  }
});

export default AuthScreen;
