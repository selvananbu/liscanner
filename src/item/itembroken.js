/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlightStatic,
  Animated,
  Image,
  ActivityIndicator,
  Picker,
  Easing,FlatList,TouchableHighlight,Alert,
} from 'react-native';

import Grid from 'react-native-grid-component';
import { ThemeProvider } from 'react-native-material-ui';
import { Actions, ActionConst } from 'react-native-router-flux';
import { width, height, totalSize } from 'react-native-dimension';
import {Button,Container,Content,Header,Left} from 'native-base';

import ScanExample from '../nativeconnector/scanconnector';
import MenuConnector from '../nativeconnector/menuconnector';

import item from '../image/item.png';
import reason from '../image/reason.png';
import LiFlatList from './liflatlist';

import OpenApiClient_prod_feedback from '../openapi/openapiclient_prod_feedback';
import { OpenApiBody } from '../openapi/openapibody';
import { MimeTypes } from '../openapi/openapibody';
import * as Action from '../liaction/index';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

var obj = new OpenApiClient_prod_feedback('http://swpdmsrv4.lisec.internal:18720', 'DEMO', 'PROD');

class ItemBroken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      responsechoices:[{}],
      PickerValueHolder : '',
      GridViewItems: [
        {
          key:'3',
          text: 'REASON',
          MenuIcon_url:'src_image_reason'
        },
        {
          key: '4',
          text:'ITEM',
          MenuIcon_url:'src_image_item'
        },
      ],
    };
  }
  Gotomenu  = (item) => {

  }
  onActionButtonPressed  = (item) => {
    if(item.key === 'Reason'){

    }
  }
  callbackWithArg(responseData) {
    if (responseData !== null && responseData.state.response.status === 200)
    {
      this.setState({
        responsechoices:responseData.state.response.data.reason,
        isLoading:false
      })
      this.props.setReasonList(responseData.state.response.data.reason);
    }
  }
  callBackWithArgForRemake(responseData){
    if (responseData !== null && responseData.state.response.status === 200)
    {
          MenuConnector.showToast("Remake Sucessfull....");
    }
  }
  componentDidMount(){

    if (Object.keys(this.props.obj.reasonList).length === 0){
      obj.GET_reason_codes(this.callbackWithArg.bind(this),null,'405');
    }
    if(this.props.obj.reasonId.REASONID !== '' && this.props.obj.batch.BATCH !== ''){
      var machineId = 405;
      var itemId = this.props.obj.item.ITEM;
      if (Object.keys(this.props.obj.machineId).length !== 0 && Object.keys(this.props.obj.machineId) !== undefined){
        machineId = this.props.obj.machineId.MACHINEID;
      }
      Alert.alert('LiScanner','Do you want to really Remake the Item?', [
        {text:'Yes', onPress:() => 
        {
          itemId.part.map((value, elem) => {
            obj.PATCH_orders_order_item_pane_component_pieceCount_remake(this.callBackWithArgForRemake.bind(this), itemId.orderNo, itemId.itemNo, itemId.pane, itemId.comp,
            value.partCnt,machineId,itemId.stepNo);

          })

              this.props.setReasonId('');
              this.props.setBatch('');
        }

        },
        {text:'No',onPress:() => console.log("EXIT NO")}
      ],
    )

  }
}
onPickerselected(itemValue){
  console.log(itemValue);
  this.props.setReasonId(itemValue);
  this.setState({PickerValueHolder:itemValue});
}
render() {
  ScanExample.setTitle("LiScanner - Item  - Broken");



  var isLoading = this.state.isLoading;
  var responsechoices = this.state.responsechoices;
  var PickerValueHolder = this.state.PickerValueHolder;

  if (Object.keys(this.props.obj.reasonList).length === 0){
    // if(!this.state.isLoading){
    //   { this.state.responsechoices.map((item, key)=>(
    //     console.log(item.code,item.desc))
    //   )}
    // }
  }
  else {
    isLoading = false;
    var
    responsechoices = this.props.obj.reasonList.REASONLIST;
    if(this.props.PickerValueHolder != undefined){
      PickerValueHolder = this.props.PickerValueHolder;
      if(PickerValueHolder >= responsechoices.length){
        MenuConnector.showToast("Reason Code Not Found...Fetching from Server");
      }
    }

  }

  var result = '';
  var res = '';
 if (Object.keys(this.props.obj.batch).length !== 0 && Object.keys(this.props.obj.batch) !== undefined && this.props.obj.batch.BATCH !== undefined && this.props.obj.batch.BATCH !== ''){
    res = this.props.obj.batch.BATCH;
  }
  if (Object.keys(this.props.obj.reasonId).length !== 0 && Object.keys(this.props.obj.reasonId) !== undefined && this.props.obj.reasonId.REASONID !== undefined && this.props.obj.reasonId.REASONID !== ''){
    result = this.props.obj.reasonId.REASONID;
    PickerValueHolder = this.props.obj.reasonId.REASONID;
  }
  else{
    result = this.props.result;
    PickerValueHolder = this.state.PickerValueHolder;
  }
  return (
    <Container>
      <LiFlatList Menu = {this.state.GridViewItems}  isfinalScreen = {true} rackcode={result} itemcode={res} columns = {1} Gotomenu={(item)=> this.onActionButtonPressed.bind(this,item)}/>

      <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
        <Text style={styles.readyText}>
          Reasons:
        </Text>
        {isLoading ? <ActivityIndicator/> :
          <Picker
            selectedValue={PickerValueHolder}
            style={{ height: 50, width: 410 }}
            onValueChange={(itemValue, itemIndex) => this.onPickerselected(itemValue)}>
            { responsechoices.map((item, key)=>(
              <Picker.Item label={item.desc} color="#660033" value={item.code.toString()} key={key}/>)
            )}

          </Picker>
        }
      </View>
    </Container>
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
    setReasonList:Action.setReasonList,
    setReasonId:Action.setReasonId,
    setReasonChoicesUpdated:Action.setReasonChoicesUpdated
  }, dispatch)
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(ItemBroken);
const styles = StyleSheet.create({
  readyText:{
    color: '#660033',
    fontSize: 20,
    fontWeight: "bold",
    height:45,
    width:150,
  }
});
