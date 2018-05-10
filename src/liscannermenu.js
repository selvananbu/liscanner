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
import item from './image/item.png';
import rack from './image/rack.png';
import commission from './image/commission.png';
import utilities from './image/utilities.png';

import ScanExample from './nativeconnector/scanconnector';

const SIZE = window.width;


export default class LiScannerMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
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

		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	Gotomenu  = (item) => {
		console.log(item);
		if (item==="ITEM")
			{ Actions.ItemMenu() }
		else{Alert.alert(item);}
		}

	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 100,
				easing: Easing.linear,
			}
		).start();

		setTimeout(() => {
			// Actions.pop();
			Actions.Scan_menu()
		}, 200);
	}


	render() {

		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 40],
		});

		return (
		<Container>
            <FlatList
                data={ this.state.GridViewItems }
                renderItem={({item}) =>{
                return (
                <View style={styles.GridViewBlockStyle}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}onPress={this.Gotomenu.bind(this, item.key)}>
                        <Text style={styles.GridViewInsideTextItemStyle}  onPress={this.Gotomenu.bind(this,item.key)} > {item.key}  </Text>
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
		);

	}
}

const styles = StyleSheet.create({

	GridViewBlockStyle: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(42),
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
	  FacebookStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#485a96',
		borderWidth: .5,
		borderColor: '#fff',
		height: 40,
		borderRadius: 5 ,
		margin: 5,

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
