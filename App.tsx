import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import * as Contacts from 'expo-contacts';
import SplashScreen from 'react-native-splash-screen';
import { Gyroscope } from 'expo-sensors';

import store from './src/tools/store';
import Main from './src/Main';

export default function App() {



    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
