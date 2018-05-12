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

import item from '../image/item.png';
import rack from '../image/rack.png';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import LiFlatList from './liflatlist';


class Itemready extends Component {
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

	componentWillReceiveProps(nextProps){

	}



	render() {
		ScanExample.setTitle("Li.Scanner - Item - Ready");

		var isQtyReadyScreen = false;
		var result = '', res = '';
		if(Object.keys(this.props.obj.batch) !== 0){
			res = this.props.obj.batch.BATCH;
		}
		if(Object.keys(this.props.obj.rackId) !== 0){
			result = this.props.obj.rackId.RACK;
		}

		console.log('resulttttt',result)
		return (
		<Container>
			<LiFlatList Menu = {this.state.GridViewItems} columns = {1} rackcode={result} itemcode={res} Gotomenu={(item)=> this.Gotomenu.bind(this,item)}/>
      <LiFlatList Menu = {this.state.GridViewSubmitItems} columns = {1} isReadyButton = {true} Gotomenu={(item)=> this.Gotomenu.bind(this,item)}/>
		</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		obj: state.ItemReady

	};
}

export default connect(
	mapStateToProps
)(Itemready);





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

});
