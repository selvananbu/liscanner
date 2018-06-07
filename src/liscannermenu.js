import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,ImageBackground,
	TouchableOpacity,
	TouchableHighlightStatic,
	Animated,
	DeviceEventEmitter,
	BackHandler,
	Easing,Text,FlatList,TouchableHighlight,Alert,
} from 'react-native';
import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import {Button,Container,Content,Header,Left} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';

import item from './image/item.png';
import rack from './image/rack.png';
import item_delivery_note from './image/delivery_note.png';
import commission from './image/commission.png';
import utilities from './image/utilities.png';
import item_broken from './image/item_broken.png';
import item_reload from './image/item_reload.png';
import right_li from './image/right_dir.png';

import * as Action from './liaction/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import ScanExample from './nativeconnector/scanconnector';

const SIZE = window.width;

class LiScannerMenu extends Component {

	static testStatic = false;
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isSoftKeyEnabled: false,
			GridViewItems:
			[
				{
					key: 'ITEM',
					MenuIcon_url:'src_image_item'
				},
				{
					key: 'RACK',
					MenuIcon_url:'src_image_rack'
				},
				{
					key: 'COMMISSION',
					MenuIcon_url:'src_image_commission'
				},
				{
					key: 'UTILITIES',
					MenuIcon_url:'src_image_utilities'
				},
				{
					key: 'DELIVERY NOTE',
					MenuIcon_url:'src_image_delivery_note'
				},
			],
			MenuIcon_url:[
				{}
			]
		};
	}
	Gotomenu  = (item) => {
		console.log("Called");
		if (item==="ITEM")
		{
			this.props.clearItem();
			Actions.ItemMenu({title:'LiScanner - Item'})
		}
		else if (item==="RACK")
		{
			 Actions.RackMenu({title:'LiScanner - Rack'})
		}
		else if (item === "UTILITIES")
		{
			ScanExample.startSettings();
		}
		else
		Alert.alert(item);
	}

	componentDidMount(){
		ScanExample.setTitle("LiScanner");
		DeviceEventEmitter.addListener('onSoftKeyDisabled', function (e: Event) {
			if(e.softkey != null && e.softkey != undefined){
				this.props.setSoftKey(e.softkey)
			}
		}.bind(this));

		DeviceEventEmitter.addListener('sendWorkStepId', function (e: Event) {
			if(e.machineId != null && e.machineId != undefined){
				this.props.setMachineId(e.machineId);
			}
		}.bind(this));
		this.props.setReadyDisabled(false);
		this.props.setUndoDisabled(true);
	}


	render() {
		return(this.returnView())
	}
	returnView(){
		return (
			<View style={{flex:1,height:height(85),backgroundColor:'lightgrey'}}>
				<FlatList data={ this.state.GridViewItems} renderItem={({item}) =>{
					return(this.flatlistView(item));
				}
			}
			numColumns={1}
		/>
	</View>
);
}
flatlistView(item){
	return(
		<View style={styles.GridViewBlockStyle} >
			<View>
				<Image source={{uri:item.MenuIcon_url}} style={styles.ImageIconStyle} resizeMode='contain'/>
			</View>
			<View style={{width:width(70),justifyContent:'center',}}>
				<TouchableOpacity onPress={this.Gotomenu.bind(this, item.key)}>
					<Text style={styles.GridViewInsideTextItemStyle} > {item.key} </Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={this.Gotomenu.bind(this, item.key)}>
				<Image source={{uri:'src_image_right_dir'}} style={styles.ImageIconStyle2}  resizeMode='contain'/>
			</TouchableOpacity>
		</View>
	);
}
}
function mapStateToProps(state) {
	return {
		obj: state.ItemReady

	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		setRack: Action.setRack,
		setBatch: Action.setBatch,
		setSoftKey: Action.setSoftKey,
		clearItem: Action.clearItem,
		setMachineId:Action.setMachineId,
		setReadyDisabled: Action.setReadyDisabled,
		setUndoDisabled: Action.setUndoDisabled,
	},dispatch)
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(LiScannerMenu);

const styles = StyleSheet.create({

	GridViewBlockStyle: {
		flex:1,
		height:height(88/5),
		flexDirection:'row',
		backgroundColor: 'whitesmoke',
		borderTopColor:'#000',
		borderBottomColor:'#000',
		borderTopWidth:0.5,
		borderTopWidth:height(0.1),
		borderBottomWidth:height(0.1),
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowRadius: 20,
		elevation: 5,
	},
	GridViewInsideTextItemStyle: {
		paddingTop: 1,
		paddingBottom: 1,
		color: '#881b4c',
		fontSize: 26,
		textShadowOffset:{wdith:2.5,height:2},
		fontWeight: '400',
		textShadowColor:'lightgrey',
		justifyContent: 'center',
	},

	image: {
		width: 17,
		height: 17,
	},
	image2: {
		width: 20,
		height: 20,
	},
	item: {
		flex: 1,
		//width:200,
		height: 130,
		margin: 2,
	},
	list: {
		flex: 1,
	},
	ImageIconStyle: {
		padding: 0.5,
		marginHorizontal: width(2.5),
		paddingHorizontal: width(2),
		margin: 2,
		width: width(10),
		height: height(10),
		resizeMode : 'contain',

	},
	ImageIconStyle2: {
		marginLeft: 5,
		paddingHorizontal: 1,
		margin: 2,
		height: height(8),
		width: width(8),
		resizeMode : 'contain',

	},

	SeparatorLine :{
		backgroundColor : '#fff',
		width: 1,
		height: 40
	}
});
