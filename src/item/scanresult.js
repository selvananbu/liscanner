/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
Image,
TouchableOpacity,
ListItem,
ScrollView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Progress from 'react-native-progress';
import { Actions, ActionConst } from 'react-native-router-flux';
import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';

import {OpenApiBody} from '../openapi/openapibody';
import {MimeTypes} from '../openapi/openapibody';

import ScanExample from '../nativeconnector/scanconnector';


var axios = require('axios');
var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720','DEMO','PROD');

export default class ScanResult extends Component {
  constructor(props){
    super(props)
    this.state = {isDataAvailable:false};
  }

  alertItemName = (item) => {
        console.log("@@@@",item);
        console.log("@@@@",this.props.barcode);

        if(this.props.barcode !== null && this.props.barcode != undefined){
          Actions.ItemReady({title:'LiScanner - Item - Ready',GridViewItems:[		{
              key:'0',
              text: 'RACK',
              MenuIcon_url:'src_image_rack'
              },
              {
              key:'1',
              text: 'ITEM',
              MenuIcon_url:'src_image_item',
              barcode:item,
              rackId:this.props.barcode
            },]})
        }

        else{
            Actions.ItemReady({title:'LiScanner - Item - Ready',GridViewItems:[		{
      				  key:'0',
      					text: 'RACK',
      					MenuIcon_url:'src_image_rack'
      					},
      					{
      				  key:'1',
      					text: 'ITEM',
      					MenuIcon_url:'src_image_item',
                barcode:item
              },]})
        }

    }

    callbackWithArg(responseData){
      if(responseData !== null && responseData.state.response.data !== undefined  && Object.keys(responseData.state.response.data).length !== 0){
        this.setState({result:responseData.state.response.data});
        this.setState({isDataAvailable:true});
      }
      else{
        ScanExample.startVibrate();
        Actions.ItemReady();
      }
 }

  componentWillMount(){
    if(this.props.barcode !== null && this.props.barcode !== undefined )
        obj.GET_todo_lists(this.callbackWithArg.bind(this),null,null,null,168329);
    else if(this.props.result !== null)
      obj.GET_todo_lists(this.callbackWithArg.bind(this),null,null,this.props.result);

  }
  render() {

    if(this.state.isDataAvailable){
      return (
        <View style={styles.container}>
          <TouchableOpacity style = {styles.header}>
            <Text style = {styles.headerText}>
               Orders
            </Text>
          </TouchableOpacity>
        {  this.state.result.item.map((item, index) => (
                     <TouchableOpacity
                        key = {index}
                        style = {styles.items}
                        onPress = {() => this.alertItemName(item)}>

                        <Text style = {styles.text}>
                           {item.orderNo}
                        </Text>
                          <Image style={styles.ImageIconStyle}
                          source={require('../image/right-arrow-angle.jpg')}
                          />

                     </TouchableOpacity>
                  ))
                }
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <TouchableOpacity style = {styles.header}>
            <Text style = {styles.headerText}>
               Orders
            </Text>
          </TouchableOpacity>
        <View style={styles.containerPlain}>
          <Progress.Circle showText={true} size={30} indeterminate={true} />
          <Text> Fetching details from Server... </Text>
        </View>
      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerPlain: {
    backgroundColor:'#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
   items: {
     flexDirection:'row',
      padding:10,
      borderTopWidth:0.5,
      borderBottomWidth:0.5,
   },
   header: {
     backgroundColor: '#dfcee7',
     padding:10,

   },
   ImageIconStyle:{
     alignItems: 'flex-end',
     justifyContent: 'center',
     width:15,
     height:25,
     alignItems: 'stretch',
  resizeMode: 'stretch',

   },
   text: {
      color: '#4f603c',
      fontSize: 20,
      alignItems: 'flex-start',
      width:375,
         // backgroundColor: 'wheat',

   },
   headerText: {
     color:'#660033',
     fontSize: 30,
     textAlign: 'center',
     fontWeight: 'bold',
      fontFamily: 'Cochin',
      paddingBottom:10
   }
});
