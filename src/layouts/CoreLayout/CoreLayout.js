/* @flow */

import '../../styles/core.scss';
import {
  AppBar,
  Styles,
  Paper
} from 'material-ui';
import Title from 'react-title-component';
import {
  BaseComponent,
  AppLeftNav
} from 'components/core';

class CoreLayout extends BaseComponent {
  constructor (props) {
    super(props);

    this.state = {
      leftNavOpen: true,
      title: 'Company CRUD',
      showMenuIconButton: false,
      muiTheme: Styles.getMuiTheme(Styles.LightRawTheme)
    };
  }

  getChildContext = () => {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentWillMount = () => {
    this.setState({
      muiTheme: this.state.muiTheme
    });
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  }

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme
    });
  }

  toggleLeftNav = (open) => {
    // open = open !== undefined ? open : !this.state.leftNavOpen;
    // this.setState({
    //   leftNavOpen: open
    // });
  };

  handleTouchTapLeftIconButton = () => {
    this.toggleLeftNav();
  };

  handleRequestChangeList = (event, value) => {
    this.context.router.push(value);
    this.toggleLeftNav(false);
  }

  get contentStyles () {
    return {
      marginLeft: this.state.muiTheme.leftNav.width,
      marginTop: this.state.muiTheme.appBar.height + 20 + 15,
      marginBottom: 15,
      marginRight: 15,
      paddingLeft: 35
    };
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
            showMenuIconButton={this.state.showMenuIconButton}
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            style={{
              position: 'fixed',
              top: 0
            }} />
          <AppLeftNav
            location={location}
            open={leftNavOpen}
            onRequestChangeNav={this.toggleLeftNav}
            onRequestChangeList={this.handleRequestChangeList} />
          <div
            style={this.contentStyles}>
            <Paper style={{
              margin: '15px 15px 15px 0px',
              padding: 15
            }} >
              {children}
            </Paper>
          </div>
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

CoreLayout.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default CoreLayout;
