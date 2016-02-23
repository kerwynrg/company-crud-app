/* @flow */

import '../../styles/core.scss';
import { AppBar, LeftNav } from 'material-ui';
import Title from 'react-title-component';
import { BaseComponent, MaterialIcon } from 'components/core';

class CoreLayout extends BaseComponent {
  constructor (props) {
    super(props);

    this.state = {
      leftNavOpen: false,
      title: 'Company CRUD'
    };
  }

  toggleLeftNav = () => {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    });
  };

  handleTouchTapLeftIconButton = () => {
    this.toggleLeftNav();
  };

  render () {
    let {
      children,
      ...other
    } = this.props;

    let {
      leftNavOpen,
      title,
      location
    } = this.state;

    return (
      <div className='page-container'>
        <Title render={title} />
        <div className='view-container'>
          <AppBar
            title={title}
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}/>
          {children}
          <LeftNav
            location={location}
            docked={false}
            open={leftNavOpen}
            onRequestChange={this.toggleLeftNav}
          />
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object
};

export default CoreLayout;
