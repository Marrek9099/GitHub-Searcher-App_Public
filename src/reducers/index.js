import { combineReducers } from 'redux';
import displayedSearchResults from './displayedSearchResults';
import savedUsersData from './savedUsersData';
import savedRepositoriesData from './savedRepositoriesData';
import currentQuery from './currentQuery';
import currentSearchType from './currentSearchType';


export default combineReducers({
    displayedSearchResults: displayedSearchResults,
    savedUsersData: savedUsersData,
    savedRepositoriesData: savedRepositoriesData,
    currentQuery: currentQuery,
    currentSearchType: currentSearchType
});