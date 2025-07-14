/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppNavigation from './app/navigation/AppNavigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
