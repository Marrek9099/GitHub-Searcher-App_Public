const currentSearchType = (state = 'repositories', action) => {
    if(action.type === 'UPDATE_SEARCH_TYPE') {
        return action.payload;
    };
    
    return state;
}

export default currentSearchType;