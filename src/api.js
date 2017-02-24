const DB_API = 'api';

const DEPARTMENT_API = DB_API + '/department';
const DEPARTMENT_API_ID = id => `${DB_API}/department/${id}`;
const EMPLOYEE_API = DB_API + '/employee';
const EMPLOYEE_API_ID = id => `${DB_API}/employee/${id}`;

export const fetchDepartment = () =>
	jQuery.get(DEPARTMENT_API)

export const updateDepartment = value =>
	jQuery.ajax({
		method: 'put',
		url: DEPARTMENT_API_ID(value.id),
		data: value
	})
	
export const fetchEmployee = () =>
	Promise.all([
		jQuery.get(DEPARTMENT_API),
		jQuery.get(EMPLOYEE_API)
	]).then(([d, e]) => 
		[d, e.map(x => Object.assign(x, { department: d.find(dx => dx.id === x.departmentId) }))]
	)

export const updateEmployee = value =>
	jQuery.ajax({
		method: 'put',
		url: EMPLOYEE_API_ID(value.id),
		data: value
	})