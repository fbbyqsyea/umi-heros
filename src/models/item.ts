import { Effect, Reducer, Subscription, request } from 'umi';

export interface ItemProps {
    des1:string,
    item_id:number,
    item_name:string,
    item_type:number,
    price:number,
    total_price:number,
}

export interface ItemModelState {
    name:string,
    items:ItemProps[],
}

export interface ItemModelType {
    namespace:'item',
    state:ItemModelState,
    effects:{
        query:Effect,
    },
    reducers:{
        save:Reducer<ItemModelState>
    }, 
    subscriptions:{setup:Subscription}
}


const ItemModel:ItemModelType = {
    namespace:'item',
    state:{
        name:'item',
        items:[],
    },
    effects:{
        *query({ payload }, {call, put}){

        },
        *fetch({ type, payload }, { put, call, select }){
            const data = yield request('/web201605/js/item');
            yield put({
                type:'save',
                payload:{
                    items:data
                }
            });
        }
    },
    reducers:{
        save(state, action){
            return {
                ...state,
                ...action.payload,
            }
        },
    },
    subscriptions:{
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if(pathname === '/item'){
                    dispatch({
                        type:'fetch'
                    });
                }
            });
        },
    }
};

export default ItemModel