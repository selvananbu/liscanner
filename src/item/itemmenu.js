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

import LiFlatList from './liflatlist';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
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
				{
					key:'3',
				text: ' ITEM\n RELOAD',
				MenuIcon_url:'src_image_item_reload'
				},
				],
		};

		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	Gotomainmenu  = (item) => {
		console.log("###",item);
		console.log("###",item.text);

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
			else if(item.text === " ITEM\n RELOAD")
			 {
				 Actions.ItemReload({title:'LiScanner - Item - Reload'})
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
			this.props.setRack(' ');
			this.props.setBatch(' ');
	}


	render() {
	 ScanExample.setTitle("Li.Scanner - Item");
   return (
			<Container>
					<LiFlatList Menu = {this.state.GridViewItems}  columns = {2} Gotomenu={(item)=> this.Gotomainmenu.bind(this,item)}/>
			</Container>
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
		setBatch: Action.setBatch
	},dispatch)
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(ItemMenu);

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
