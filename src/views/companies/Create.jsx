/* @flow */
import { BaseComponent } from 'components/core';
import {
  Paper,
  Divider,
  List,
  ListItem,
  FloatingActionButton,
  Styles
} from 'material-ui';
import Add from 'material-ui/lib/svg-icons/content/add';
import Remove from 'material-ui/lib/svg-icons/content/remove';
import { FormsyText } from 'formsy-material-ui';
import { Form } from 'formsy-react';

const {
  Colors
} = Styles;

const multiLine = true;
const miniIcon = true;
class CreateView extends BaseComponent {
  constructor (props) {
    super(props);

    this.state = {
      owners: [
        'Kerwyn',
        'Nohemi'
      ]
    };
  }

  get styles () {
    let styles = {
      general: {
        input: {
          width: '100%'
        }
      },
      inline: {
        input: {
          width: '100%'
        },
        buttonDiv: {
          verticalAlign: 'middle',
          display: 'inline-block',
          paddingRight: 10
        },
        inputDiv: {
          width: '94%'
        }
      }
    };

    Object.assign(styles.inline.inputDiv, styles.inline.buttonDiv, styles.inline.inputDiv);

    return styles;
  };

  render () {
    var self = this;
    return (
      <Paper
        style={{
          margin: '15px 15px 15px 0px',
          padding: 15
        }} >
        <div className='container text-center'>
          <h2>New company</h2>
          <Form>
            <FormsyText
              name='name'
              validations='isDefaultRequiredValue'
              validationError='Error name'
              required
              floatingLabelText='Name'
              style={this.styles.general.input} />
            <FormsyText
              name='address'
              required
              floatingLabelText='Address'
              multiLine={multiLine}
              rows={2}
              rowsMax={4}
              style={this.styles.general.input} />
            <FormsyText
              name='city'
              required
              floatingLabelText='City'
              style={this.styles.general.input} />
            <FormsyText
              name='country'
              required
              floatingLabelText='Country'
              style={this.styles.general.input} />
            <FormsyText
              name='email'
              validations='isEmail'
              validationError='Error'
              required
              floatingLabelText='Email'
              style={this.styles.general.input} />
            <FormsyText
              name='phone'
              validations='isNumeric'
              validationError='Error'
              required
              floatingLabelText='Phone number'
              style={this.styles.general.input} />
            <div>
              <div>
                <div style={this.styles.inline.buttonDiv}>
                  <FloatingActionButton backgroundColor={Colors.green600} mini={miniIcon}>
                    <Add color={Colors.white}/>
                  </FloatingActionButton>
                </div>
                <div style={this.styles.inline.buttonDiv}>
                  <h4>Owners</h4>
                </div>
              </div>
              <Divider />
              <List>
                {this.state.owners.map(function (result) {
                  return (
                    <ListItem key={result} disabled>
                      <div style={self.styles.inline.buttonDiv}>
                        <FloatingActionButton backgroundColor={Colors.red600} mini={miniIcon}>
                          <Remove color={Colors.white}/>
                        </FloatingActionButton>
                      </div>
                      <div style={self.styles.inline.inputDiv}>
                        <FormsyText
                          name='phone[]'
                          validations='isAlphanumeric'
                          validationError='Error'
                          required
                          floatingLabelText='Owner'
                          value={result}
                          style={self.styles.inline.input} />
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Form>
        </div>
      </Paper>
    );
  }
}

export default CreateView;
