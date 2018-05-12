/* @flow */
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



export default class LiFlatList extends Component {

	constructor(props){
		super(props);
	}


	render() {
		var newHeight = 0;
		newHeight = height(this.props.height);

		var styles1 = styles.GridViewBlockStyle;
		var stylesText1 = styles.GridViewInsideTextItemStyle;
		var styleImage = styles.ImageIconStyle;

		if(this.props.columns == 1){
			if(this.props.isReadyButton && this.props.isReadyQty){
				styles1 = styles.GridViewBlockStyleReadyQtyButton;
				stylesText1 = styles.GridViewInsideTextItemStyleReadyButton;
				styleImage = styles.ImageIconStyleReady;
			}

			else if(this.props.isReadyButton){
				styles1 = styles.GridViewBlockStyleReadyButton;
				stylesText1 = styles.GridViewInsideTextItemStyleReadyButton;
				styleImage = styles.ImageIconStyleReady;
			}
			else if(this.props.isReadyQty){
				styles1 = styles.GridViewBlockStyleReadyQty;
				stylesText1 = styles.GridViewInsideTextItemStyle;
				styleImage = styles.ImageIconStyleReady;
			}
			else {
				styles1 = styles.GridViewBlockStyleReady;
				stylesText1 = styles.GridViewInsideTextItemStyle;
				styleImage = styles.ImageIconStyleReady;
			}
		}
		return (

			<FlatList
				data={ this.props.Menu }
				renderItem={({item}) =>{
					return (
						<View style={styles1}>
							<TouchableOpacity style={{height:1000,width:1000,alignItems: 'center', justifyContent: 'center'}} onPress={this.props.Gotomenu(item)}>
								<Text style={stylesText1}  onPress={this.props.Gotomenu(item)} > {item.text}  </Text>
									<Text style={styles.GridViewInsideTextItemStyle} >
										{item.text === 'RACK' ? this.props.rackcode : this.props.itemcode}
									</Text>
								<Image
									source={{uri:item.MenuIcon_url}}
									style={styles.ImageIconStyle}
									/>
							</TouchableOpacity>
						</View>
					);
				}}
				numColumns={this.props.columns}
				/>
		);
	}
}

const styles = StyleSheet.create({
	GridViewBlockStyle: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(41.5),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',
	},
	GridViewBlockStyleReadyQty: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(20),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',

	},
	GridViewBlockStyleReady: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(25),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',
	},
	GridViewBlockStyleReadyButton: {
		borderColor:'#881b4c',
		borderWidth:2,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(10),
		marginTop: 150,
		margin: 2,
		backgroundColor: 'rgba(0, 150, 50,0.6)',
	},
	GridViewBlockStyleReadyQtyButton: {
		borderColor:'#881b4c',
		borderWidth:2,
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(10),
		marginTop: 40,
		margin: 2,
		backgroundColor: 'rgba(0, 150, 50,0.6)',
	},
	GridViewInsideTextItemStyleReadyButton: {
		color: '#881b4c',
		padding: 1,
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'roboto',
		justifyContent: 'center',
	},

	GridViewInsideTextItemStyle: {
		color: '#881b4c',
		padding: 5,
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'roboto',
		justifyContent: 'center',
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
