import routes from './routes';
import { Router, hashHistory } from 'react-router';
import './styles.css';

if (module.hot) {
    module.hot.accept();
}

class Root extends React.Component {
    render() {
        const { history } = this.props;
        return <Router history={history} routes={routes} />
    }
}

ReactDOM.render(<Root history={hashHistory} />, document.getElementById('content'));