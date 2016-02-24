/* @flow */

import Color from 'material-ui/lib/styles/colors';
import { IconButton } from 'material-ui';

const SIZE = {
  SMALL: '18px',
  MEDIUM: '24px',
  LARGE: '36px',
  EXTRA_LARGE: '48px'
};
const BACKGROUND = {
  DARK: Color.white,
  LIGHT: Color.black
};

type Props = {
  background: BACKGROUND,
  color: string,
  icon: string,
  inactive: boolean,
  size: SIZE,
  iconStyle: Object,
  children: string
};

// TODO: Extends from BaseComponent
class MaterialIcon extends React.Component <Props> {
  static SIZE = SIZE;
  static BACKGROUND = BACKGROUND;
  static propTypes = {
    background: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.string,
    inactive: React.PropTypes.bool,
    size: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    children: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    background: BACKGROUND.LIGHT,
    inactive: false,
    size: SIZE.MEDIUM,
    iconStyle: {}
  };

  render () {
    let {
      background,
      color,
      icon,
      inactive,
      size,
      iconStyle,
      children,
      ...other
    } = this.props;

    if (color) {
      color = (Color[color]) ? Color[color] : color;
    } else if (background) {
      color = background;
    }

    if (inactive) {
      color = 'rgba(255, 255, 255, 0.3)';
      if (background === BACKGROUND.LIGHT) {
        color = 'rgba(0, 0, 0, 0.26)';
      }
    }
    iconStyle.color = color;

    if (size) {
      iconStyle.fontSize = size;
    }

    return (
      <IconButton
        size={size}
        disabled={inactive}
        {...other}
      >
        {children}
      </IconButton>
    );
  }
}

export default MaterialIcon;
