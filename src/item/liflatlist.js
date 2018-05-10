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
    console.log("@@@",this.props.Menu);
    return (
            <FlatList
                      data={ this.props.Menu }
                      renderItem={({item}) =>{
                        if(this.props.columnCount == 1){
                          return (
            <View style={styles.GridViewBlockStyleFor2}>
              <TouchableOpacity style={{height:120,width:260,alignItems: 'center', justifyContent: 'center',}} onPress={this.props.Gotomenu(item)}>
                <Text style={styles.GridViewInsideTextItemStyle} > {item.text}  </Text>
                <Image
                  source={{uri: item.sourceImage}}
                  style={styles.ImageIconStyle2}
                />
              </TouchableOpacity>
                          </View>

                        );
                  }
                  else {
                    return(
                    <View style={styles.GridViewBlockStyle}>
                      <TouchableOpacity style={{height:120,width:260,alignItems: 'center', justifyContent: 'center',}} onPress={this.props.Gotomenu(item)}>
                        <Text style={styles.GridViewInsideTextItemStyle} > {item.text}  </Text>
                        <Image
                          source={{uri: item.sourceImage}}
                          style={styles.ImageIconStyle2}
                        />
                      </TouchableOpacity>
                                  </View>

                                );
                  }

                }
                                  }
                      numColumns={this.props.columnCount}
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
		height: height(42),
		margin: 6,
		backgroundColor: 'rgba(89,89,89,0.5)',
	  },
    GridViewBlockStyleFor2: {
		borderColor:'#881b4c',
		justifyContent: 'center',
		flex:1,
		alignItems: 'center',
		height: height(20),
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
