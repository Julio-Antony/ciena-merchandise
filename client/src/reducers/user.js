import { GET_SOME_USERS } from '../actions/types';

const initialState = {
    users : {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type){
        case GET_SOME_USERS:
            return{
                ...state,
                users:{payload}
            }

            default:
                return state;
    }

}