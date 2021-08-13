import React from 'react'
import { useDispatch } from "react-redux"
import { pullTrees } from '../store/reducers/trees'
import { pullNamedTrees } from '../store/reducers/named'
import { setType } from '../store/reducers/search'
import { check, capital, handleSearchError } from '../utils/FrontHandlers'

export default function Search() {

    const dispatch = useDispatch()
    const [zip, setZip] = React.useState(null)
    const [id, setId] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [health, setHealth] = React.useState(null)
    const [common, setCommon] = React.useState(null)
    const [latin, setLatin] = React.useState(null)
    const [alert, setAlert] = React.useState(null)
    const [checkLabel, setCheckLabel] = React.useState({ labeled: true, noLabeled: true })
    let user = JSON.parse(localStorage.getItem('user'))
    const token = 'Baerer ' + user.token
    
    const handleSearch = async (e) => {
        try {
            if(e.keyCode === 13) {
                const datas = {
                    ...(check(id)) && {tree_id: id.target.value}, 
                    ...(check(zip)) && {zipcode: zip.target.value}, 
                    ...(check(status)) && {status: capital(status.target.value)}, 
                    ...(check(health)) && {health: capital(health.target.value)}, 
                    ...(check(common)) && {spc_common: capital(common.target.value)}, 
                    ...(check(latin)) && {spc_latin: capital(latin.target.value)}, 
                }
                if(handleSearchError(datas)) return setAlert('Invalid inputs')
                await dispatch(setType(checkLabel))
                .then(() => dispatch(pullTrees(datas))
                .then(() => dispatch(pullNamedTrees(token))))
            }
        } catch (err) { console.log(err) }
    }

    const handleClick = async () => {
        try {
            const datas = {
                ...(check(id)) && {tree_id: id.target.value}, 
                ...(check(zip)) && {zipcode: zip.target.value}, 
                ...(check(status)) && {status: capital(status.target.value)}, 
                ...(check(health)) && {health: capital(health.target.value)}, 
                ...(check(common)) && {spc_common: capital(common.target.value)}, 
                ...(check(latin)) && {spc_latin: capital(latin.target.value)}, 
            }
            if(handleSearchError(datas)) return setAlert('Invalid inputs')
            await dispatch(setType(checkLabel))
            await dispatch(pullTrees(datas))
            .then(()=> dispatch(pullNamedTrees(token)))
        } catch (err) { console.log(err) }
        
    }

    const handleChangeL = e => {
        setCheckLabel({...checkLabel, labeled: e.target.checked })
    }

    const handleChangeN = e => {
        setCheckLabel({...checkLabel, noLabeled: e.target.checked })
    }

    return (
        <div className='search-container'>
            <div className='search-bar'>
                <input
                    type="text"
                    id="search"
                    className="search"
                    placeholder="Common Species..."
                    onKeyUp={handleSearch}
                    onChange={data => setCommon(data)}
                />
                <button className='search-btn' onClick={handleClick}>Search</button>
                <div className='check-container'>
                    <label className='check'>
                        <input
                            name="label"
                            type="checkbox"
                            checked={checkLabel.labeled}
                            onChange={handleChangeL} 
                        />
                        &nbsp;&nbsp;Labeled
                    </label>
                    <label className='check'>
                        <input
                            name="noLabel"
                            type="checkbox"
                            checked={checkLabel.noLabeled}
                            onChange={handleChangeN} 
                        />
                        &nbsp;&nbsp;No labeled
                    </label>
                </div>
            </div>
            <div className='filter-container'>
            <input
                    type="text"
                    className="filter"
                    placeholder="Tree ID..."
                    onKeyUp={handleSearch}
                    onChange={data => setId(data)}
                />
                 <input
                    type="text"
                    className="filter"
                    placeholder="Status..."
                    onKeyUp={handleSearch}
                    onChange={data => setStatus(data)}
                />
                 <input
                    type="text"
                    className="filter"
                    placeholder="Heatlth..."
                    onKeyUp={handleSearch}
                    onChange={data => setHealth(data)}
                />
                 <input
                    type="text"
                    className="filter"
                    placeholder="Zip Code..."
                    onKeyUp={handleSearch}
                    onChange={data => setZip(data)}
                />
                 <input
                    type="text"
                    className="filter"
                    placeholder="Latin Species..."
                    onKeyUp={handleSearch}
                    onChange={data => setLatin(data)}
                />
                </div>
                    <h2 onClick={() => setAlert(null)} 
                        className={alert ? 'invalid' : 'invalid-transparent'}>
                        {alert} &nbsp;❌
                    </h2>
        </div>
    )
}
