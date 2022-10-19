import React from 'react';
import User from './User.js';

export default function List(props){
    
    const users = props.users.map(item => {
        return <User form={props.form} setForm={props.setForm} key={item.id} data={item}/>
    });

    function doSearch(e){
        props.search(e.target.value)
    }

    return (
        <div className="users__list">
            <h2>Create connection with:</h2>
            <input onChange={doSearch} type="text" placeholder="search"></input>
            <div className="users__list__connections">
                {users}
            </div>
        </div>
    )
}