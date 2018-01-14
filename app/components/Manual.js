import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator } from "react-native";

import axios from 'axios';
import {NavigationActions} from 'react-navigation';
import {List,H1,H2,H3,Thumbnail,Form,Picker, Container, Header, Title, Button, Left, Right, Body, Icon,Card,CardItem,Text,Item,Input,Content,Spinner } from 'native-base';
class Manual extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  		result:[],
	  		loading:false,
	  		num1:0,
	  		num2:0,
	  		num3:0,
	  		num4:0,
	  		num5:0,
	  		num6:0,
	  		num7:0,
	  		num8:0,
	  		column:0
	  };
	}
	hanldeAction(){

		   this.setState({ loading: true});
			const { num1,num2,num3,num4,num5,num6,num7,num8,column } = this.state;
			alert(`http://45.63.62.230:8012/sys/public/api/rcon/${num1}/${num2}/${num3}/${num4}/${column}/${num5}/${num6}/${num7}/${num8}`);
			fetch(`http://45.63.62.230:8012/sys/public/api/rcon/${num1}/${num2}/${num3}/${num4}/${column}/${num5}/${num6}/${num7}/${num8}`)
		    .then((response) => response.json())
		    .then((responseJson) => {
		      this.setState({ result: responseJson.data,loading: false});
		    })
		    .catch((error) => {
		       this.setState({ loading: false})
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
		            <Item last>
		              <Input placeholder="second input" onChangeText={(text)=>{
                      this.setState({num2:text});                    
                  }} />
		            </Item>
		            <Item last>
		              <Input placeholder="third input" onChangeText={(text)=>{
                      this.setState({num3:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="fourth input" onChangeText={(text)=>{
                      this.setState({num4:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="fifth input" onChangeText={(text)=>{
                      this.setState({num5:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="sixth input" onChangeText={(text)=>{
                      this.setState({num6:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="seven input" onChangeText={(text)=>{
                      this.setState({num7:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="eight input" onChangeText={(text)=>{
                      this.setState({num8:text});                    
                  }}/>
		            </Item>
		            <Item last>
		              <Input placeholder="column" onChangeText={(text)=>{
                      this.setState({column:text});                    
                  }}/>
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
export default Manual;