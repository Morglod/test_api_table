import { fetchDepartment, updateDepartment } from 'api';
import Modal from 'modal';
const { PropTypes } = React;

class DepartmentCard extends React.Component {
	static propTypes = {
		department: PropTypes.object,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func
	}
	
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	
	render() {
		const { id, name } = this.props.department;
		return (
			<Modal open>
				<input type="text" ref="name" placeholder="Name" defaultValue={name} />
				<button onClick={() => this.submit()}>Apply</button>
				<button onClick={() => this.props.onCancel()}>Cancel</button>
			</Modal>
		)
	}
	
	submit() {
		const value = {
			name: this.refs.name.value
		};
		
		if(value.name.trim().length === 0) return;
		
		const { id } = this.props.department;
		this.props.onSubmit(Object.assign(value, {id}));
	}
}

export default class DepartmentPage extends React.Component {
	constructor() {
		super();
		this.state = {
			departmentList: [],
			err: undefined,
			selectedId: undefined
		}
		this.fetchData = this.fetchData.bind(this);
	}
	
	fetchData() {
		fetchDepartment()
			.then(departmentList => this.setState({ departmentList, err: undefined }))
			.catch(err => this.setState({ err, departmentList: [] }));
	}
	
	componentWillMount() {
		this.fetchData();
	}
	
	render() {
		const { departmentList, err, selectedId } = this.state;
		
		return (
			<div>
				{(selectedId !== undefined) &&
					<DepartmentCard
						department={selectedId !== undefined && departmentList.find(x => x.id === selectedId)}
						onSubmit={
							value => updateDepartment(value)
										.then(this.fetchData)
										.then(() => this.setState({ selectedId: undefined }))
										.catch(err => this.setState({ err }))
						}
						onCancel={
							() => this.setState({ selectedId: undefined })
						}
					/>
				}
				{err && <div className='error'>{err}</div>}
				{departmentList.map(d =>
					<div
						className='list-item'
						key={d.id}
						children={d.name}
						onClick={() => this.setState({ selectedId: d.id })}
					/>
				)}
			</div>
		)
	}
}