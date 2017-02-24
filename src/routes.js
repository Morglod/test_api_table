import { Route, IndexRoute } from 'react-router'

import App from './app'
import DepartmentPage from './pages/department'
import EmployeePage from './pages/employee'

export default
	<Route path="/" component={App}>
		<IndexRoute component={DepartmentPage} />
		<Route path="/department" component={DepartmentPage} />
		<Route path="/employee" component={EmployeePage} />
	</Route>