import axios from 'axios'



export const fetchData = (searchType, query, pageNumber, setHasMoreItems, setErrorMessage) => async (dispatch, getState) => {

    try {

        const {data} = await axios.get(`https://api.github.com/search/${searchType}?q=${query}&per_page=9&page=${pageNumber}`, {headers: {
            Authorization: 'your token'
            }
        });
    
        const {items} = data;
        const fullDetailsItems = [];

        if(items.length > 0){
            for(let dataItem of items){
                if(getState().currentQuery === query && getState().currentSearchType === searchType) {
                    const {data} = await axios.get(dataItem.url, {headers: {
                        Authorization: 'your token'
                        }
                    });
                    fullDetailsItems.push(data);
                } 
                else {
                    break;
                };
            };
         
            if(fullDetailsItems.length > 0) {
                if(getState().currentQuery === query && getState().currentSearchType === searchType) {
                    dispatch( {type: `FETCH_${searchType.toUpperCase()}`, payload: {
                        query,
                        pageNumber,
                        items: fullDetailsItems
                    }}); 
                };
            };
        }
        else {
            setHasMoreItems(false);
        };
    } catch(e) {
        setHasMoreItems(false);
        setErrorMessage('API limit exceeded. Please try again after 10 minutes');
    };
    
};


export const retrieveData = data => {
    return {
        type: 'RETRIEVE_DATA',
        payload:{ items: data[0] }
    };
};


export const updateQuery = query => {
    return {
        type: 'UPDATE_QUERY',
        payload : query
    };
};


export const updateSearchType = searchType => {
    return {
        type: 'UPDATE_SEARCH_TYPE',
        payload : searchType
    };
};


export const clearDisplayData = () => {
    return {
        type: 'CLEAR_DISPLAY_DATA'
    };
};