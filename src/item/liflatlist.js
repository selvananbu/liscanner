/* @flow */
import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Image,ImageBackground,
	TouchableOpacity,
	TouchableHighlightStatic,
	Animated,
	TextInput,
	Easing,Text,FlatList,TouchableHighlight,Alert,
} from 'react-native';
// import Grid from 'react-native-grid-component';
// import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';

import {Button,Container,Content,Header,Left,Item,Input} from 'native-base';
import { width, height, totalSize } from 'react-native-dimension';

import LiScannerMenu from '../liscannermenu'

import * as Action from '../liaction/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';



class LiFlatList extends Component {

	constructor(props){
		super(props);
		this.state = { text: ' ' ,isRack:false}
	}
	newHeight = 0;
	newHeight = height(this.props.height);

	styles1 = styles.GridViewBlockStyle;
	stylesText1 = styles.GridViewInsideTextItemStyle;
	styleImage = styles.ImageIconStyle;

	readyButtonStyles(){
		this.styles1 = styles.GridViewBlockStyleReadyButton;
		this.stylesText1 = styles.GridViewInsideTextItemStyleReadyButton;
		this.styleImage = styles.ImageIconStyleReady;
	}

	readyQuantityStyles(){
		this.styles1 = styles.GridViewBlockStyleReadyQty;
		this.stylesText1 = styles.GridViewInsideTextItemStyle;
		this.styleImage = styles.ImageIconStyleReady;
	}

	defaultStyles(){
		this.styles1 = styles.GridViewBlockStyleReady;
		this.stylesText1 = styles.GridViewInsideTextItemStyle;
		this.styleImage = styles.ImageIconStyleReady;
	}

	readyButtonInReadyQty(){
		this.styles1 = styles.GridViewBlockStyleReadyQtyButton;
		this.stylesText1 = styles.GridViewInsideTextItemStyleReadyButton;
		this.styleImage = styles.ImageIconStyleReady;
	}
	componentDidMount(){
		// console.log("*******!!!!",LiScannerMenu.testStatic);
	}
	render() {
		if(this.props.columns == 1){
			if(this.props.isReadyButton && this.props.isReadyQty){
				this.readyButtonInReadyQty()
			}
			else if(this.props.isReadyButton){
				this.readyButtonStyles()
			}
			else if(this.props.isReadyQty){
				this.readyQuantityStyles()
			}
			else {
				this.defaultStyles()
			}
		}

		return(
			<FlatList
				data={ this.props.Menu }
				renderItem={({item}) =>{
					return (this.flatlistView(item));
				}}
				numColumns={this.props.columns}
			/>
		);
	}
	onTextEdited(text,item){
		this.setState(text);
	}
	returnView(){
		return (
			<FlatList
				data={ this.props.Menu }
				renderItem={({item}) =>{
					return (this.flatlistView(item));
				}}
				numColumns={this.props.columns}
			/>
		);
	}
	updateText(text,item){
		if(item.key == '0'){
			Actions.ItemReady({result:text});
		}
		else if(item.key == '3'){
			this.props.setReasonId(text);
			Actions.ItemBroken({PickerValueHolder:text});
		}
		else if(item.key == '4'){
			Actions.ScanResult({keyId: 'ITEMREASON', result: text});
		}
		else if(item.key == '1'){
			Actions.ScanResult({ keyId: 'ITEM', result: text});
		}
		else if(item.key == '5'){
				console.log("@@@@@",item.key);
			Actions.ReadyQuantityScanResult({ keyId: 'ITEM', result: text});
		}
	}
	onTextEditedRack(text,item){
		this.setState(text);
	}
		updateTextRack(text){
				console.log("@@@@@");
				Actions.RackScanResult({ keyId: 'ITEM', result: text});
		}
	flatlistView(item){
		var isSoftKeyEnabled = true;
		if(Object.keys(this.props.obj.softkey) !== 0 && this.props.obj.softkey.SOFTKEY !== undefined && this.props.obj.softkey.SOFTKEY !== null){
			isSoftKeyEnabled = this.props.obj.softkey.SOFTKEY;
		}
		const textBarCode =  <TextInput
			style={{height: 40,width:150,alignItems: 'center', justifyContent: 'center',fontWeight: 'bold',fontFamily: 'roboto'}}
			underlineColorAndroid={'#881b4c'}
			onChangeText={(text,item) => this.onTextEdited({text,item})}
			onSubmitEditing={(event) => this.updateText( event.nativeEvent.text,item)}
			keyboardType= {'numeric'}
			maxLength={10}
			placeholder="Enter Barcode here..."
		/>
		const rackPrintBarcode =  <TextInput
			style={{width:width(40),alignItems: 'center', justifyContent: 'center',fontWeight: 'bold',fontFamily: 'roboto'}}
			underlineColorAndroid={'#881b4c'}
			onChangeText={(text,item) => this.onTextEditedRack({text,item})}
			onSubmitEditing={(event) => this.updateTextRack( event.nativeEvent.text,item)}
			keyboardType= {'numeric'}
			maxLength={10}
			placeholder="Enter Barcode here"
		/>
		return(
			<View style={this.styles1}>
				<TouchableOpacity style={{height:1000,width:1000,alignItems: 'center', justifyContent: 'center'}} onPress={this.props.Gotomenu(item)}>
					<Text style={this.stylesText1}  onPress={this.props.Gotomenu(item)} > {item.text}  </Text>
					<Text style={styles.GridViewInsideTextItemStyle}>
						{item.text === ('RACK' ) || item.text === ('REASON') ? this.props.rackcode : this.props.itemcode}
					</Text>
					{isSoftKeyEnabled &&
						this.props.isfinalScreen  ? textBarCode : <View/>
					}
			  { isSoftKeyEnabled && this.props.isRackPrint  ? rackPrintBarcode : <View/>  }
					<Image
						source={{uri:item.MenuIcon_url}}
						style={styles.ImageIconStyle}
					/>
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
		setReasonId:Action.setReasonId
	},dispatch)
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(LiFlatList);

const styles = StyleSheet.create({
	GridViewBlockStyle: {
		borderColor:'#000',
		borderWidth:1,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(41.5),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',
	},
	GridViewBlockStyleReadyQty: {
		borderColor:'#000',
		borderWidth:1,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(20),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',

	},
	GridViewBlockStyleReady: {
		borderColor:'#000',
		borderWidth:1,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(25),
		margin: 5,
		backgroundColor: 'rgba(89,89,89,0.5)',
	},
	GridViewBlockStyleReadyButton: {
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(10),
		margin: 2,
		backgroundColor: 'rgba(0, 150, 50,0.6)',
	},
	GridViewBlockStyleReadyQtyButton: {
		justifyContent: "center",
		flex:1,
		alignItems: 'center',
		height: height(10),
		margin: 5,
		backgroundColor: 'rgba(0, 150, 50,0.6)',
	},
	GridViewInsideTextItemStyleReadyButton: {
		color: '#881b4c',
		padding: 1,
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'roboto',
		justifyContent: 'flex-end',
	},

	GridViewInsideTextItemStyle: {
		color: '#881b4c',
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'roboto',
		justifyContent: 'center',
		alignItems: 'center'
	},
	ImageIconStyle: {
		height: 60,
		width: 60,
		resizeMode : 'stretch',
	},
	ImageIconStyleReady: {
		height: 30,
		width: 30,
		resizeMode : 'stretch',
	},


});
