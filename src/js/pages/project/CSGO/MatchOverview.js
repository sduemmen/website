import React from 'react'

const MatchOverview = ({match}) => {

    return (
        <div className="csgo__match-overview">
            {match && 
                <iframe 
                    className='twitch-player'
                    title='live_embed'
                // TODO: fix parent domain
                    src={match.live_embed_url + '&parent=localhost'}
                    allowFullScreen>
                </iframe>}
        </div>
    )
}

export default MatchOverview