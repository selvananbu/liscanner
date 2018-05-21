/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  ScrollView} from 'react-native';
  import {List} from 'react-native-elements';
  import Accordion from 'react-native-collapsible/Accordion';
  import * as Progress from 'react-native-progress';
  import { Actions, ActionConst } from 'react-native-router-flux';
  import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';
  import { Container, Header, Content, ListItem, Text,Card, CardItem, Body } from 'native-base';

  import {OpenApiBody} from '../openapi/openapibody';
  import {MimeTypes} from '../openapi/openapibody';

  import ScanExample from '../nativeconnector/scanconnector';

  import { connect } from 'react-redux';
  import {bindActionCreators} from 'redux';
  import * as Action from '../liaction/index';


  var axios = require('axios');
  var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720','DEMO','PROD');

  class ScanResult extends Component {
    constructor(props){
      super(props)
      this.state = {isDataAvailable:false};
    }

    alertItemName = (item) => {
      if(this.props.barcode !== null)
      Actions.ItemReady({item:item});
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
      var isRack = false;
      console.log("@@@@",this.props.keyId,this.props.result);
      if(this.props.keyId != null && this.props.keyId != undefined){
          if(this.props.keyId === 'RACK')
            isRack = true;
      }

      if(this.props.result !== null){
        if(isRack){
          this.props.setRack(this.props.result);
          Actions.ItemReady();
        }
        else{
          this.props.setBatch(this.props.result);
          obj.GET_todo_lists(this.callbackWithArg.bind(this), null, null, this.props.result);
        }

      }
    }

    renderSeparator = () => (
      <View
        style={{
          height:1,
          width:"100%",
          backgroundColor:"#CED0CE",
        }}
        />
    );

    render() {
      ScanExample.setTitle("Li.Scanner - BarCode - Result");
      if(this.state.isDataAvailable){
        return (
          <View style={styles.container}>
            <TouchableOpacity style = {styles.header}>
              <Text style = {styles.headerText}>
                Orders
              </Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.result.item}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index}
              renderItem={({item , separators}) => (
                <TouchableOpacity
                  onPress={() => this.alertItemName(item)}>
                <View style={styles.flatview}>
                  <Text style={styles.orderno}>Order No: {item.orderNo}</Text>
                  <Text style={styles.pane}>Batch No: {item.batchNo}                              Pane No: {item.pane}</Text>
                  <Text style={styles.pane}>Batch Seq: {item.batchSeq}                                       Comp: {item.comp}</Text>

                    {item.part.map((value, elem) => {
                      return (
                        <View>
                        <Text style={styles.pane}>Part Count: {value.partCnt}                                       Slot: {value.slot}</Text>
                        <Text style={styles.pane}>Physical Rack: {value.physRack}             Barcode: {value.partBcd}</Text>
                      <Text> Status: {value.prodStatus}</Text>

                        </View>
                    );
                    })}
                      <Text style={styles.pane}>Step No: {item.stepNo}</Text>

                </View>
              </TouchableOpacity>
              )}
              />
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

  function mapStateToProps(state) {
    return {
      obj: state.ItemReady

    };
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators({
      setRack: Action.setRack,
      setBatch: Action.setBatch,
      setItem:  Action.setItem
    },dispatch)
  }

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ScanResult);



  const styles = StyleSheet.create({
    containerPlain: {
      backgroundColor:'#F5FCFF',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center'
    },
    flatview: {
      justifyContent: 'center',
      padding:2,
      borderRadius: 2,
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
    },
    headerText: {
      color:'#660033',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      paddingBottom:10
    },
    orderno: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Cochin',
    },
    pane: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'Cochin',
    },
    paneleft: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'Cochin',
      alignItems: 'flex-end',
    }
  });
