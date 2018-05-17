import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,TextInput,ScrollView
} from 'react-native';
import {Button,Left} from 'native-base';
import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


export default class OrderPage extends Component {
  state = {
    activeSection: false,
    collapsed: true,
    data:{}
  };

  componentDidMount(){
    var self = this;
    const config = {
        //url: 'http://swpdmsrv4.lisec.internal:18720/openapi/DEMO/PROD/prod_feedback/todo_lists?barcode=708080',
        //url : 'http://10.128.3.170/restexample/restcall.php', //shyam server
        url:'http://swpdmsrv4.lisec.internal:18720/openapi/DEMO/PROD/prod_feedback/todo_lists?batch=168329',
        method: 'get'
    }
    axios.request(config)
    .then( function (response){
        console.log('axios open')
        self.setState({data: response.data});
    })
    .catch(function (err){
        console.log(err);
    })
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.activeheader : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>ORDER NUMBER :{section.orderNo}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
        <View>
        <Animatable.View duration={2500}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.Text style={{color:'#fff',fontSize:28}} animation={isActive ? '' : undefined}>Batch:             {section.batchNo}</Animatable.Text>
        <Animatable.Text style={{color:'#fff',fontSize:19}} animation={isActive ? '' : undefined}>Batch Sequence:   {section.batchSeq}</Animatable.Text>
        <Animatable.Text style={{color:'#fff',fontSize:19}} animation={isActive ? '' : undefined}>Item Number:        {section.itemNo}</Animatable.Text>
        <Animatable.Text style={{color:'#fff',fontSize:19}} animation={isActive ? '' : undefined}>Batch Number:      {section.batchNo}</Animatable.Text>
        {section.part.map((value, elem) => {
            for(var param in value){
              return (<Animatable.Text style={{color:'#fff',fontSize:19}} key={param + elem} animation={isActive ? '' : undefined}>Part Count:            {value[param]}</Animatable.Text>);
            }
        })}
      </Animatable.View>
      {/* <Button block light><Text> ACTION </Text></Button> */}
      </View>
    );
  }

  render() {
      var acc = [];
      var test = {};
      console.log(Object.keys(this.state.data), this.state.data, 'dasdasd');
      if(Object.keys(this.state.data).length !== 0){
        for(var param in this.state.data){
            console.log(param);
            test[param] = (
                <Accordion
                  key={param}
                  sections={this.state.data[param]}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  duration={100}
                  onChange={this._setSection.bind(this)}
            />);
            acc.push(test[param]);
        }
    }
    return (

        <ScrollView style={styles.container}>
            <Text style={styles.title}>ORDER DETAILS</Text>

            <Collapsible collapsed={this.state.collapsed} align="center">
              <View style={styles.content}>
                <Text>Test: Single collapsible Data</Text>
              </View>
            </Collapsible>
            {acc.map((elem) => {
                return(elem);
            })}
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
    color:'#881b4c',
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
    },
    header: {
      backgroundColor: 'lightgrey',
      padding: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '500',
      color:'whitesmoke'
    },
    activeheader: {
      padding:10,
      margin:5,
      backgroundColor: '#881b4c',
    },
    active: {
      backgroundColor: '#881b4c',
      margin:5,
      borderRadius: 20,
      padding:10
    },

    inactive: {
      backgroundColor: 'rgba(136,27,76,0.90)',
      margin:5,
      borderRadius: 0,
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
      color: '#fff'
    },
    selectTitle: {
      fontSize: 24,
      fontWeight: '500',
      padding: 10,
    },
  });
