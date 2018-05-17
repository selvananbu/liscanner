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

import ScanExample from '../nativeconnector/scanconnector';

import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';

import { OpenApiBody } from '../openapi/openapibody';
import { MimeTypes } from '../openapi/openapibody';

import * as Action from '../liaction/index';


import item from '../image/item.png';
import rack from '../image/rack.png';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import LiFlatList from './liflatlist';

var axios = require('axios');
var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720', 'DEMO', 'PROD');


class ItemReady extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			GridViewItems: [
				{
					key:'0',
					text: 'RACK',
					MenuIcon_url:'src_image_rack'
				},
				{
					key:'1',
					text: 'ITEM',
					MenuIcon_url:'src_image_item'
				}
			],

			GridViewSubmitItems: [
				{
					key:'0',
					text: 'UNDO',

				},
				{
					key:'1',
					text:'READY'
				}
			],
		};
	}

	Gotomenu  = (item) => {
		if (item.key=== '2')
		{
			ScanExample.startOrderApp(this.props.rack,this.props.item);
		}
		else if(item.key == '0'){
			ScanExample.startScan('RACK');
		}
		else if(item.key == '1'){
			ScanExample.startScan('ITEM');
		}
	}

	onActionButtonPressed = (item) => {
		
			if(item.key === '1'){
				console.log('====================================');
				if (Object.keys(this.props.obj.item) !== 0) {
					var itemId = this.props.obj.item;
					// obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(this.callbackWithArg.bind(this),itemId.orderNo,itemId.itemNo,item.pane,item.comp
					// ,item.partCnt,item,454,item.physRack);
				}
				console.log('====================================');
			}
			else if(item.key === '0'){
				console.log('====================================');
				if (Object.keys(this.props.obj.item) !== 0) {
					var itemId = this.props.obj.item;
					// obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(this.callbackWithArg.bind(this), itemId.orderNo, itemId.itemNo, item.pane, item.comp
					// 	,item,789,405, item.physRack);
				}
				console.log('====================================');
			}
	}

	callbackWithArg(responseData) {
		if (responseData !== null && responseData.state.response.data !== undefined && Object.keys(responseData.state.response.data).length !== 0) {
		}
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log(nextProps.result,'-------------');
	// 	// if(nextProps.result !== undefined){
	// 	// 	forceUpdate();
	// 	// }
	// 	return true;
	// }


	componentWillMount(){
		console.log(this.props.result,'abcdefg');
		if (this.props.result != undefined){
			this.props.setRack(this.props.result);
		}
	}



	render() {
		ScanExample.setTitle("Li.Scanner - Item - Ready");

		var isQtyReadyScreen = false;
		var result = '', res = '';
		if(Object.keys(this.props.obj.batch) !== 0){
			res = this.props.obj.batch.BATCH;
		}
		if (Object.keys(this.props.obj.rackId) !== 0 && this.props.result === undefined){
			result = this.props.obj.rackId.RACK;
		}
		else {
			result = this.props.result;
			
		}
		console.log(res,result,'inside');
		return (
			<Container>
				<LiFlatList Menu={this.state.GridViewItems} columns={1} itemcode={res} rackcode={result} Gotomenu={(item)=> this.Gotomenu.bind(this,item)}/>
			<Container>
				<FlatList
					data={ this.state.GridViewSubmitItems }
					renderItem={({item}) =>{
						return (
							<View style={styles.GridViewBlockStyle2}>
								<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}} onPress={this.onActionButtonPressed.bind(this, item)}>
									<Text style={styles.GridViewInsideTextItemStyle} onPress={this.onActionButtonPressed.bind(this,item)} > {item.text}  </Text>
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
	</Container>
</Container>
);
}
}

function mapStateToProps(state) {
	return {
		obj: state.ItemReady

	};
}

function  mapDispatchToProps(dispatch) {
	return  bindActionCreators({
		setRack:  Action.setRack,
		setBatch:  Action.setBatch,
		setItem: Action.setItem
	}, dispatch)
}

export default connect(
	mapStateToProps,mapDispatchToProps
)(ItemReady);





const styles = StyleSheet.create({

	GridViewBlockStyle: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(25),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',

	},
	GridViewBlockStyle2: {
		borderColor:'#881b4c',
		borderWidth:2,
		justifyContent: 'center',
		flexDirection:'row',
		flex:1,
		alignItems: 'center',
		height: height(10),
		paddingBottom:0,
		marginBottom:0,
		margin:2,
		padding:2,
		marginTop:40,
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
