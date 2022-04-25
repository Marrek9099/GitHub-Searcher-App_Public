# GitHub Searcher 

## Technologies used
React, Redux, JavaScript, HTML, CSS

## Description
App allows user to search for Github users and repositories.

## URL
https://dimitar-github-searcher.netlify.app

## High Level Solution

Use 2 types of state, persisted and non persisted.

The non persisted state will include: displayed search results, current session search term and search category.
Persisted state will include: previous sessions search resulsts.

Whenever user keys in a search term or changes the search category, the app must first check whether 
the search results are already stored in the persisted state. If yes, the search results should be retrieved
from the persisted state and no API calls should be made.

Whenever there is a change in the search term or search category, the app should clear the displayed search resulsts, it should intercept current API calls if any, and it should initiate the new searching process.

App should display notices to user whenever all search results have already been displayed, when there is no search
results for a given search term, and when user has exceeded the GitHub API calls limit.

## Decisions

I have not used React Router because it was not necessary for my version of the solution.
I have used 3 additional libraries: redux-thunk, react-infinite-scroller, and axios.
Redux-thunk was used to create an async action creator.
React-infinite-scroller and axios were used to speed up the development process.


