import React from 'react';


const DataItem = ({data, searchType}) => {

    if(searchType === 'users'){
        const image = data.avatar_url;
        if(data.login) {
            return (
                <div className="dataItem">
                    <img src={image} alt={`github user ${data.name}`}></img>
                    <div className="userDetails">
                        <p>{`Login: ${data.login}`}</p>
                        {data.name? <p>{`Name: ${data.name}`}</p> :''}
                        {data.location? <p>{`Location: ${data.location}`}</p> :''}
                        <p>{`Joined GitHub: ${data.created_at.slice(0,10)}`}</p>
                        <a href={data.html_url} rel="noreferrer" target="_blank">View on GitHub</a>
                    </div>
                </div>  
            )
        }
        else {
                return ''
        };
    };
        
        
    if(data.owner){
        return (
            <div className="dataItem">
                 <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt={`github user ${data.login}`}></img>
                    <div className="repositoryDetails">
                        {data.name? <p>{`Name: ${data.name}`}</p> :''}
                        <p>{`Author: ${data.owner.login}`}</p> 
                        <p>{`Stars: ${data.stargazers_count}`}</p>
                        <p>{`Open Issues: ${data.open_issues}`}</p>
                        <p>{`Created on: ${data.created_at.slice(0,10)}`}</p>
                        <a href={data.html_url} rel="noreferrer" target="_blank">View on GitHub</a>
                    </div>
            </div>
        )
    } else {
        return '';
    };
        
};
    
export default DataItem;