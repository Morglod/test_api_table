import { Link } from 'react-router';

export default class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<div className='panel side-bar'>
					<Link to='/department'>Department</Link>
					<Link to='/employee'>Employee</Link>
				</div>
				<div className='panel main'>
					{this.props.children}
				</div>
			</div>
		)
	}
}