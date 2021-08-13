import React from 'react'
import { useSelector } from "react-redux";
import TreeCard from './TreeCard'
import { filterNoLabeled } from '../utils/FrontHandlers'

export default function TreeList() {

    const type = useSelector(state => state.searchType)
    const allTrees = useSelector(state => state.trees.data)
    const labeled = useSelector(state => state.named.data)
    let noLabeled = filterNoLabeled(labeled, allTrees)

    let trees = []

    if(type && type.labeled && type.noLabeled) trees = allTrees
    if(type && type.labeled && !type.noLabeled) trees = labeled
    if(type && !type.labeled && type.noLabeled) trees = noLabeled

    return (
        <div>
            {trees && trees.length ? <h5 className='len-results'>Showing {trees.length} results:</h5> : ''}
                {trees && trees.length ? 
            <div className='tree-grid'>
                { trees.map((tree, i) => <TreeCard key={i} tree={tree}/>) }
            </div>
                :
                <h3 className='no-trees'>No trees in sight.</h3>
                }
        </div>
    )
}
