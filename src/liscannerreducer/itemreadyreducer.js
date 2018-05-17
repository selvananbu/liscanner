const initial = {
    rackId: {},
    batch: {},
    item:{}
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
        case  "SET_ITEM":
            state  =  {
                ...state,
                item: { ['ITEM']:  action.payload },
            }
            break;

    }
return state;
} 
    
    