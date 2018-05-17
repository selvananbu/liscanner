import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


export default class CommissionMenu extends Component {
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
