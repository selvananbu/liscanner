/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import MenuExample from './src/nativeconnector/scanconnector';

export default class Welcome extends Component {

  onPress = () => {
         MenuExample.startConnectionActivity();
    }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
        Welcome to Lisec Mobile Development!
      </Text>
      <Text style={styles.instructions}>
        To get started, download a bundle using connect button or you can add download bundle from menu.
      </Text>
         <Image  source={require('./src/image/bundle_box.png')}></Image>
        <TouchableOpacity style = {styles.buttonContainer}  onPress={this.onPress}>
           <Text style={styles.textContainer}>Download Bundle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       padding: 25,
       margin:10
  },

  buttonContainer:{
      backgroundColor: '#a0185c',
      paddingVertical:15,
        width:300,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
  },
  textContainer:{
            color: '#FFF',
            textAlign: 'center',
            fontWeight: '700',
            padding:10,
   },
  image:{
    height:100,
    width:100
  },
  titleText: {
   fontSize: 20,
   fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom:10
 },
 instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
});
