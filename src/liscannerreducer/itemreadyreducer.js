const initial = {
  rackId: {},
  batch: {},
  item:{},
  softkey:{},
  readyDisabled:{},
  undoDisabled:{},
  workstepId:{},
  machineId:{},
  reasonList:{},
  reasonId:{},
  reasonchoicesupdated:{}
}

export default function(state= initial,action){
  switch(action.type){

    case "SET_RACK":
    state = {...state,
      rackId: {['RACK'] : action.payload},
    }
    break;
    case "SET_BATCH":
    state = {...state,
      batch: { ['BATCH'] : action.payload},
    }

    break;
    case "SET_SOFTKEY":
    state = {...state,
      softkey: { ['SOFTKEY'] : action.payload},
    }
    break;
    case  "SET_ITEM":
    state  =  {
      ...state,
      item: { ['ITEM']:  action.payload },
    }
    break;
    case  "SET_WORKSTEP_ID":
    state  =  {
      ...state,
      workstepId: { ['WORKSTEPID']:  action.payload },
    }
    break;
    case  "SET_MACHINE_ID":
    state  =  {
      ...state,
      machineId: { ['MACHINEID']:  action.payload },
    }
    break;
    case  "SET_REASON_LIST":
    state  =  {
      ...state,
      reasonList: { ['REASONLIST']:  action.payload },
    }
    break;
    case  "SET_REASON_ID":
    state  =  {
      ...state,
      reasonId: { ['REASONID']:  action.payload },
    }
    break;
    case "CLEAR_ITEM":
    state = {...state,
      item: {},
    }
    break;
    case "SET_READY_DISABLED":
    state = {...state,
      readyDisabled: {['READYDISABLED']: action.payload },
    }
    break;
    case "SET_UNDO_DISABLED":
    state = {...state,
      undoDisabled: {['UNDODISABLED']: action.payload },
    }
    break;
    case "SET_REASON_CHOICES_UPDATED":
    state = {...state,
      reasonchoicesupdated: {['REASONCHOICESUPDATED']: action.payload },
    }
    break;
  }
  return state;
}
