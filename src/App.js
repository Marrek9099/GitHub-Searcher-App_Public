import './style.css'
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchData, retrieveData, clearDisplayData, updateQuery, updateSearchType } from './actions/index';
import InfiniteScroll from 'react-infinite-scroller';
import DataItem from './DataItem';

let pageNumber = 0;
let intervalId = null;

const App = ({retrieveData, fetchData, clearDisplayData, displayData, savedUsersData, savedRepositoriesData, currentQuery, currentSearchType, updateQuery, updateSearchType}) => {

    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    
    const getData = () => {
  
        pageNumber++;

            if(currentSearchType === 'repositories' && (savedRepositoriesData[currentQuery])){
                if(savedRepositoriesData[currentQuery][pageNumber]) {
                    retrieveData(savedRepositoriesData[currentQuery][pageNumber]);
                }
                else {
                    fetchData(currentSearchType, currentQuery, pageNumber, setHasMoreItems, setErrorMessage);
                };
    
            } else if (currentSearchType === 'users' && (savedUsersData[currentQuery])) {
                if(savedUsersData[currentQuery][pageNumber]) {
                    retrieveData(savedUsersData[currentQuery][pageNumber]);
                }
                else {
                    fetchData(currentSearchType, currentQuery, pageNumber, setHasMoreItems, setErrorMessage);
                };
    
            } else {
                fetchData(currentSearchType, currentQuery, pageNumber, setHasMoreItems, setErrorMessage);
            };
    };

    const onFilterChange = e => {
        
        if(e.target.id === 'selectionType'){
            updateSearchType(e.target.value);
            pageNumber = 0; 
            clearDisplayData();
            setHasMoreItems(true);
        }
        else {
            clearInterval(intervalId);
            intervalId = setTimeout(() => {
                    updateQuery(e.target.value);
                    pageNumber = 0; 
                    clearDisplayData();
                    setHasMoreItems(true);
            }, 2000);
        }; 
    };


    const renderEndSearchNotice = () => {
        if(displayData.length > 0 && (!hasMoreItems) && (!errorMessage)) return <div className="searchNotice">{`No more search results for ${currentQuery}`}</div>
        if(displayData.length === 0 && (!hasMoreItems) && (!errorMessage)) return <div className="searchNotice">{`No search results for ${currentQuery}`}</div>
        if(errorMessage) return <div className="searchNotice">{errorMessage}</div>
    };

    
    const renderSearchResults = () => {
        if(currentQuery.length >= 3) {
            return (
                <div className="searchResults">
                    <InfiniteScroll
                            pageStart={0}
                            loadMore={getData}
                            hasMore={hasMoreItems}
                            loader={<h4 key='key'className="searchNotice">Fetching Data</h4>}
                    >
                        {displayData.map( data => <DataItem data={data} searchType={currentSearchType} key={data.id}></DataItem>)}   
                    </InfiniteScroll>
                </div>
            );
        };
    };

    return (
        <div className="container"> 
            <div className={`filterPanel ${currentQuery.length >= 3? 'alignedPosition' : ''}`} >
                <div className='filterPanelHeader'>
                    <i className="fab fa-github"></i>
                    <div>
                        <h3>GitHub Searcher</h3>
                        <p>Search users or repositories</p>
                    </div>
                </div>
                <div className='filterPanelFields'>
                    <input placeholder="Start typing to search..." onChange={e => onFilterChange(e)} type="text"></input>
                    <select onChange={e => onFilterChange(e)} id="selectionType">
                        <option value="repositories">Repositories</option>
                        <option value="users">Users</option>
                    </select>
                </div>
            </div>
            {renderSearchResults()}
            {renderEndSearchNotice()}
        </div>
    );
};

const mapStateToProps = state => { return {
    displayData: state.displayedSearchResults,
    savedUsersData: state.savedUsersData,
    savedRepositoriesData: state.savedRepositoriesData,
    currentQuery: state.currentQuery,
    currentSearchType: state.currentSearchType
}};


export default connect(mapStateToProps,{fetchData, retrieveData, clearDisplayData, updateQuery, updateSearchType})(App);