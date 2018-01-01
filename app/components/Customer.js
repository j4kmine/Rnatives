import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {diffDate} from '../helpers/Helpers';
import AesCtr from '../Lib/AesCtr';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';
import { Container, Header, Title, Button, Left, Right, Body, Icon,Card,CardItem,Text,Item,Input,Content,Spinner } from 'native-base';
var SQLite = require('react-native-sqlite-storage')
var db =SQLite.openDatabase({name : "testDB"})
class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:"",
      name:"",
      alamat:"",
      access_token:"",
      expired_in:"" ,
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      next_page_url:'',
    };
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user_session', [], (tx, results) => {
          var len = results.rows.length;
          if(len > 0) {
              var row = results.rows.item(0);
              if(diffDate(row.expired_in) > 1){
                  this.setState({access_token: results.rows.item(0).access_token});
                  this.setState({expired_in: results.rows.item(0).expired_in});
              }

          }
          // for (let i = 0; i < len; i++) {
          //   let row = results.rows.item(i);
          //   console.log(`Record: ${row.name}`);
          //   this.setState({record: row});
          // }
           
          
        });
    });
   
  }

  handleFilter = () =>{
    this.setState(
      {
        page: 1,
        
      },
      () => {
        this.makeRemoteRequest();
      });
   
  }
  makeRemoteRequest = () => {
    const { page, seed ,phone,name,alamat} = this.state;
    const url = `http://45.63.62.230:8012/sys/public/api/client?page=${page}`;
    this.setState({ loading: true ,next_page_url:''});
    fetch(url, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "authorization": "Bearer "+ this.state.access_token,
          "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        nohp: this.state.phone,
        alamat: this.state.alamat,
        nama: this.state.name,
      }),
    })
     .then(res => res.json())
      .then(res => {
        let temp = res.data.data;
        console.log(temp);
        this.setState({
          data: page === 1 ? res.data.data : [...this.state.data, ...res.data.data],
          error: res.error || null,
          loading: false,
          refreshing: false,
          next_page_url:res.data.next_page_url,
        });
        
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
  LoadMore(){
    this.handleLoadMore();
  }
  handleLoadMore = () => {
  
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
   
  navigateToScreen = (route,state) => () => {
    const self = this;
     navigateAction = NavigationActions.navigate({
        routeName: route
      });   
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
       <Container>
        <Header>
          <Left>
            <Button transparent   onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text>Customer </Text>
          </Body>
          <Right />
        </Header>
        <Content>
           <Card>
            <CardItem>
              <Body>
                
             <Item floatingLabel>                
                    <Input placeholder="Phone"  onChangeText={(text)=>{
                      this.setState({phone:text});                    
                  }} />
                </Item>
                <Item floatingLabel>
                      <Input placeholder="Name" onChangeText={(text)=>{
                      this.setState({name:text});                   
                  }} />
                </Item>
                <Item floatingLabel>
                      <Input placeholder="Alamat" onChangeText={(text)=>{
                      this.setState({alamat:text});                   
                  }} />
                </Item>
                <Button rounded full primary onPress={()=>this.handleFilter()}>
                  <Text>Search</Text>
              </Button>
              
              </Body>
            </CardItem>
          </Card>
           { 

              this.state.loading ? (
                   <Spinner color='blue' />

              ):(
                 <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                      data={this.state.data}
                      renderItem={({ item }) => (
                        <ListItem
                          onPress={() => navigate("CustomerDetail", {data:item,access_token:this.state.access_token})}
                          roundAvatar
                          title={`${AesCtr.decrypt(item.CUST_VENDOR_NM,this.state.access_token,256)} ${AesCtr.decrypt(item.CUST_VENDOR_CD,this.state.access_token,256)}`}
                          subtitle={AesCtr.decrypt(item.PHONE_NO,this.state.access_token,256)}
                          avatar={{ uri: 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png' }}
                          containerStyle={{ borderBottomWidth: 0 }}
                        />
                      )}
                      keyExtractor={item => {AesCtr.decrypt(item.CUST_VENDOR_CD,this.state.access_token,256)}}
                      ItemSeparatorComponent={this.renderSeparator}
                      onEndReachedThreshold={50}
                    />
                  </List>
              )
           
            }
             { 
              this.state.next_page_url ? <Button rounded full primary onPress={()=>this.handleLoadMore()}>
                    <Text>Load More</Text>
                </Button>:<Text>''</Text>
                
              

              

            }
              
        </Content>
      </Container>
     
    );
  }
}

export default Page1;