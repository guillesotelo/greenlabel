import React from "react";
import { useSelector } from "react-redux";
import Navbar from './Navbar'
import MyTreeCard from './MyTreeCard'

export default function Profile() {
  
  const user = useSelector(state => state.user.data)
  let userStorage = JSON.parse(localStorage.getItem('user'))
  const trees = user && user.trees ? user.trees : userStorage.trees

  return (
    <div>
        <Navbar/>
      <div>
          <h2 className='hello'>Hello, {userStorage.name}</h2>
      
          <h4 className='my-trees'>Your trees: </h4>
          <div className='tree-grid-me'>
            {trees && trees.length ? trees.map((tree, i) => 
                <MyTreeCard key={i} tree={tree}/>
            ) : <h5 className='no-trees'>You don't have any trees named yet.</h5> }
            </div>
      </div>
      <div>

      </div>
    </div>
  );
}