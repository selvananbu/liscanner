import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,ImageBackground,
	TouchableOpacity,
	TouchableHighlightStatic,
	Animated,
	BackHandler,
	Easing,Text,FlatList,TouchableHighlight,Alert,TextInput
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

import rack_print from '../image/rack_print.png';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import LiFlatList from '../item/liflatlist';
import MenuConnector from '../nativeconnector/menuconnector';

var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720', 'DEMO', 'PROD');

class RackPrint extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isReadyButtonDisabled: true,
			isLoading: false,
			text:' ',
			GridViewItems: [
				{
					key:'0',
					text: 'RACK',
					MenuIcon_url:'src_image_rack_print'
				},

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
			if (this.props.item != undefined) {
				var itemId = this.props.item;
				{itemId.part.map((value, elem) => {
				obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(this.callbackWithArg.bind(this), itemId.orderNo, itemId.itemNo, itemId.pane, itemId.comp,
					value.partCnt,itemId.stepNo,405,this.props.obj.rackId.RACK);
			})}
			}
		}
		else if(item === 'READY'){
			if (this.props.item != undefined) {
				var itemId = this.props.item;
				{itemId.part.map((value, elem) => {
					// if (value.prodStatus== "30"){}
						console.log('enabkleeee',this.state.is)
						this.setState({isReadyButtonDisabled: false},()=>{
						});
						obj.PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(this.callbackWithArg.bind(this), itemId.orderNo, itemId.itemNo, itemId.pane, itemId.comp,
						value.partCnt,itemId.stepNo,405,this.props.obj.rackId.RACK);
		})}
		}
			}
}
callbackWithArg(responseData) {
	console.log("Response For Ready",responseData.state.response.status);
	if (responseData !== null && responseData.state.response.status === 200)
	{
			MenuConnector.showToast("Action Sucessfull");
	}
}
checkForProdStatus(item){
	console.log("@@@@@",item.prodStatus);
	if(item.prodStatus === 30){
		// this.props.setEnableReadyButton(true);
	}

}
componentDidMount(){
ScanExample.setTitle("LiScanner - Rack - Print");
	// if (this.props.result != undefined){
	// 	this.props.setRack(this.props.result);
	// }
	// if (Object.keys(this.props.obj.rackId) && this.props.item !== undefined){
	//     console.log("!!!!!",this.props.obj.enble_ready_button);
	// 	var item = this.props.item;
	// 	checkForProdStatus(item);
	// }
}

	render() {
		var isQtyReadyScreen = false;
		var result = '', res = '';
		var isSoftKeyEnabledVar = true;
		if(Object.keys(this.props.obj.batch) !== 0){
			res = this.props.obj.batch.BATCH;
		}
		if (Object.keys(this.props.obj.rackId) !== 0 && this.props.result === undefined)
		{
			result = this.props.obj.rackId.RACK;
		}
		else
		{
			result = this.props.result;
		}
		console.log(result);
		return (this.returnView(result,res,isSoftKeyEnabledVar));
	}

	returnView(result,res,isSoftKeyEnabledVar){

		self=this;
		console.log(res,"VALUES COMING")
			const textBarCode =  <TextInput
			style={{width:width(40),alignItems: 'center', justifyContent: 'center',fontWeight: 'bold',fontFamily: 'roboto'}}
			underlineColorAndroid={'#881b4c'}
			onChangeText={(text,item) => this.onTextEdited({text,item})}
			onSubmitEditing={(event) => this.updateText( event.nativeEvent.text)}
			keyboardType= {'numeric'}
			maxLength={10}
			placeholder="BARCODE"
			/>
		return (
			<Container style={{backgroundColor:'lightgrey'}}>
				<LiFlatList Menu = {this.state.GridViewItems} isfinalScreen = {false} isRackPrint ={true} columns = {1} rackcode={res} Gotomenu={(item)=> this.Gotomenu.bind(this,item)}/>
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

function mapStateToProps(state) {
	return {
		obj: state.ItemReady
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setRack:  Action.setRack,
		setBatch: Action.setBatch,
		setSoftKey: Action.setSoftKey
	}, dispatch)
}

export default connect(
	mapStateToProps,mapDispatchToProps
)(RackPrint);


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
