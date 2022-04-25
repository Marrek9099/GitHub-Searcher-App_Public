

const displayedSearchResults = (state = [], action) => {
    
    if(action.type === 'CLEAR_DISPLAY_DATA') {
        return [];
    };

    if(action.type === 'FETCH_REPOSITORIES' || action.type === 'FETCH_USERS' || action.type === 'RETRIEVE_DATA') {
    
        const duplicatesFreeData = [];

        for(let newData of action.payload.items){
            let duplicateChecker = false;

            for(let stateData of state ){
                if(newData.id === stateData.id){
                    duplicateChecker = true;
                };
            };

            if(!duplicateChecker){
                duplicatesFreeData.push(newData);
            };
        };
        
        return [ ...state, ...duplicatesFreeData ];
    }; 
    
    return state;
};

export default displayedSearchResults;
