/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Router from './app/routes';
import {AppRegistry} from 'react-native';
import { Root } from "native-base";
export default class Aweso extends Component {
  render () {
    return (
    	<Root>
	      <Router/>
	    </Root>
    );
  }
}

AppRegistry.registerComponent('Aweso', () => Aweso);
