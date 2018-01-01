import Customer from './components/Customer';
import Sales from './components/Sales';
import Login from './components/Login';
import Home from './components/Home';
import CustomerDetail from './components/CustomerDetail';
import SideMenu from './SideMenu/SideMenu';
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
   Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Customer: {
    screen: Customer
  },
  Sales: {
    screen: Sales
  },
  CustomerDetail: {
    screen: CustomerDetail
  }
 
}, {
  contentComponent: SideMenu,
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});
