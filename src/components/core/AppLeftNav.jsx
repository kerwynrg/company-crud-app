/* @flow */
import { LeftNav, List, ListItem } from 'material-ui';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

class AppLeftNav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  someBind = () => {
    console.info('some bind');
  }

  render () {
    return (
      <LeftNav
        location={this.props.location}
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.onRequestChangeNav}>
        <SelectableList
          value={3}
          subheader='Menu'
          valueLink={{value: location.pathname, requestChange: this.props.onRequestChangeList}}>
          <ListItem
            primaryText='Companies'
            primaryTogglesNestedList={true}
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

export default AppLeftNav;
