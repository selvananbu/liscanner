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
import OrderPage from "./src/item/orderlisttest.js"
import Utilities from "./src/utilities/utilities.js"
import Commission from "./src/commission/commissionmenu.js"
import RackMenu from "./src/rack/rackmenu.js"


import LiListView from "./src/item/liflatlist.js"

import Welcome from "./welcomescreen"

import ScanExample from './src/nativeconnector/scanconnector';
import MenuExample from './src/nativeconnector/menuconnector';



import allReducers from './src/liscannerreducer/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(allReducers);



type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    DeviceEventEmitter.addListener('showResult', function (e: Event) {
      if(e.key === "RACK"){
        Actions.ItemReady({result:e.result});
      }
      else{
        Actions.ScanResult({ keyId: e.key, result: e.result });
      }
    });

    DeviceEventEmitter.addListener('showItem', function (e: Event) {
      Actions.ItemMenu();
    });
    DeviceEventEmitter.addListener('showItemReady', function (e: Event) {
      Actions.ItemReady();
    });
    DeviceEventEmitter.addListener('showRack', function (e: Event) {
      // Actions.RackMenu();
    });
    DeviceEventEmitter.addListener('showCommission', function (e: Event) {
      // Actions.CommissionMenu();
    });
    DeviceEventEmitter.addListener('showUtilities', function (e: Event) {
      // Actions.UtilitiesMenu();
    });

    DeviceEventEmitter.addListener('onBackPressed', function (e: Event) {
      const scene = Actions.currentScene;
      if(scene === null || scene === undefined){
        return true;
      }
      if (scene === 'LiScannerMenu' || scene === 'Welcome') {
        BackHandler.exitApp();
        return true;
      }
      if (scene == 'ItemMenu' ||  scene === 'Utilities' || scene === 'Commission' || scene === 'RackMenu'){
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

    // MenuExample.show("LiScanner,Item,Rack,Commision,Utilities");

  }

  componentWillUnmount() {
    DeviceEventEmitter.removeEventListener('onBackPressed');
  }

  constructor(props){
    super(props)
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Welcome" component={Welcome} animation='fade' hideNavBar={true} initial={true} />
      </Scene>
    </Router>
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
