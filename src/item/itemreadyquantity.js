import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlightStatic,
  Animated,
  CheckBox,
  Image,ScrollView,
  Easing,FlatList,TouchableHighlight,Alert,
} from 'react-native';

import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import { width, height, totalSize } from 'react-native-dimension';
import {Button,Container,Content,Header,Left} from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import ScanExample from '../nativeconnector/scanconnector';
import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';

import item from '../image/item.png';
import rack from '../image/rack.png';
import quantity from '../image/quantity.png';
import LiFlatList from './liflatlist';

import {OpenApiBody} from '../openapi/openapibody';
import {MimeTypes} from '../openapi/openapibody';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Action from '../liaction/index';

var axios = require('axios');
var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720','DEMO','PROD');

const tableHead = [' ',' Part Count', ' Part Barcode', ' Physical Rack'];
const widthArr= [40, width(30), width(30), width(30)];

const TableComp = (mainData)=>{
  const state = this.state;
  const element = (data, index) => (
    <CheckBox
      center
      checked={true}
    />
  );
  return (<ScrollView style={{margin:height(1),height:height(35)}}>
    <Table borderStyle={{borderColor: 'transparent'}}>
      <Row data={tableHead} style={styles.head} widthArr={widthArr} textStyle={styles.text}/>
      {
        mainData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.rowNow}>
            {
              rowData.map((cellData, cellIndex) => (
                <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}/>
              ))
            }
          </TableWrapper>
        ))
      }
    </Table>
  </ScrollView>)
}


class ItemReadyQuantity extends Component {
  constructor(props) {
    super(props);


    this.state = {
      isLoading: false,
      mainData:[],
      checked:false,
      GridViewItems: [
        {
          key:'0',
          text: 'RACK',
          MenuIcon_url:'src_image_rack'
        },
        {
          key: '5',
          text:'ITEM',
          MenuIcon_url:'src_image_item'
        },
      ],

      GridViewSubmitItems: [
        {
          key: '3',
          text:'READY'
        },
      ],
    };
  }

  onActionButtonPressed  = (item) => {
    // if(item.key !== 3)
    // ScanExample.startScan(item.key,this.props.barcode);
    // else {
    //   //Start Ready Message
    // }
  }
  componentDidMount(){
    if (this.props.item!==undefined)
    {
      var item = this.props.item;
      obj.GET_todo_lists(this.callbackWithItemRes.bind(this),item.orderNo, item.itemNo,null,null,null,null,null,null);
    }
  }
  callbackWithItemRes(responseData) {

    if (responseData !== null && responseData.state.response.status === 200)
    {
      var item=responseData.state.response.data.item;
        var mainDataArr=[];
        var phyRack;
      {item.map((value, elem) => {
        var partDataArr;
        {value.part.map((partValue, elem) => {
          partDataArr=[];
          partDataArr.push('')
          partDataArr.push(partValue.partCnt)
          partDataArr.push(partValue.partBcd)
          phyRack = partValue.physRack;
          if(partValue.physRack === '')
            phyRack= '0000000000'
          partDataArr.push(phyRack)
          mainDataArr.push(partDataArr)
        })}
        this.setState({mainData:mainDataArr})
      })
    }}

  }

  render() {
    var res = '';
    ScanExample.setTitle("LiScanner - Item - Ready/QTY");
    if(this.props.item!=undefined){
      var actionTable = TableComp(this.state.mainData);
    }
    if(Object.keys(this.props.obj.batch) !== 0){
      res = this.props.obj.batch.BATCH;
    }

    return (
      <View style={{flex:1,backgroundColor:'lightgrey'}}>
        <LiFlatList Menu = {this.state.GridViewItems} isfinalScreen={true} itemcode={res} isReadyQty = {true} columns = {1} Gotomenu={(item)=> this.onActionButtonPressed.bind(this,item)}/>
        {actionTable}
        <View style={{flexDirection:'row',alignContent:'space-around', justifyContent:'space-around'}}>
          <TouchableOpacity style={styles.undoButton } onPress={this.onActionButtonPressed.bind(this, 'UNDO')}>
            <Text style={styles.readyText}> UNDO  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.readyButton } onPress={this.onActionButtonPressed.bind(this, 'READY')}>
            <Text style={styles.readyText}> READY  </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    obj: state.ItemReady
  };
}
function  mapDispatchToProps(dispatch) {
  return  bindActionCreators({
    setRack:  Action.setRack,
    setBatch:  Action.setBatch,
    setSoftKey: Action.setSoftKey,
    clearItem: Action.clearItem,
    setReadyDisabled: Action.setReadyDisabled,
    setUndoDisabled: Action.setUndoDisabled,
    setWorkstepId: Action.setWorkstepId,
  }, dispatch)
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(ItemReadyQuantity);
const styles = StyleSheet.create({

  undoButton: {
    height:height(8),
    width:width(48),
    backgroundColor:'#881b4c',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:2,

  },
  undoButtonDisabled: {
    height:height(8),
    width:width(48),
    backgroundColor:'#cecece',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:2,

  },
  readyButton: {
    height:height(8),
    width:width(48),
    backgroundColor:'rgba(0,125,50,0.8)',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:2,
  },
  readyButtonDisabled: {
    height:height(8),
    width:width(48),
    backgroundColor:'#cecece',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:2,
  },
  readyText:{
    color: '#fff',
    textShadowOffset:{wdith:1.5,height:2},
    textShadowColor:'grey',
    fontSize: 20,
    fontWeight: "bold"
  },
  head: { height: 40, backgroundColor: '#881b4c' },
  rowNow: { flexDirection: 'row', backgroundColor: '#cecece' },
  text: { marginLeft: 5,color:'#000' },
  textHeader: { marginLeft: 5,color:'#fff' },
});
const styles2 = StyleSheet.create({
  head: { height: 30, backgroundColor: '#881b4c' },
  row: { height: 30 ,backgroundColor:'whitesmoke'},
  textRow: { marginLeft: 5,color:'#000' },
  textHeader: { marginLeft: 5,color:'#fff' },
});

/*  */

/* <View style={{alignItems:'center'}}>
<TouchableOpacity style={styles.readyButton} onPress={()=>this.props.navigation.goBack()}>
<Text style={styles.readyText}> READY  </Text>
</TouchableOpacity>
</View> */
