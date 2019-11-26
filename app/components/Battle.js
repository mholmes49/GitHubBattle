import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from "prop-types"

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
                    <FaUserFriends className='bg-lite' color='rgb(255,191,116)' size={140}/>
                </li>
                <li>
                    <h3 className="header-sm">
                         Battle
                    </h3>
                    <FaFighterJet className='bg-lite' color='#72,72,72' size={140}/>
                </li>
                <li>
                    <h3 className="header-sm">
                        See the winners
                    </h3>
                    <FaTrophy className='bg-lite' color='rgb(255, 215,0)' size={140}/>
                </li>
            </ol>
        </div>
    )
}
function PlayerPreview ({ username, onReset, label }) {
    return (
      <div className='column player'>
        <h3 className='player-label'>{label}</h3>
        <div className='row bg-light'>
          <div className='player-info'>
            <img
              className='avatar-small'
              src={`https://github.com/${username}.png?size=200`}
              alt={`Avatar for ${username}`}
            />
            <a
              href={`https://github.com/${username}`}
              className='link'>
                {username}
            </a>
          </div>
          <button className='btn-clear flex-center' onClick={onReset}>
            <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
          </button>
        </div>
      </div>
    )
  }
PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit (e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username)
    }
    handleChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return ( 
            <form className="column player" onSubmit={this.handleSubmit}>
                <label htmlFor='username' className="player-label">
                    {this.props.label}
                </label>
                <div className="row player-inputs">
                    <input 
                        type='text'
                        id='username'
                        className="input-light"
                        placeholder="github username"
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button 
                        className="btn dark-btn" 
                        type="submit"
                        disabled={!this.state.username}
                    > 
                        Submit
                    </button>
                </div>

            </form>
        )
    }
}
PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default class Battle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerOne: null,
            playerTwo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit (id, player) {
        this.setState({
            [id]:player
        })
    }
    render() {
        const {playerOne, playerTwo} = this.state;
        return(
            <React.Fragment>
                <Instructions/>
                <div className="players-container">
                    <h1 className="center-text header-lg">Players</h1>
                    <div className="row space-around"> 
                        {playerOne===null ? (
                            <PlayerInput onSubmit={(player)=>this.handleSubmit("playerOne", player)} label="Player One"/>
                        ) :(
                            <PlayerPreview label="Player One" username={this.state.playerOne} onReset={()=>console.log("reset")}/>
                        )}
                        {playerTwo===null ?(
                            <PlayerInput onSubmit={(player)=>this.handleSubmit("playerTwo", player)} label="Player Two"/>
                        ) :(
                            <PlayerPreview label="Player Two" username={this.state.playerTwo} onReset={()=>console.log("reset")}/>
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 