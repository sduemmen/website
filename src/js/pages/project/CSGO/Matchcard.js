import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const Matchcard = ({ data, onSelection, isSelectedMatch }) => {
    let score1 = data.status !== "not_started" ? data.results[0]?.score : "-";
    let score2 = data.status !== "not_started" ? data.results[1]?.score : "-";
    let team1_is_winner = data.status === "finished" && score1 > score2;
    let team2_is_winner = data.status === "finished" && score1 < score2;

    let date = null; 
    let year = null; let day = null; let month = null; let hours = null; let minutes = null;
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    if (data.begin_at) {
        date = new Date(data.begin_at);
        year = date.getFullYear();
        day = date.getDate();
        month = months[date.getMonth()];
        hours = date.getHours();
        minutes = date.getMinutes();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    }

    return (
        <tr className="csgo__matchcard">
            <td className={"csgo__matchcard__team1" + (team1_is_winner ? " winner" : "")}>
                <span className="team-holder">
                    <span className="name-holder">
                        <span className={"name" + (team1_is_winner ? " winner" : "")}>
                            {data.opponents[0] ? data.opponents[0].opponent.name : "TBD"}
                        </span>
                    </span>
                    <span className="logo-holder">
                        <img src={data.opponents[0] ? data.opponents[0].opponent.image_url : ""} alt="" className="logo" />
                    </span>
                </span>
            </td>

            <td className="csgo__matchcard__score">
                <span className="score">
                    {score1}
                        {data.status !== 'running' 
                            ? <BsFillCircleFill className='not_started'/>
                            :  <BsFillCircleFill className='live'/>}
                        <div className="csgo__matchcard__matchinfo">
                            {data.number_of_games && 
                                <p className="csgo__matchcard__matchinfo__num-of-matches">
                                    BO{data.number_of_games}
                                </p>}
                            {data.begin_at && 
                                <p className="csgo__matchcard__matchinfo__begin-time">
                                    {month + " " + day + ", " + year + " - " + hours + ":" + minutes}
                                </p> }
                        </div>
                    {score2}
                </span>
            </td>

            <td className={"csgo__matchcard__team2" + (team2_is_winner ? " winner" : "")}>
                <span className="team-holder">
                    <span className="logo-holder">
                        <img src={data.opponents[1] ? data.opponents[1].opponent.image_url : ""} alt="" className="logo" />
                    </span>
                    <span className="name-holder">
                        <span className={"name" + (team2_is_winner ? " winner" : "")}>
                            {data.opponents[1] ? data.opponents[1].opponent.name : "TBD"}
                        </span>
                    </span>
                </span>
            </td>

            <td className={"csgo__matchcard__tournament" + (isSelectedMatch ? " active" : "")} onClick={() => onSelection(data)}>
                <span className="logo-holder">
                    <img 
                        src={data.league ? data.league.image_url : ""} 
                        alt="" 
                        title={data.league.name + ' ' + data.serie.full_name} 
                        className="logo" 
                    />
                </span>
            </td>
        </tr>
    )
}

export default Matchcard