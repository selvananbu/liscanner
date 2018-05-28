import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


import ScanExample from '../nativeconnector/scanconnector';

export default class RackMenu extends Component {

  componentWillMount(){
        ScanExample.setTitle("LiScanner - Rack");
  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Under Construction....</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
