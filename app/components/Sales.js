import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator } from "react-native";
import {diffDate} from '../helpers/Helpers';
import AesCtr from '../Lib/AesCtr';
import {List,H1,H2,H3,Thumbnail,Form,Picker, Container, Header, Title, Button, Left, Right, Body, Icon,Card,CardItem,Text,Item,Input,Content,Spinner } from 'native-base';
var SQLite = require('react-native-sqlite-storage')
var db =SQLite.openDatabase({name : "testDB"})
class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bln:"",
      thn:"",
      status:"",
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
    const { page, seed } = this.state;
    const url = `http://45.63.62.230:8012/sys/public/api/sales?page=${page}`;
    this.setState({ loading: true ,next_page_url:''});
    fetch(url, {
      method: 'POST',
      headers: {
         "content-type": "application/x-www-form-urlencoded",
          "accept": "application/json",
          "authorization": "Bearer "+ this.state.access_token,
          "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        bln: this.state.bln,
        thn: this.state.thn,
        status: this.state.status,
      }),
    })
     .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: page === 1 ? res.data.data : [...this.state.data, ...res.data.data],
          error: res.error || null,
          loading: false,
          refreshing: false,
          next_page_url:res.data.next_page_url,
        });
        console.log(this.state.data);
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
  returnDataOnSelection(e){
    alert('Value : ' + e.value + ' Name : ' + e.name);
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
  onValueChangeBln(value: string) {
    this.setState({
      bln: value
    });
  }
  onValueChangeThn(value: string) {
    this.setState({
      thn: value
    });
  }
  onValueChangeStatus(value: string) {
    this.setState({
      status: value
    });
  }

  render() {
    return (
       <Container>
        <Header>
          <Left>
            <Button transparent   onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text>Sales </Text>
          </Body>
          <Right />
        </Header>
        <Content>
           <Card>
            <CardItem>
            <Content>
              <Form>                
                    <Picker
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.state.bln}
                          onValueChange={this.onValueChangeBln.bind(this)}
                        >
                          <Item label="January" value="01" />
                          <Item label="February" value="02" />
                          <Item label="March" value="03" />
                          <Item label="April" value="04" />
                          <Item label="May" value="05" />
                          <Item label="June" value="06" />
                          <Item label="July" value="07" />
                          <Item label="Augustus" value="08" />
                          <Item label="September" value="09" />
                          <Item label="October" value="10" />
                          <Item label="November" value="11" />
                          <Item label="December" value="12" />
                        </Picker>
                     <Picker
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.state.thn}
                          onValueChange={this.onValueChangeThn.bind(this)}
                        >
                          <Item label="2009" value="2008" />
                          <Item label="2010" value="2010" />
                          <Item label="2011" value="2011" />
                          <Item label="2012" value="2012" />
                          <Item label="2013" value="2013" />
                          <Item label="2014" value="2014" />
                          <Item label="2015" value="2015" />
                          <Item label="2016" value="2016" />
                          <Item label="2017" value="2017" />
                        </Picker>
                
                     <Picker
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.state.status}
                          onValueChange={this.onValueChangeStatus.bind(this)}
                        >
                          <Item label="Lunas" value="lunas" />
                          <Item label="Belum Lunas" value="belum_lunas" />
                        </Picker>
                    <Button rounded full primary onPress={()=>this.handleFilter()}>
                      <Text>Search</Text>
                  </Button>
              
              </Form>
              </Content>
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
                        <Card style={{flex: 0}}>
                          <CardItem>
                            <Left>
                              <Thumbnail source={{uri: 'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'}} />
                              <Body>
                                <Text>{AesCtr.decrypt(item.VENDOR_NM,this.state.access_token,256)}</Text>
                                <Text note>{AesCtr.decrypt(item.JRNLDESC,this.state.access_token,256)}</Text>
                              </Body>
                            </Left>
                          </CardItem>
                          <CardItem>
                            <Body>
                              
                              <H3>
                                Tagihan : Rp. {AesCtr.decrypt(item.HOPTFIELD5,this.state.access_token,256)}
                              </H3>
                            </Body>
                          </CardItem>
                          <CardItem>
                            <Left>
                              <Button transparent textStyle={{color: '#87838B'}}>
                                <Icon name="person" />
                                <Text>{ AesCtr.decrypt(item.PIC_CD,this.state.access_token,256)}</Text>
                              </Button>
                            </Left>
                          </CardItem>
                        </Card>
                      )}
                      keyExtractor={item => AesCtr.decrypt(item.JRNLDESC,this.state.access_token,256)}
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

export default Sales;