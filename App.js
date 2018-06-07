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
import ItemBroken from './src/item/itembroken'
import ItemReload from './src/item/itemreload'
import ScanResult from './src/item/scanresult'
import ItemReadyQuantity from './src/item/itemreadyquantity'
import ReadyQuantityScanResult from './src/item/itemreadyquantityscanresult'

import Utilities from './src/utilities/utilities'
import RackMenu from './src/rack/rackmenu'
import Commission from './src/commission/commissionmenu'

import RackPrint from './src/rack/rackprint'
import RackScanResult from './src/rack/rackscanresult'




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

    BackHandler.addEventListener('hardwareBackPress',this.hardwareBackPress.bind(this));


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

  hardwareBackPress(){
    const scene = Actions.currentScene;
    console.log(scene);
    if(scene == 'Item' || scene === 'Rack' || scene === 'Commission' || scene === 'Utilities' || scene === 'Delivery Note'){
      this.hardwareBackPressCase00();
      return true;
    }
    else if(scene == 'ItemReadyQuantity' || scene === 'ItemReady' || scene === 'ItemBroken' || scene === 'ItemReload'){
      this.hardwareBackPressCase01();
      return true;
    }
    else if(scene=="RackPrint"){
      this.hardwareBackPressCase02();
      return true;
    }
    else if(scene == 'Commission'){
      this.hardwareBackPressCase03();
      return true;
    }
    else if(scene == 'ScanResult'){
      this.hardwareBackPressCase4();
      return true;
    }
    else if(scene == 'LiScannerMenu'){
      // BackHandler.exitApp();
      this.alertToExitApp();
      return true;
    }
    else{
      this.hardwareBackPressCaseDefault();
      return true;
    }
  }
  hardwareBackPressCase00(){
    ScanExample.setTitle("LiScanner");
    Actions.LiScannerMenu();
  }
  hardwareBackPressCase01(){
    ScanExample.setTitle("LiScanner - Item");
    Actions.ItemMenu();
  }
  hardwareBackPressCase02(){
    ScanExample.setTitle("LiScanner - Rack");
    Actions.RackMenu();
  }
  hardwareBackPressCase03(){
    ScanExample.setTitle("LiScanner - Commission");
    Actions.CommissionMenu();
  }
  hardwareBackPressCase4(){
    ScanExample.setTitle("LiScanner - Item - Ready");
    Actions.ItemReady();
  }
  hardwareBackPressCaseDefault(){
    Actions.LiScannerMenu();
  }

  alertToExitApp(){
    Alert.alert('LiScanner','Do you want to close the Application?', [
      {text:'Yes', onPress:() => BackHandler.exitApp()},
      {text:'No',onPress:() => console.log("EXIT NO")}
    ],
  ) 
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
          <Scene key="ItemReadyQuantity" component={ItemReadyQuantity} animation='fade' hideNavBar={true} initial={false}/>
          <Scene key="ReadyQuantityScanResult" component={ReadyQuantityScanResult} animation='fade' hideNavBar={true} initial={false}/>

          <Scene key="RackMenu" component={RackMenu} animation='fade' hideNavBar={true} initial={false}/>
          <Scene key="RackPrint" component={RackPrint} animation='fade' hideNavBar={true} initial={false}/>
          <Scene key="RackScanResult" component={RackScanResult} animation='fade' hideNavBar={true} initial={false}/>

          <Scene key="Commission" component={Commission} animation='fade' hideNavBar={true} initial={false}/>
          <Scene key="ItemReload" component={ItemReload} animation='fade' hideNavBar={true} initial={false}/>
          <Scene key="Utilities" component={Utilities} animation='fade' hideNavBar={true} initial={false}/>
        </Scene>
      </Router>
    </Provider>
  );
}
}
