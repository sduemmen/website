import React, { useEffect, useState } from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { BiTrash } from 'react-icons/bi';
import Matchcard from './Matchcard';
import MatchOverview from './MatchOverview';
require('dotenv').config();

const Matches = () => {
    const [matches, setMatches] = useState(null);
    const [filter, setFilter] = useState({"S": true, "A": true, "B": true, "C": true, "D": true, "_ShowFinishedMatches": true});
    const [currentMatchData, setCurrentMatchData] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const TIMEOUT = 10;

    const updateMatchList = (hasRefreshed) => {
        setLoading(true);
        let timeStamp = localStorage.getItem('csgo-timestamp');
        let localStorageHasTimestamp = timeStamp ? true : false
        let timeStampIsOutdated = ((parseInt(timeStamp, 10) + TIMEOUT * 1000) < Date.now());
        if ((localStorageHasTimestamp && timeStampIsOutdated) || !localStorageHasTimestamp) {
            
            let today = new Date(Date.now());
            let tomorrow = new Date(today.getTime() + 86400000);
            today.setHours(0, 0, 0, 0);
            tomorrow.setHours(0, 0, 0, 0);

            const options = { method: 'GET', headers: { Accept: 'application/json', Authorization: 'Bearer ' + process.env.REACT_APP_PANDASCORE_APIKEY } };
            const proxy = 'https://sduemmen-proxy.herokuapp.com/'

            const url = 'https://api.pandascore.co/csgo/matches?sort=begin_at&range[begin_at]=' + today.toISOString() + ',' + tomorrow.toISOString() + '&page=1&per_page=80'
            fetch(proxy + url, options)
                .then(res => res.json())
                .then(res => {
                    setMatches(res);
                    setCurrentMatchData(res);
                    if (hasRefreshed) {
                        handleFilterChange(null, res)
                    }
                    localStorage.setItem('csgo-matches', JSON.stringify(res))
                    setLoading(false);
                })
            
            localStorage.setItem('csgo-timestamp', Date.now());
            console.log("Fetching live data...");

        } else {

            let cachedMatches = localStorage.getItem('csgo-matches');
            if (cachedMatches) {
                setMatches(JSON.parse(cachedMatches));
                setCurrentMatchData(JSON.parse(cachedMatches));
                setLoading(false);
            }
            console.log("Fetching data from cache...");
        }
    }

    const fetchSelectedMatch = () => {
        let cached = localStorage.getItem("csgo-selected-match");
        if (cached) {
            cached = JSON.parse(cached);
            if (cached.status === "running") {
                setSelectedMatch(cached);
            }
        }
    }

    useEffect(() => {
        updateMatchList();
        fetchSelectedMatch();
        // eslint-disable-next-line
    }, [])

    const handleFilterChange = (e, data) => {
        setLoading(true);
        let filter_copy = {...filter};

        if (e) {
            let target = e.target.name;
            let filterType = filter_copy[target];
            filterType = !filterType;
            filter_copy[target] = filterType;
            setFilter({...filter_copy});
        }
        

        let matches_copy = data ? data : [...matches];
        
        let m1 = matches_copy.filter(match => filter_copy["_ShowFinishedMatches"] || match.status !== "finished");
        let m2 = m1.filter(match => {
            let match_tier = match.tournament.tier.toUpperCase();
            if (filter_copy[match_tier]) {
                return true;
            }
            return false;
        })
        setLoading(false);
        setCurrentMatchData([...m2]);
    }

    const selectedMatchChangedHandler = match => {
        setSelectedMatch(match);
        localStorage.setItem("csgo-selected-match", JSON.stringify(match));
    }

    const resetFilter = () => {
        setFilter({...filter, ...{"S": true, "A": true, "B": true, "C": true, "D": true, "_ShowFinishedMatches": true}})
        setCurrentMatchData([...matches]);
    }

    return (
        <>
        {loading ? 
            <div className="loader"></div>
            :
            <>
            <div className='csgo__matches__container'>
                <div className="csgo__matches__settings">
                    <input 
                        className='tier-checkbox'
                        id='show-finished-matches'
                        type="checkbox" 
                        name="_ShowFinishedMatches"
                        value={filter["_ShowFinishedMatches"]} 
                        checked={filter["_ShowFinishedMatches"]} 
                        onChange={handleFilterChange}
                    />
                    <label htmlFor="show-finished-matches" className="tier-label">Show Finished Matches</label>
                    <input 
                        className='tier-checkbox'
                        id='s-tier'
                        type="checkbox" 
                        name="S" 
                        value={filter["S"]} 
                        checked={filter["S"]} 
                        onChange={handleFilterChange}
                    />
                    <label className="tier-label" htmlFor="s-tier">S-Tier</label>
                    <input 
                        className='tier-checkbox'
                        id='a-tier'
                        type="checkbox" 
                        name="A" 
                        value={filter["A"]} 
                        checked={filter["A"]} 
                        onChange={handleFilterChange}
                    />
                    <label className="tier-label" htmlFor="a-tier">A-Tier</label>
                    <input 
                        className='tier-checkbox'
                        id='b-tier'
                        type="checkbox" 
                        name="B" 
                        value={filter["B"]} 
                        checked={filter["B"]} 
                        onChange={handleFilterChange}
                    />
                    <label className="tier-label" htmlFor="b-tier">B-Tier</label>
                    <input 
                        className='tier-checkbox'
                        id='c-tier'
                        type="checkbox" 
                        name="C" 
                        value={filter["C"]} 
                        checked={filter["C"]} 
                        onChange={handleFilterChange}
                    />
                    <label className="tier-label" htmlFor="c-tier">C-Tier</label>
                    <input 
                        className='tier-checkbox'
                        id='d-tier'
                        type="checkbox" 
                        name="D" 
                        value={filter["D"]} 
                        checked={filter["D"]} 
                        onChange={handleFilterChange}
                    />
                    <label className="tier-label" htmlFor="d-tier">D-Tier</label>
                    <button 
                        className="csgo__matches__refresh" 
                        onClick={() => resetFilter()}
                        title="Clear Filters"
                    >
                        <BiTrash />
                    </button>
                    <button 
                        className="csgo__matches__refresh" 
                        onClick={() => {
                            updateMatchList(true);
                        }}
                        title="Refresh Matchlist"
                    >
                        <VscDebugRestart />
                    </button>
                </div>
                {currentMatchData.length > 0 ?
                    <table className="csgo__matches">
                        <tbody>
                            {currentMatchData.map((data, index) => <Matchcard data={data} key={index} onSelection={selectedMatchChangedHandler} isSelectedMatch={data.id === selectedMatch?.id}/>)}
                        </tbody>
                    </table>
                    :
                    <div className="no-matches-hint">
                        No ongoing Matches
                    </div>
                    }
            </div>
            <MatchOverview match={selectedMatch}/>
            </>}
        </>
    )
}

export default Matches