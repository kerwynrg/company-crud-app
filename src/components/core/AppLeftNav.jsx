/* @flow */
import { LeftNav, List, ListItem, Styles, Divider } from 'material-ui';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

const SelectableList = SelectableContainerEnhance(List);

class AppLeftNav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      docked: true,
      primaryTogglesNestedList: true
    };
  }

  get Styles () {
    return {
      paddingTop: this.context.muiTheme.appBar.height
    };
  };

  render () {
    let {
      open,
      onRequestChangeNav,
      onRequestChangeList,
      ...other
    } = this.props;

    let style = Object.assign({}, this.Styles, {
      zIndex: Styles.ZIndex.appBar - 1
    });

    return (
      <LeftNav
        location={this.props.location}
        open={open}
        docked={this.state.docked}
        onRequestChange={onRequestChangeNav}
        style={style}
        {...other}>
        <SelectableList
          value={3}
          valueLink={{value: location.pathname, requestChange: onRequestChangeList}}>
          <ListItem
            primaryText='Home'
            value='/'/>
          <Divider />
          <ListItem
            primaryText='Companies'
            primaryTogglesNestedList={this.state.primaryTogglesNestedList}
            nestedItems={[
              <ListItem
                key={1}
                primaryText='List'
                value='/companies/list'
              />,
              <ListItem
                key={2}
                primaryText='Create'
                value='/companies/create'
              />
            ]}
          />
        </SelectableList>
      </LeftNav>
    );
  }
}

AppLeftNav.propTypes = {
  location: React.PropTypes.object,
  open: React.PropTypes.bool,
  onRequestChangeNav: React.PropTypes.func,
  onRequestChangeList: React.PropTypes.func
};

AppLeftNav.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default AppLeftNav;
