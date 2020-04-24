import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabs from './components/BottomNavigation';


interface IMainProps { }

const Main: FC<IMainProps> = props => {
    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    );
};

export default Main;