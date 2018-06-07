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
import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import {Button,Container,Content,Header,Left} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';
var axios = require('axios');
import ScanExample from '../nativeconnector/scanconnector';
import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';
import { OpenApiBody } from '../openapi/openapibody';
import { MimeTypes } from '../openapi/openapibody';
import * as Action from '../liaction/index';

import LiScannerMenu from '../liscannermenu'

import item from '../image/item.png';
import rack from '../image/rack.png';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import LiFlatList from './liflatlist';
import MenuConnector from '../nativeconnector/menuconnector';

var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720', 'DEMO', 'PROD');

class ItemReady extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			disableReady: false,
			disableUndo: true,
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
					text: 'READY',
				},
			],
		};
	}

	Gotomenu  = (item) => {
		console.log("ITEN",item);
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
		if(item === 'UNDO'){
			this.props.setReadyDisabled(true);
			this.props.setUndoDisabled(false);
			this.setState({disableReady:true,disableUndo:false});
		}
		else if(item === 'READY'){
			this.props.setReadyDisabled(false);
			this.props.setUndoDisabled(true);
			this.setState({disableReady:false,disableUndo:true});
		}
	}
	callbackWithArg(responseData) {
		console.log("Response For Ready",responseData.state.response.status);
		if (responseData !== null && responseData.state.response.status === 200)
		{
			MenuConnector.showToast("Action Sucessfull");
		}
	}

	updateText(text,item){
		console.log("Here",text,item);
		if(item.key == '0'){
			// Actions.ItemReady({result:text});
		}
		else if(item.key == '1'){
			// Actions.ScanResult({ keyId: 'ITEM', result: text});
		}
	}

	componentDidMount(){
		ScanExample.setTitle("LiScanner - Item - Ready");
		if (this.props.result != undefined){
			this.props.setRack(this.props.result);
		}
		if (Object.keys(this.props.obj.item).length !== 0){

			var disabledReady = false;
			var disabledUndo  = true;

			if (Object.keys(this.props.obj.readyDisabled).length !== 0 && Object.keys(this.props.obj.readyDisabled) !== undefined){
				disabledReady = this.props.obj.readyDisabled.READYDISABLED;
			}
			if (Object.keys(this.props.obj.undoDisabled).length !== 0 && Object.keys(this.props.obj.undoDisabled) !== undefined){
				disabledUndo = this.props.obj.undoDisabled.UNDODISABLED;
			}

			if(!disabledReady){
				if(this.props.obj.item.ITEM.part[0].prodStatus === 30) 	{
					MenuConnector.showToast("Item Already Ready");
					return;
				}
			}
			var itemId = this.props.obj.item.ITEM;
			if(itemId === undefined) return;
			var machineId = 405;
			if (Object.keys(this.props.obj.machineId).length !== 0 && Object.keys(this.props.obj.machineId) !== undefined){
				machineId = this.props.obj.machineId.MACHINEID;
			}
			if (disabledReady === false) {
				{itemId.part.map((value, elem) => {
					obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(this.callbackWithArg.bind(this), itemId.orderNo, itemId.itemNo, itemId.pane, itemId.comp,
					value.partCnt,itemId.stepNo,machineId,this.props.obj.rackId.RACK);
				})}
			}
			else if (disabledUndo === false) {
				{itemId.part.map((value, elem) => {
					obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(this.callbackWithArg.bind(this), itemId.orderNo, itemId.itemNo, itemId.pane, itemId.comp,
					value.partCnt,itemId.stepNo,machineId,this.props.obj.rackId.RACK);
				})}
			}
		}
	}
	render() {

		var isQtyReadyScreen = false;
		var result = '', res = '';
		var isSoftKeyEnabledVar = true;
		if(Object.keys(this.props.obj.batch) !== 0){
			res = this.props.obj.batch.BATCH;
		}
		if (Object.keys(this.props.obj.rackId) !== 0 && this.props.result === undefined){
			result = this.props.obj.rackId.RACK;
		}
		else {
			result = this.props.result;
		}

		return (this.returnView(result,res,isSoftKeyEnabledVar));
	}
	returnView(result,res,isSoftKeyEnabledVar){
		self=this;
		var disabledReady = false;
		var disabledUndo  = true;

		if (Object.keys(this.props.obj.readyDisabled).length !== 0 && Object.keys(this.props.obj.readyDisabled) !== undefined){
			disabledReady = this.props.obj.readyDisabled.READYDISABLED;
		}
		if (Object.keys(this.props.obj.undoDisabled).length !== 0 && Object.keys(this.props.obj.undoDisabled) !== undefined){
			disabledUndo = this.props.obj.undoDisabled.UNDODISABLED;
		}
		return (
			<Container>
				<LiFlatList Menu = {this.state.GridViewItems} isfinalScreen = {true} columns = {1} rackcode={result} itemcode={res}  Gotomenu={(item)=> this.Gotomenu.bind(this,item)}/>
				<View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
					<TouchableOpacity style={disabledUndo ? styles.undoButtonDisabled : styles.undoButton } onPress={this.onActionButtonPressed.bind(this, 'UNDO')}>
						<Text style={styles.readyText}> UNDO  </Text>
					</TouchableOpacity>
					<TouchableOpacity style={disabledReady? styles.readyButtonDisabled : styles.readyButton }  onPress={this.onActionButtonPressed.bind(this, 'READY')}>
						<Text style={styles.readyText}>  READY  </Text>
					</TouchableOpacity>
				</View>
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
		setSoftKey: Action.setSoftKey,
		clearItem: Action.clearItem,
		setReadyDisabled: Action.setReadyDisabled,
		setUndoDisabled: Action.setUndoDisabled,
		setWorkstepId: Action.setWorkstepId,
	}, dispatch)
}

export default connect(
	mapStateToProps,mapDispatchToProps
)(ItemReady);


const styles = StyleSheet.create({

	GridViewBlockStyle: {
		borderColor:'#881b4c',
		borderWidth:1,
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
		flex:1,
		alignItems: 'center',
		height: height(10),
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
	undoButton: {
		height:height(8),
		width:width(48),
		backgroundColor:'#881b4c',
		alignItems:'center',
		justifyContent:'center',
		marginBottom:2,

	},
	undoButtonDisabled: {
		height:height(8),
		width:width(48),
		backgroundColor:'#cecece',
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
	readyButtonDisabled: {
		height:height(8),
		width:width(48),
		backgroundColor:'#cecece',
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
