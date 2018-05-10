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

export default class ItemReadyQuantity extends Component {
  constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			GridViewItems: [
				{
				key: 0,
        text: 'Rack',
					MenuIcon_url:'src_image_rack'
				},
				{
				key: 1,
        text:'Item',
				MenuIcon_url:'src_image_item'
				},
				{
				key: 2,
        text:'Quantity',
        MenuIcon_url:'src_image_quantity'
				},
				],

        GridViewSubmitItems: [
          {
            key: 3,
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
	 ScanExample.setTitle("Li.Scanner - Item - Ready/QTY");

		return (
      <Container>
          <FlatList
            data={ this.state.GridViewItems }
            renderItem={({item}) =>{

              var isRack = false;
              var barcode = "";
              if(this.props.barcode != null)
                barcode = this.props.barcode.orderNo;
              if(item.key == "RACK" && this.props.barcode != null)
                  isRack = true;
                          return (
                  <View style={styles.GridViewBlockStyle}>
                                      <TouchableOpacity style={{height:1000,width:1000,alignItems: 'center', justifyContent: 'center',}}onPress={this.onButtonClicked.bind(this, item.key)}>
                                      <Text style={styles.GridViewInsideTextItemStyle}  onPress={this.onButtonClicked.bind(this,item.key)} > {item.text}  </Text>


                      <Text style={styles.GridViewInsideTextItemStyle} >
                        {isRack ? barcode : this.props.rackId }
                      </Text>
                      <Image
                      source={{uri:item.MenuIcon_url}}
                      style={styles.ImageIconStyle}
                      />
                                      </TouchableOpacity>

                                  </View>);
                        }
                  }
             numColumns={1}
          />
          <View>
                <FlatList
                          data={ this.state.GridViewSubmitItems }
                          renderItem={({item}) =>{
                              return (
                <View style={styles.GridViewBlockStyle2}>
                  <TouchableOpacity style={{height:1000,width:1000,alignItems: 'center', justifyContent: 'center',}}onPress={this.onButtonClicked.bind(this, item.key)}>
                    <Text style={styles.GridViewInsideTextItemStyle2}  onPress={this.onButtonClicked.bind(this,item.key)} > {item.text}  </Text>
                    <Image
                      source={{uri: item.MenuIcon_url}}
                      style={styles.ImageIconStyle2}
                    />
                  </TouchableOpacity>
                              </View>);
                                                  }
                                      }
                          numColumns={1}
                      />
                  </View>
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
