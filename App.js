/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
  Alert,
  BackHandler
} from 'react-native';
import { CheckBox } from 'react-native-elements'

import { Router, Scene, Actions, ActionConst, Drawer } from 'react-native-router-flux';

import LiScannerMenu from './src/liscannermenu'
import ItemMenu from "./src/item/itemmenu"
import ItemReady from "./src/item/itemready"
import ItemReadyQuantity from './src/item/itemreadyquantity'
import ItemBroken from './src/item/itembroken'
import ItemReload from './src/item/itemreload'
import ScanResult from "./src/item/scanresult"

import Welcome from "./welcomescreen"

import ScanExample from './src/nativeconnector/scanconnector';


import allReducers from './src/liscannerreducer/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(allReducers);



type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    DeviceEventEmitter.addListener('showResult', function (e: Event) {

       Actions.ScanResult({keyId:e.key,result:e.result});
    });

    DeviceEventEmitter.addListener('onBackPressed', function (e: Event) {
      const scene = Actions.currentScene;

      if (scene === 'LiScannerMenu') {
        BackHandler.exitApp();
        return true;
      }
      if(scene == 'ItemMenu'){
        ScanExample.setTitle("LiScanner");
        Actions.LiScannerMenu();
        return true;
      }
      else if(scene == 'ItemReadyQuantity' || scene === 'ItemReady' || scene === 'ItemBroken' || scene === 'ItemReload'){
        ScanExample.setTitle("Li.Scanner - Item");
        Actions.ItemMenu();
        return true;
      }
      Actions.pop();
      return true;
    });

  }

  componentWillUnmount() {
    DeviceEventEmitter.removeEventListener('onBackPressed');
  }

  constructor(props){
    super(props)
  }
render() {
 return (
   <Provider store={store}>
<Router>
<Scene key="root">
<Scene key="LiScannerMenu" component={LiScannerMenu} animation='fade' hideNavBar={true} initial={true} />
<Scene key="ItemMenu" component={ItemMenu} animation='fade' hideNavBar={true} initial={false}/>
<Scene key="ItemReady" component={ItemReady} animation='fade' hideNavBar={true} initial={false}/>
<Scene key="ScanResult" component={ScanResult} animation='fade' hideNavBar={true} initial={false}/>
<Scene key="ItemReadyQuantity" component={ItemReadyQuantity} animation='fade' hideNavBar={true} initial={false}/>
<Scene key="ItemBroken" component={ItemBroken} animation='fade' hideNavBar={true} initial={false}/>
<Scene key="ItemReload" component={ItemReload} animation='fade' hideNavBar={true} initial={false}/>
</Scene>
</Router>
</Provider>

  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
