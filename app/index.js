import React from 'react'
import ReactDOM from "react-dom"
import './index.css'
import {ThemeProvider} from "./contexts/Theme"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

//component, state, lifecycle, ui
class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			theme: "light",
			toggleTheme: () => (
				this.setState(({theme})=> ({
					theme: theme === "dark" ? "light" : "dark"
				}))
			)
		}
	}
	render() {
		return (
			<React.Suspense fallback={<Loading />}>
				<Router>
					<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className='container'>
							<Nav />

							<Switch>
								<Route exact path='/' component={Popular} />
								<Route exact path='/battle' component={Battle} />
								<Route path='/battle/results' component={Results} />
								<Route render={() => <h1>404</h1>} />
							</Switch>
						</div>
					</div>
					</ThemeProvider>
				</Router>
			</React.Suspense>
		)
		
	}
}


ReactDOM.render(<App />, document.getElementById('app'));