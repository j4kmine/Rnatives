import React, {Component} from 'react';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';
import { AppRegistry, Image, StatusBar ,Text} from "react-native";
import {
  Button,
  Container,
  List,
  ListItem,
  Item,
  Label,
  Input,
  Content,
  Toast,
  Icon
} from "native-base";
import {diffDate} from '../helpers/Helpers';
var SQLite = require('react-native-sqlite-storage')
var db =SQLite.openDatabase({name : "testDB"})
export default class Login extends Component{
 
  constructor(props) {
    super(props); 
    this.state = {
      access_token:"",
      email:"",
      password:"",
      expired_in:"",
      isValids:false    
    };
     
  }
  componentWillMount(){

    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user_session (id integer primary key, access_token text, expired_in text)');  
        tx.executeSql('SELECT * FROM user_session ', [], (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {

                var row = results.rows.item(0);
                if(diffDate(row.expired_in) > 1){

                    navigateAction = NavigationActions.navigate({
                      routeName: 'Home'
                    });
                    this.props.navigation.dispatch(navigateAction);
                 }
              
              }
          });

      });
  }
  handleLogin(){
      const self = this;
      const d = new Date(); // get current date
      d.setHours(d.getHours()+72);
      const dates = d.getDate() ;
      const date = d.getDate() ;
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      const init_date = `${month}/${date}/${year}`;  
    let diffDays = diffDate(init_date);       
    axios.post('http://45.63.62.230:8012/sys/public/api/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(response => { 
        console.log(response);
       let jokes = response.data;
       if (!jokes || jokes.length === 0) {
         throw new Error("end of pagination");
       }
       db.transaction((tx) => {
           tx.executeSql('CREATE TABLE IF NOT EXISTS user_session (id integer primary key, access_token text, expired_in text)');                 
            tx.executeSql('DELETE  FROM user_session ');
            tx.executeSql('INSERT INTO user_session (id, access_token,expired_in) VALUES (1,"'+response.data.access_token+'", "'+init_date+'")');
            tx.executeSql('SELECT * FROM  user_session ', [], (tx, results) => {
              if(results.rows.item(0).access_token){
                 Toast.show({
                    text: 'Success ...!',
                    position: 'bottom',
                    
                  })
                   navigateAction = NavigationActions.navigate({
                      routeName: 'Home'
                    });
                  this.props.navigation.dispatch(navigateAction);
              }
            });
         });
     
    })
    .catch(function (error) {
    Toast.show({
              text: 'Wrong password!',
              position: 'bottom',
              
            })
    });
  }
  _checkisValid(){
    const self = this;
    setTimeout(()=>{
      const {email,password} = self.state;
      if(email != "" && password != "" ){
        self.setState({isValids:true});
      }else{
        self.setState({isValids:false});
      }

    },1000);
  }
  renderButtons(){
    const self = this;
    return(      
        this.state.isValids?(

           <Button full primary onPress={()=>this.handleLogin()}>
              <Text>Login</Text>
          </Button>
        ):(
          <Button full light>
              <Text>Login</Text>
          </Button>
        )      
    );
  }
  render(){
    return (
      <Container>
        <Content style={{ paddingLeft: 15 , paddingRight: 15  }}>
          <Item floatingLabel>
                  <Label>Email</Label>
                    <Input onChangeText={(text)=>{
                      this.setState({email:text}); 
                      this._checkisValid();
                  }} />
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(text)=>{
                      this.setState({password:text}); 
                      this._checkisValid();
                  }} />
                </Item>
              {this.renderButtons()}
        </Content>
      </Container>
    );
  }

}