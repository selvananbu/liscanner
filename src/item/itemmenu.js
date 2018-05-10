import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,ImageBackground,
	TouchableOpacity,
	TouchableHighlightStatic,
	Animated,
	Easing,Text,FlatList,TouchableHighlight,Alert,
} from 'react-native';
import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import {Button,Container,Content,Header,Left} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';

import item_ready from '../image/item_ready.png';
import item_ready_qty from '../image/item_ready_qty.png';
import item_broken from '../image/item_broken.png';
import item_reload from '../image/item_reload.png';

import itemImage from '../image/item.png';
import rack from '../image/rack.png';
import quantity from '../image/quantity.png';

import ScanExample from '../nativeconnector/scanconnector';

export default class Item_menu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			GridViewItems: [
				{
				key: ' ITEM\n READY',
					MenuIcon_url:'src_image_item_ready'
				},
				{
				key: '  ITEM\n READY/QTY',
				MenuIcon_url:'src_image_item_ready_qty'
				},

				{
				key: ' ITEM\n BROKEN',
				MenuIcon_url:'src_image_item_broken'
				},
				{
				key: ' ITEM\n RELOAD',
				MenuIcon_url:'src_image_item_reload'
				},
				],
		};

		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	Gotomenu  = (item) => {
		if (item===" ITEM\n READY")
			{ Actions.ItemReady({title:'LiScanner - Item - Ready',GridViewItems:[		{
				  key:0,
					text: 'RACK',
					MenuIcon_url:'src_image_rack'
					},
					{
				  key:1,
					text: 'ITEM',
					MenuIcon_url:'src_image_item'
					},]}) }
		else if(item ==="  ITEM\n READY/QTY")
		{Actions.ItemReady({title:'LiScanner - Item - Ready/QTY',GridViewItems:[		{
			key:0,
			text: 'RACK',
			MenuIcon_url:'src_image_rack'
			},
			{
			key:1,
			text: 'ITEM',
			MenuIcon_url:'src_image_item'
			},
			{
			key:2,
			text: 'QUANTITY',
			MenuIcon_url:'src_image_quantity'
			},
		],
		isQtyReadyScreen:true
	 })}
		else if(item === " ITEM\n BROKEN")
			{Actions.ItemBroken()}
			else if(item === " ITEM\n RELOAD")
			 {Actions.ItemReady({title:'LiScanner - Item - Reload',GridViewItems:[		{
				 key:0,
				 text: 'RACK',
				 MenuIcon_url:'src_image_rack'
				 },
				 {
				 key:1,
				 text: 'ITEM',
				 MenuIcon_url:'src_image_item'
				 },
				]
			})}
		else{Alert.alert(item);}
		}

	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 100,
				easing: Easing.linear,
			}
		).start();

		setTimeout(() => {
			// Actions.pop();
			Actions.ScanMenu()
		}, 200);
	}



	render() {
	 ScanExample.setTitle("Li.Scanner - Item");
		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 40],
		});

		return (
		<Container>
			{/* <Wallpaper> */}
				<FlatList

					data={ this.state.GridViewItems }
					renderItem={({item}) =>{
					return (
						<View style={styles.GridViewBlockStyle}>
						<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}onPress={this.Gotomenu.bind(this, item.key)}>
						<Text style={styles.GridViewInsideTextItemStyle}  onPress={this.Gotomenu.bind(this,item.key)} > {item.key}  </Text>
						<Image
						 source={{uri:item.MenuIcon_url}}
						 style={styles.ImageIconStyle}
						 />
						</TouchableOpacity>
					 </View>
							);
											}
									}
					 numColumns={2}
				/>
			{/* </Wallpaper>	 */}
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
		height: height(42),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',
	  },
	  GridViewInsideTextItemStyle: {
		 color: '#881b4c',
		 padding: 10,
		 fontSize: 26,
		 fontWeight: 'bold',
		 fontFamily: 'roboto',
		 justifyContent: 'center',
	   },
	   ImageIconStyle: {
		padding: 10,
		margin: 5,
		height: 75,
		width: 75,
		resizeMode : 'stretch',

	 },

});
