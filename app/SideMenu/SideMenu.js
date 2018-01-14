/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { AppRegistry, Image, StatusBar ,Text,Alert} from "react-native";
import {
  Button,
  Left,
  Container,
  List,
  ListItem,
  Header,
  Content,
  Icon,
  Body,
  Right,
  Thumbnail
} from "native-base";
import {diffDate} from '../helpers/Helpers';
var SQLite = require('react-native-sqlite-storage')
var db =SQLite.openDatabase({name : "testDB"})
class SideMenu extends Component {
  constructor(props) {

    super(props);  
    this.state = {
      access_token: "",
      expired_in: ""
    };
     db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_session (id integer primary key, access_token text, expired_in text)');  
        tx.executeSql('SELECT * FROM user_session ', [], (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
                var row = results.rows.item(0);
                if(diffDate(row.expired_in) > 1){
                       this.setState({access_token: row.access_token})
                        this.setState({expired_in: row.expired_in});

                 }
              
              }
          });

      });
  }
  Alerts(){
    Alert.alert(
      'Sign out',
      'Are you sure want to exit',
      [
        
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.Logout()},
      ],
      { cancelable: false }
    )
  }
  Logout(){
     db.transaction((tx) => {
        tx.executeSql('DELETE  FROM user_session ');
         navigateAction = NavigationActions.navigate({
            routeName: 'Login'
          });
        this.props.navigation.dispatch(navigateAction);
      });
  }
  navigateToScreen = (route,state) => () => {
    const self = this;
     db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_session (id integer primary key, access_token text, expired_in text)');  
        tx.executeSql('SELECT * FROM user_session ', [], (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
                var row = results.rows.item(0);
                if(diffDate(row.expired_in) > 1){
                      self.setState({access_token: row.access_token});
                      self.setState({expired_in: row.expired_in});

                 }
              
              }
          });

      });
  
     let navigateAction = NavigationActions.navigate({
        routeName: route
      });
    if(state.access_token ==  '' || state.access_token == undefined ){
          if(route == 'Home'){
            navigateAction = NavigationActions.navigate({
              routeName: route
            });
          }else{
            navigateAction = NavigationActions.navigate({
              routeName: 'Login'
            });
          }                       
    }else{
        navigateAction = NavigationActions.navigate({
        routeName: route
      });
    }
   
    this.props.navigation.dispatch(navigateAction);
  }
 
 
  render () {
    return (
     <Container>
        <Content>
          <Header style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }} >  
            <Left>
              <Thumbnail source={{uri: 'http://96bda424cfcc34d9dd1a-0a7f10f87519dba22d2dbc6233a731e5.r41.cf2.rackcdn.com/TerlinGOCYCLE/img_generic_person.jpg'}} style={{
              width: 60,height: 60}} />
            </Left>
            <Body>
            </Body>
            <Right>
            </Right>
            </Header>
          <List >
            <ListItem style={{ marginLeft: 0 }}>
              <Icon name='home' style={{ paddingLeft: 10  }} />
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Home',this.state)}>Home</Text>
            </ListItem>
            <ListItem style={{ marginLeft: 0 }}>
               <Icon name='person' style={{ paddingLeft: 10  }} />
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Customer',this.state)}>Customer</Text>
            </ListItem>
            <ListItem style={{ marginLeft: 0 }}>
              <Icon name='flame' style={{ paddingLeft: 10  }} />
               <Text style={{ paddingLeft: 10  }}  onPress={this.navigateToScreen('Sales',this.state)}>Sales</Text>
            </ListItem>
            <ListItem style={{ marginLeft: 0 }}>
              <Icon name='cog' style={{ paddingLeft: 10  }} />
               <Text style={{ paddingLeft: 10  }}  onPress={()=>this.Alerts()}>Sign Out</Text>
            </ListItem>
           <ListItem style={{ marginLeft: 0 }}>
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Manual',this.state)}>Ekspansi Rcon</Text>
            </ListItem>
             <ListItem style={{ marginLeft: 0 }}>
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Ekspansi',this.state)}>Ekspansi</Text>
            </ListItem>
             <ListItem style={{ marginLeft: 0 }}>
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Sbox',this.state)}>Sbox</Text>
            </ListItem>
             <ListItem style={{ marginLeft: 0 }}>
               <Text  style={{ paddingLeft: 10  }} onPress={this.navigateToScreen('Mixcolumn',this.state)}>Mixcolumn</Text>
            </ListItem>
          </List>
          
        </Content>
      </Container>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
