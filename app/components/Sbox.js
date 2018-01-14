import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator } from "react-native";

import axios from 'axios';
import {NavigationActions} from 'react-navigation';
import {List,H1,H2,H3,Thumbnail,Form,Picker, Container, Header, Title, Button, Left, Right, Body, Icon,Card,CardItem,Text,Item,Input,Content,Spinner } from 'native-base';
class Sbox extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  		result:[],
	  		loading:false,
	  		num1:0,
	  		num2:0,
	  		num3:0,
	  		num4:0
	  		
	  		
	  };
	}
	hanldeAction(){
		this.setState({ loading: true});
		const { num1,num2,num3,num4} = this.state;
		fetch(`http://45.63.62.230:8012/sys/public/api/sbox/${num1}/${num2}/${num3}/${num4}`)
	    .then((response) => response.json())
	    .then((responseJson) => {
	      this.setState({ result: responseJson.data,loading: false});
	    })
	    .catch((error) => {
	       this.setState({ result:'error',loading: false})
	    })
	    
	

	}
	render(){
		return(
			<Container>
		        <Header />
		        <Content>
		          <Form>
		            <Item>
		              <Input placeholder="first input" onChangeText={(text)=>{
                      this.setState({num1:text});                    
                  }} />
		            </Item>
		            <Item>
		              <Input placeholder="first input" onChangeText={(text)=>{
                      this.setState({num2:text});                    
                  }} />
		            </Item>
		            <Item>
		              <Input placeholder="first input" onChangeText={(text)=>{
                      this.setState({num3:text});                    
                  }} />
		            </Item>
		            <Item>
		              <Input placeholder="first input" onChangeText={(text)=>{
                      this.setState({num4:text});                    
                  }} />
		            </Item>
		            <Button full primary onPress={()=>this.hanldeAction()}>
		              <Text>Calculate</Text>
		          </Button>
		          </Form>
		           { 
		           	 	this.state.loading?(
	                   		<Spinner color='blue' />
	              		):(

	              			<Card>
				            <CardItem>
				              <Body>
				                <H1>
				                   {this.state.result[0]}
				                </H1>
				                <H1>
				                   {this.state.result[1]}
				                </H1>
				                <H1>
				                   {this.state.result[2]}
				                </H1>
				                <H1>
				                   {this.state.result[3]}
				                </H1>
				              </Body>
				            </CardItem>
				          </Card>
	              		)

		           	}
		        </Content>
		      </Container>

		);
	}
}
export default Sbox;