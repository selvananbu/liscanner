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
import ScanResult from './src/item/scanresult'

import Utilities from './src/utilities/utilities'
import RackMenu from './src/rack/rackmenu'
import Commission from './src/commission/commissionmenu'



import Welcome from "./welcomescreen"

import ScanExample from './src/nativeconnector/scanconnector';
import MenuExample from './src/nativeconnector/menuconnector';

import allReducers from './src/liscannerreducer/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(allReducers);



type Props = {};
export default class App extends Component<Props> {

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      const scene = Actions.currentScene;
      if(scene == 'ItemMenu' ||  scene === 'Utilities' || scene === 'Commission' || scene === 'RackMenu'){
        ScanExample.setTitle("LiScanner");
        Actions.LiScannerMenu();
        return true;
      }
      else if(scene == 'ItemReadyQuantity' || scene === 'ItemReady' || scene === 'ItemBroken' || scene === 'ItemReload'){
         ScanExample.setTitle("LiScanner - Item");
          Actions.ItemMenu();
          return true;
      }
      else if(scene == 'ScanResult'){
         ScanExample.setTitle("LiScanner - Item - Ready");
         Actions.ItemReady();
         return true;
      }
      else{
        BackHandler.exitApp();
        return true;
      }
    });

    DeviceEventEmitter.addListener('showResult', function (e: Event) {
      if(e.key === "RACK"){
        Actions.ItemReady({result:e.result});
      }
      else{
        Actions.ScanResult({ keyId: e.key, result: e.result });
      }
    });
     MenuExample.show("LiScanner,Item,Rack,Commision,Utilities");
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeEventListener('hardwareBackPress');
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
           <Scene key="RackMenu" component={RackMenu} animation='fade' hideNavBar={true} initial={false}/>
           <Scene key="Commission" component={Commission} animation='fade' hideNavBar={true} initial={false}/>
           <Scene key="ItemReload" component={ItemReload} animation='fade' hideNavBar={true} initial={false}/>
           <Scene key="Utilities" component={Utilities} animation='fade' hideNavBar={true} initial={false}/>
         </Scene>
     </Router>
   </Provider>
);
}
}
