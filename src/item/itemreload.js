/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlightStatic,
  Animated,
  Image,
  Easing,FlatList,TouchableHighlight,Alert,
} from 'react-native';

import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import { width, height, totalSize } from 'react-native-dimension';
import {Button,Container,Content,Header,Left} from 'native-base';

import ScanExample from '../nativeconnector/scanconnector';

import item from '../image/item.png';
import rack from '../image/rack.png';
import quantity from '../image/quantity.png';
import LiFlatList from './liflatlist';
export default class ItemReload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      GridViewItems: [
        {
          key:'0',
          text: 'Rack',
          MenuIcon_url:'src_image_rack'
        },
        {
          key: '1',
          text:'Item',
          MenuIcon_url:'src_image_item'
        },
      ],

      GridViewSubmitItems: [
        {
          key: '3',
          text:'READY'
        },
      ],
    };
  }

  onButtonClicked  = (item) => {
    if(item.key !== 3)
    ScanExample.startScan(item.key,this.props.barcode);
    else {
      //Start Ready Messgae
    }
  }


  render() {
    ScanExample.setTitle("Li.Scanner - Item - Reload");

    return (
    <Container>
      <LiFlatList Menu = {this.state.GridViewItems} columns = {1}  columns = {1} Gotomenu={(item)=> this.onButtonClicked.bind(this,item)}/>
      <LiFlatList Menu = {this.state.GridViewSubmitItems} columns = {1}  isReadyButton = {true} Gotomenu={(item)=> this.onButtonClicked.bind(this,item)}/>
  </Container>

);
}
}

const styles = StyleSheet.create({


});
