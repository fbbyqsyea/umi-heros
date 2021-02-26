import { Effect, Reducer, Subscription, request } from 'umi';

export interface SummonerProps {
    summoner_id:number,
    summoner_name:string,
    summoner_rank:string,
    summoner_description:string
}

export interface SummonerModelState {
    name:string,
    summoners:SummonerProps[],
}

export interface SummonerModelType {
    namespace:'summoner',
    state:SummonerModelState,
    effects:{
        query:Effect,
    },
    reducers:{
        save:Reducer<SummonerModelState>
    },
    subscriptions:{ setup: Subscription }
}

const SummonerModel:SummonerModelType = {
    namespace:'summoner',
    state:{
        name:'summoner',
        summoners:[],
    },
    effects:{
        *query({ payload }, { call, put }){

        },
        *fetch({ type, payload }, { put, call, select }){
            const data = yield request('/web201605/js/summoner');
            yield put({
                type:'save',
                payload:{
                    summoners:data,
                },
            });
        },
    },
    reducers:{
        save(state, action){
            return {
                ...state,
                ...action.payload
            };
        }
    },
    subscriptions:{
        setup({ dispatch, history }){
            return history.listen(({ pathname, query }) => {
                if(pathname === '/summoner'){
                    dispatch({
                        type:'fetch'
                    });
                }
            });
        }
    },
};

export default SummonerModel