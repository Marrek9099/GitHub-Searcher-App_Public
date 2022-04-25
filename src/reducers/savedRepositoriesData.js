const savedRepositoriesData = (state = {}, action) => {

    if(action.type === 'FETCH_REPOSITORIES') {
        if(state[action.payload.query]){
            return { ...state, [action.payload.query]: {...state[action.payload.query], [action.payload.pageNumber]: [action.payload.items]}
        }}
        else {
            return {...state, [action.payload.query]: {[action.payload.pageNumber]: [action.payload.items]}}
        }; 
    };
    
    return state;
};

export default savedRepositoriesData;