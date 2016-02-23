/* @flow */

import '../../styles/core.scss';
import { AppBar } from 'material-ui';
import Title from 'react-title-component';
import { BaseComponent, AppLeftNav } from 'components/core';

class CoreLayout extends BaseComponent {
  constructor (props) {
    super(props);

    this.state = {
      leftNavOpen: false,
      title: 'Company CRUD'
    };
  }

  toggleLeftNav = (open) => {
    open = open !== undefined ? open : !this.state.leftNavOpen;
    this.setState({
      leftNavOpen: open
    });
  };

  handleTouchTapLeftIconButton = () => {
    this.toggleLeftNav();
  };

  handleRequestChangeList = (event, value) => {
    this.context.router.push(value);
    this.toggleLeftNav(false);
  }

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
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            />
          {children}
          <AppLeftNav
            location={location}
            open={leftNavOpen}
            onRequestChangeNav={this.toggleLeftNav}
            onRequestChangeList={this.handleRequestChangeList}
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

CoreLayout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CoreLayout;
