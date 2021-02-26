import { Effect, Reducer, Subscription, request } from 'umi';

export interface HeroProps {
    ename:number;
    cname:string;
    title:string;
    new_type:number;
    hero_type:number;
    skin_name:string;
}

export interface HeroModelState {
    name:string,
    heros:HeroProps[],
    filterKey:0,
    freeHeros:[],
    itemHover:0,
};

export interface HeroModelType {
    namespace:'hero';
    state:HeroModelState;
    effects:{
        query:Effect;
    };
    reducers:{
        save:Reducer<HeroModelState>;
    }
    subscriptions: { setup: Subscription };
};

const HeroModel:HeroModelType = {
    namespace:'hero',
    state:{
        name:'hero',
        heros:[],
    },
    effects:{
        *query({ payload }, {call, put}){

        },
        *fetch({ type, payload }, { put, call, select }) {
            const data = yield request('/web201605/js/herolist');
            const freeheros = yield request('/web201605/js/freeheros', {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json; charset=utf-8',
                },
                body:JSON.stringify({
                    number:21,
                }),
            });
            yield put({
              type: 'save',
              payload: {
                heros: data,
                freeheros:freeheros,
              },
            });
        },
    },
    reducers:{
        save(state, action){
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    subscriptions:{
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if(pathname === '/hero'){
                    dispatch({
                        type:'fetch'
                    });
                }
            });
        },
    },
};

export default HeroModel