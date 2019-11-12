import React from 'react'
import ReactDOM from "react-dom"
import './index.css'
import Popular from './components/Popular';

//component, state, lifecycle, ui
class App extends React.Component {
	render() {
		return (
			<div> 
				<Popular/>
			</div>

		)
		
	}
}


ReactDOM.render(<App />, document.getElementById('app'));