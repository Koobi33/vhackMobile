import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { default as theme } from './custom-theme.json';

import BottomTabNavigator from './navigation/BottomTabNavigator';
// import useLinking from './navigation/useLinking';
import LessonScreen from './screens/LessonScreen';
import SubjectsListScreen from './screens/SubjectsList/SubjectsListScreen';
import SubjectScreen from './screens/Subject/SubjectScreen';
import AuthScreen from './screens/Auth/AuthScreen';
import { AuthContext } from './AuthContext';

const Stack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  const authContext = useMemo(
    () => ({
      signIn: async (token) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (token) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              {state.userToken == null ? (
                <>
                  <Stack.Screen
                    name="auth"
                    options={{headerShown: false}}
                    component={AuthScreen}
                  />
                </>

              ) : (
                <>
                  <Stack.Screen
                    name="Schedule"
                    options={{headerShown: false}}
                    component={BottomTabNavigator}
                  />
                  <Stack.Screen
                    name="Lesson"
                    component={LessonScreen}
                    options={({route}) => ({title: route.params.title})}
                  />
                  <Stack.Screen
                    name="subjectList"
                    component={SubjectsListScreen}
                    options={({route}) => ({title: route.params.title})}
                  />
                  <Stack.Screen
                    name="lessonAverage"
                    component={SubjectScreen}
                    options={({route}) => ({title: route.params.title})}
                  />
                </>
                )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
