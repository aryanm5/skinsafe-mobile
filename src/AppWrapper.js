import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import App from './App';

const AppWrapper = () => {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    );
};

export default AppWrapper;