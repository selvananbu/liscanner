import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,ImageBackground,
	TouchableOpacity,
	TouchableHighlightStatic,
	Animated,
	BackHandler,
	Easing,Text,FlatList,TouchableHighlight,Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
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

import LiScannerMenu from '../liscannermenu'

import ScanExample from '../nativeconnector/scanconnector';
import LiFlatList from './liflatlist';
import * as Action from '../liaction/index';

class ItemMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			GridViewItems: [
				{
					key:'0',
					text: ' ITEM\n READY',
					MenuIcon_url:'src_image_item_ready'
				},
				{
					key:'1',
					text: '  ITEM\n READY/QTY',
					MenuIcon_url:'src_image_item_ready_qty'
				},

				{
					key:'2',
					text: ' ITEM\n BROKEN',
					MenuIcon_url:'src_image_item_broken'
				},
			],
		};

		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	Gotomenu  = (item) => {
		if (item.text===" ITEM\n READY")
		{
			Actions.ItemReady({title:'LiScanner - Item - Ready'})
		}
		else if(item.text ==="  ITEM\n READY/QTY")
		{
			Actions.ItemReadyQuantity({title:'LiScanner - Item - Ready/QTY'})
		}
		else if(item.text === " ITEM\n BROKEN")
		{
			Actions.ItemBroken({title:'LiScanner - Item - Broken'})
		}
		else{
			Alert.alert(item.text);
		}
	}

	_onPress() {
		if (this.state.isLoading) return;
		this.setState({ isLoading: true });
	}

	componentDidMount(){
		ScanExample.setTitle("LiScanner - Item");
		this.props.setRack('');
		this.props.setBatch('');
		this.props.setReasonId('');
		this.props.setReasonChoicesUpdated(false);
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
				<TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
					<Text style={styles.GridViewInsideTextItemStyle} > {item.text} </Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={this.Gotomenu.bind(this, item)}>
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
		machineId:Action.setMachineId,
    setReasonId:Action.setReasonId,
    setReasonChoicesUpdated:Action.setReasonChoicesUpdated
	},dispatch)
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(ItemMenu);

const styles = StyleSheet.create({

	GridViewBlockStyle: {
		flex:1,
		height:height(88/3),
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

});
