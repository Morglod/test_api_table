export default class Modal extends React.Component {
	render() {
		const { open, children } = this.props;
		if(!open) return <div />
		
		return (
			<div className='paranja'>
				<div className='modal panel'>{children}</div>
			</div>
		)
	}
}