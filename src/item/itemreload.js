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

  onActionButtonPressed  = (item) => {
    // if(item.key !== 3)
    // else {
    //   //Start Ready Messgae
    // }
  }


  render() {
    ScanExample.setTitle("LiScanner - Item - Reload");

    return (
    <Container>
      <LiFlatList Menu = {this.state.GridViewItems} isfinalScreen = {true} columns = {1}  columns = {1} Gotomenu={(item)=> this.onActionButtonPressed.bind(this,item)}/>
      <View style={{flexDirection:'row',alignContent:'space-around', justifyContent:'space-around'}}>
         <TouchableOpacity style={styles.undoButton } onPress={this.onActionButtonPressed.bind(this, 'UNDO')}>
         <Text style={styles.readyText}> UNDO  </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.readyButton } onPress={this.onActionButtonPressed.bind(this, 'READY')}>
          <Text style={styles.readyText}> READY  </Text>
         </TouchableOpacity>
       </View>
  </Container>

);
}
}

const styles = StyleSheet.create({
  undoButton: {
 		height:height(8),
 		width:width(48),
 		backgroundColor:'#881b4c',
 		alignItems:'center',
 		justifyContent:'center',
 		marginBottom:2,

 	  },
 	 readyButton: {
 		height:height(8),
 		width:width(48),
 		backgroundColor:'rgba(0,125,50,0.8)',
 		alignItems:'center',
 		justifyContent:'center',
 		marginBottom:2,
 	  },
 	  	readyText:{
 		color: '#fff',
 		fontSize: 20,
 		fontWeight: "bold"
 	  }

});
