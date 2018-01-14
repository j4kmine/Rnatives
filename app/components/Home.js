import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
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
  Icon,
  H1,
  H2,
  H3,
  Header,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import {BarChart} from 'react-native-charts-wrapper';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      current_value:false,

      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
          label: 'Poin Penjualan Per Bulan',
          config: {
            color: processColor('teal'),
            barSpacePercent: 40,
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        granularityEnabled: true,
        granularity : 1,
      }
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: ''})
    } else {
      this.setState({...this.state, selectedEntry: this.state.xAxis.valueFormatter[entry.x] })
      this.setState({...this.state, current_value: entry.y })
    }

    console.log(event.nativeEvent)
  }


  render() {
    return (
      <Container style={{flex: 1}}>
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
         { 
         this.state.current_value ?<H2 style={{ textAlign:'center',fontWeight: 'bold'}}>{`${this.state.selectedEntry} ${this.state.current_value}`}</H2>:<Text>''</Text>

      }
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chart: {
    flex: 1
  }
});

export default Home;