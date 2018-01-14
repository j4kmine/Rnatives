import Customer from './components/Customer';
import Sales from './components/Sales';
import Login from './components/Login';
import Home from './components/Home';
import Manual from './components/Manual';
import Ekspansi from './components/Ekspansi';
import Sbox from './components/Sbox';
import Mixcolumn from './components/Mixcolumn';
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
  },
  Manual: {
    screen: Manual
  },
  Ekspansi: {
    screen: Ekspansi
  },
   Sbox: {
    screen: Sbox
  },
    Mixcolumn: {
    screen: Mixcolumn
  }
 
}, {
  contentComponent: SideMenu,
  drawerWidth: 300,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});
