import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setTree } from '../store/reducers/user'
import { pullNamedTrees } from '../store/reducers/named'

export default function TreeCard({tree}) {

    const dispatch = useDispatch()
    let user = JSON.parse(localStorage.getItem('user'))
    const named = useSelector(state => state.named.data)
    const isLoggedIn =  user && user.token ? true : false
    const [name, setName] = useState('')
    const token = 'Baerer ' + user.token
    
    const checkNamed = arr => {
        let res
        arr.forEach(treeNamed => { 
            if(treeNamed.tree_id === tree.tree_id) 
            res = { name: treeNamed.name,  user: treeNamed.userName}
        }) 
        return res 
    }
    
    let label = named && named.length ? checkNamed(named) : null
    
    const handleName = (e) => {
        if(e.keyCode === 13) {
            const data = {
                userId: user._id, 
                userName: user.name,
                token,
                tree_name: e.target.value,
                tree_id: tree.tree_id,
                zipcode: tree.zipcode,
                status: tree.status,
                health: tree.health,
                spc_common: tree.spc_common,
                spc_latin: tree.spc_latin
            }
            dispatch(setTree(data))
            .then(() => dispatch(pullNamedTrees(token)))
        }
    }

    const handleClick = () => {
        const data = {
            userId: user._id, 
            userName: user.name,
            token,
            tree_name: name.target.value,
            tree_id: tree.tree_id,
            zipcode: tree.zipcode,
            status: tree.status,
            health: tree.health,
            spc_common: tree.spc_common,
            spc_latin: tree.spc_latin
        }
        dispatch(setTree(data))     
        .then(() => dispatch(pullNamedTrees(token)))
    }

    return (
        <div>
            {tree && isLoggedIn &&
            <div className='tree-card-container'>
                <div className='tree-card'>
                    <img className='tree-img' src='https://logo-logos.com/wp-content/uploads/2018/03/Tree-PNG-Image.png' alt='Tree IMG'/>
                    <div className='tree-specs'>
                        {tree.tree_id && <h4 className='tree-spec'>Tree ID: {tree.tree_id}</h4>}
                        <h4 className='tree-spec'>Common species: {tree.spc_common}</h4>
                        <h4 className='tree-spec'>Latin species: {tree.spc_latin}</h4>
                        <h4 className='tree-spec'>Health: {tree.health}</h4>
                        <h4 className='tree-spec'>Status: {tree.status}</h4>
                        {tree.address && <h4 className='tree-spec'>Address: {tree.address}</h4>}
                        <h4 className='tree-spec'>ZP: {tree.zipcode} ({tree.zip_city} - {tree.boroname})</h4>
                        <h4 className='tree-label'>Label: {label ? `"${label.name}" (by ${label.user})` : 'no label'}</h4>
                    </div>
                    {!label ? 
                    <div className='div-name'>
                        <input
                            type="text"
                            className="name-tree"
                            placeholder="Name this tree"
                            onKeyUp={handleName}
                            onChange={data => setName(data)}
                        />
                        <button className="name-btn" onClick={handleClick}>Save</button>
                    </div>
                    : <h4 className='already'>ALREADY LABELED</h4>
                    }
                </div>
            </div>
            }
        </div>
    )
}
