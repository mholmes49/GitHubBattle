import React from 'react'
import ReactDOM from "react-dom"
import './index.css'
import Popular from './components/Popular';
import Battle from './components/Battle'

//component, state, lifecycle, ui
class App extends React.Component {
	render() {
		return (
			<div> 
				<Battle/>
			</div>

		)
		
	}
}


ReactDOM.render(<App />, document.getElementById('app'));