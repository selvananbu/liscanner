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
import commission from './image/commission.png';
import utilities from './image/utilities.png';

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
			],
			MenuIcon_url:[
				{}
			]
		};
	}
	Gotomenu  = (item) => {
		if (item==="ITEM")
		{
			 Actions.ItemMenu()
		}
		else if (item==="RACK")
		{
			 Actions.RackMenu()
		}
		else if (item==="COMMISSION")
		{
			 Actions.Commission()
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
	}


	render() {
		return(this.returnView())
	}
	returnView(){
		return (
			<View style={{flex:1}}>
				<FlatList data={ this.state.GridViewItems} renderItem={({item}) =>{
						return(this.flatlistView(item));
					}
				}
				numColumns={2}
			/>
		</View>
	);
}
flatlistView(item){
	return(
		<View style={{flex:1}}>
			<View style={styles.GridViewBlockStyle}>
				<TouchableOpacity style={{height:1000,width:1000,alignItems: 'center', justifyContent:'center',}}onPress={this.Gotomenu.bind(this, item.key)}>
					<Text style={styles.GridViewInsideTextItemStyle} > {item.key} </Text>
				<Image source={{uri:item.MenuIcon_url}} style={styles.ImageIconStyle}/>
		</TouchableOpacity>
	</View>
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
		setSoftKey: Action.setSoftKey
	},dispatch)
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(LiScannerMenu);

const styles = StyleSheet.create({

	GridViewBlockStyle: {
		borderColor:'#000',
		borderWidth:1,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(41.5),
		margin: 6,
		//backgroundColor: 'rgba(134,27,76,0.8)',  //#00BCD4
		// backgroundColor:'transparent',
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
		padding: 10,
		margin: 5,
		height: 75,
		width: 75,
		resizeMode : 'stretch',

	},
	SeparatorLine :{

		backgroundColor : '#fff',
		width: 1,
		height: 40

	}
});
