import {Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import Login from '../Login';
import Home from '../Home';
import {DimensionContextProvider} from '../../Context';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../store/store';
import {useEffect, useState} from 'react';
import Splash from '../Splash';
import CustomDrawer from '../../Components/CustomDrawer';
import CustomTabBar from '../../Components/CustomTabBar';
import Profile from '../Profile';
import Orders from '../Orders';
import Products from '../Products';
import Users from '../Users';
import ProductDetails from '../ProductDetails';
import OrderDetails from '../OrderDetails';
import CreateProduct from '../CreateProduct';
import Banners from '../Banners';
import Offers from '../Offers';
import Reviews from '../Reviews';



const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [isLoggedIn]);

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash"
        >
          {loading ? (
            <Stack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              {isLoggedIn ? (
                <Stack.Screen name="SideBar" component={SideBar} />
              ) : (
                <Stack.Screen name="Login" component={Login} />
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const Drawer = createDrawerNavigator();

const SideBar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Footer" component={Footer} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Footer = () => {
  const route = useRoute();
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="StackNav">
      <Tab.Screen name="StackNav">
        {(props) => <StackNav {...props} route={route} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const StackNavigator = createNativeStackNavigator();

const StackNav = ({ route }) => {
  const initialRoute = route?.params?.screen || 'Home';
  return (
    <StackNavigator.Navigator
     initialRouteName={initialRoute}
      screenOptions={{
      headerStyle: {
        backgroundColor:' #fff',
        height: 70,
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        marginRight: 10,
      },
      headerTintColor: '#000',
    }}>
      <StackNavigator.Screen name="Home" component={Home} />
      <StackNavigator.Screen name="Products" component={Products} />
      <StackNavigator.Screen name="Orders" component={Orders} />
      <StackNavigator.Screen name="Profile" component={Profile} />
      <StackNavigator.Screen name="Users" component={Users} />
      <StackNavigator.Screen name="ProductDetails" component={ProductDetails} />
      <StackNavigator.Screen name="OrderDetails" component={OrderDetails} />
      <StackNavigator.Screen name="CreateProduct" component={CreateProduct} />
      <StackNavigator.Screen name="Banners" component={Banners} />
      <StackNavigator.Screen name="Offers" component={Offers} />
      <StackNavigator.Screen name="Reviews" component={Reviews} />
      <StackNavigator.Screen name="CustomDrawer" component={CustomDrawer} />
    </StackNavigator.Navigator>
  );
};

export default App;
