import React, { Component } from "react";
import { View,  FlatList, ActivityIndicator } from "react-native";
import {diffDate} from '../helpers/Helpers';
import AesCtr from '../Lib/AesCtr';
import axios from 'axios';
import { Container, Header, Content,Footer, Left,Body,Right,Button,Icon,Card,CardItem,List,ListItem,Text,Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-simple-modal';
var SQLite = require('react-native-sqlite-storage')
var db =SQLite.openDatabase({name : "testDB"})
class CustomerDetail extends Component{
	renderHeader(){
	  const {navigate} = this.props.navigation;
	return (
		<Header>
			<Left>
				<TouchableOpacity    onPress={() => navigate("Customer")}>
					<Icon name="arrow-back"/>
				</TouchableOpacity>
			</Left>
			<Body>
				<Text>Customer Detail</Text>
			</Body>
			<Right>
			</Right>
		</Header>
	);
}
	render(){
		const { params } = this.props.navigation.state;
		return(
			<Container>
				{this.renderHeader()}
				<Content>
					<List>
						<ListItem style={{ marginLeft: 0 }}>
							<Thumbnail square  size={80} style={{ paddingLeft: 10  }} source={{uri:'https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png'}} />
							<Body style={{ paddingLeft: 10  }}>
								<Text>{AesCtr.decrypt(params.data.CUST_VENDOR_NM,params.access_token,256)}</Text>
								<Text>{AesCtr.decrypt(params.data.GRP_PRJCT_CD,params.access_token,256)}</Text>
								
							</Body>
						</ListItem >
							<ListItem itemDivider style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>Wilayah</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.CONTACT,params.access_token,256)}</Text>
							</ListItem>
							<ListItem itemDivider>
								<Text style={{ paddingLeft: 10  }}>Kelurahan</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.KELURAHAN1,params.access_token,256)}</Text>
							</ListItem>
							<ListItem itemDivider style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>Alamat</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.ADDRESS1,params.access_token,256)}</Text>
							</ListItem>
							<ListItem itemDivider style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>Phone</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.PHONE_NO,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.PHONE_NO2,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.PHONE_NO3,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.PHONE_NO4,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text>{AesCtr.decrypt(params.data.PHONE_NO5,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.HP_NO1,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.HP_NO2,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.HP_NO3,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.HP_NO4,params.access_token,256)}</Text>
							</ListItem>
							<ListItem style={{ marginLeft: 0 }}>
								<Text style={{ paddingLeft: 10  }}>{AesCtr.decrypt(params.data.HP_NO5,params.access_token,256)}</Text>
							</ListItem>			
					
							
					</List>
					
				</Content>
			</Container>
		);
	}
}
export default CustomerDetail;