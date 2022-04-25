const currentQuery = (state = '', action) => {

    if(action.type === 'UPDATE_QUERY') {
        return action.payload;
    };
    
    return state;
};

export default currentQuery;