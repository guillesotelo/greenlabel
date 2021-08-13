import React from 'react'

export default function MyTreeCard({tree}) {

    return (
        <div>
            {tree &&
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
                    </div>
                    <h4 className='already-labeled'>{tree.name}</h4>
                </div>
            </div>
            }
        </div>
    )
}
