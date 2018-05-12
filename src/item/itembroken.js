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
import reason from '../image/reason.png';
import LiFlatList from './liflatlist';

export default class ItemBroken extends Component {
  constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
      GridViewItems: [
				{
				key:'0',
        text: 'Reason',
					MenuIcon_url:'src_image_reason'
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
  Gotomenu  = (item) => {

  }
	onButtonClicked  = (item) => {
        if(item.key !=='3')
                ScanExample.startScan(item.key,this.props.barcode);
        else {
                //Start Ready Messgae
        }
		}
	render() {
	 ScanExample.setTitle("Li.Scanner - Item  - Broken");

		return (
      <Container>
          <LiFlatList Menu = {this.state.GridViewItems} columns = {1} Gotomenu={(item)=> this.onButtonClicked.bind(this,item)}/>
          <LiFlatList Menu = {this.state.GridViewSubmitItems} columns = {1} isReadyButton = {true} Gotomenu={(item)=> this.onButtonClicked.bind(this,item)}/>
     </Container>
      );
	}
}
const styles = StyleSheet.create({

  GridViewBlockStyle: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(20),
		margin: 6,
		 backgroundColor: 'rgba(89,89,89,0.5)',

      },
      GridViewBlockStyle2: {
        borderColor:'#881b4c',
        borderWidth:2,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(10),
    marginTop: 45,
		margin: 2,
		backgroundColor: 'rgba(0, 150, 50,0.6)',

	  },
	  GridViewInsideTextItemStyle: {
		 color: '#881b4c',
		 padding: 5,
		 fontSize: 18,
		 fontWeight: 'bold',
		 fontFamily: 'roboto',
		 justifyContent: 'center',
	   },
	   GridViewInsideTextItemStyle2: {
		color: '#881b4c',
		padding: 1,
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'roboto',
		justifyContent: 'center',
	  },
       Heading: {
        color: '#fff',
        padding: 5,
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'roboto',
        justifyContent: 'center',
	  },
	  ImageIconStyle: {
		 height: 60,
		 width: 60,
		resizeMode : 'stretch',
	  },
	  ImageIconStyle2: {
		height: 30,
		width: 30,
	   resizeMode : 'stretch',
	 },


});
