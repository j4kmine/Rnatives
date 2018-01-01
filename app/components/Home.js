import React, {Component} from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';


class Home extends Component {
 
  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent   onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}

export default Home;