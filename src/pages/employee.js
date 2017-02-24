import { fetchEmployee, updateEmployee } from 'api';
import Modal from 'modal';
const { PropTypes } = React;

class EmployeeCard extends React.Component {
	static propTypes = {
		employee: PropTypes.object,
		departmentList: PropTypes.array,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func
	}
	
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	
	render() {
		const { id, firstName, lastName, departmentId, department } = this.props.employee;
		const { departmentList } = this.props;
		
		return (
			<Modal open>
				<input type="text" ref="firstName" placeholder="First name" defaultValue={firstName} />
				<input type="text" ref="lastName" placeholder="Last name" defaultValue={lastName} />
				<select ref="department" defaultValue={departmentId}>{
					departmentList.map(d =>
						<option value={d.id} key={d.id}>{d.name}</option>
					)
				}</select>
				<button onClick={() => this.submit()}>Apply</button>
				<button onClick={() => this.props.onCancel()}>Cancel</button>
			</Modal>
		)
	}
	
	submit() {
		const value = {
			firstName: this.refs.firstName.value,
			lastName: this.refs.lastName.value,
			departmentId: this.refs.department.value,
		};
		
		if(
			value.firstName.trim().length === 0 ||
			value.lastName.trim().length === 0
		) return;
		
		const { id } = this.props.employee;
		this.props.onSubmit(Object.assign(value, {id}));
	}
}

export default class EmployeePage extends React.Component {
	constructor() {
		super();
		this.state = {
			employeeList: [],
			departmentList: [],
			err: undefined,
			selectedId: undefined
		}
		this.fetchData = this.fetchData.bind(this);
	}
	
	fetchData() {
		fetchEmployee()
			.then(([departmentList, employeeList]) => this.setState({ employeeList, departmentList, err: undefined }))
			.catch(err => this.setState({ err, employeeList: [], departmentList: [] }));
	}
	
	componentWillMount() {
		this.fetchData();
	}
	
	render() {
		const { employeeList, err, selectedId, departmentList } = this.state;
		
		return (
			<div>
				{(selectedId !== undefined) &&
					<EmployeeCard
						employee={selectedId !== undefined && employeeList.find(x => x.id === selectedId)}
						departmentList={departmentList}
						onSubmit={
							value => updateEmployee(value)
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
				{employeeList.map(e =>
					<div
						className='list-item'
						key={e.id}
						children={`${e.firstName} ${e.lastName}`}
						onClick={() => this.setState({ selectedId: e.id })}
					/>
				)}
			</div>
		)
	}
}