import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

function Instructions() {
    return (
        <div className="instructions-container"> 
            <h1 className='center-text header-lg'> 
                Instructions 
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className="header-sm">
                        Enter 2 Github users
                    </h3>
                    <FaUserFriends class='bg-lite' color='rgb(255,191,116)' size={140}/>
                </li>
                <li>
                    <h3 className="header-sm">
                         Battle
                    </h3>
                    <FaFighterJet class='bg-lite' color='#72,72,72' size={140}/>
                </li>
                <li>
                    <h3 className="header-sm">
                        See the winners
                    </h3>
                    <FaTrophy class='bg-lite' color='rgb(255, 215,0)' size={140}/>
                </li>
            </ol>
        </div>
    )
}

export default class Battle extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Instructions/>
            </React.Fragment>
        )
    }
} 