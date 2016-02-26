/* @flow */
import { BaseComponent } from 'components/core';
import {
  Paper,
  Divider,
  List,
  ListItem,
  FloatingActionButton,
  RaisedButton,
  Styles
} from 'material-ui';
import Add from 'material-ui/lib/svg-icons/content/add';
import Remove from 'material-ui/lib/svg-icons/content/remove';
import { FormsyText } from 'formsy-material-ui';
import { Form } from 'formsy-react';
import api from 'rest/api';

const {
  Colors
} = Styles;

const trueVar = true;

type Props = {
  params: Object
}
class CreateView extends BaseComponent <Props> {
  constructor (props) {
    super(props);

    this.state = {
      company: {
        owners: []
      },
      canSubmit: false
    };
  }

  componentWillMount = () => {
    if (this.props.params.companyId) {
      var _this = this;
      api.get('companies', this.props.params.companyId)
      .then(function (company) {
        _this.setState({
          company: company
        });
      });
    }
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

  handleAddOwner = (event) => {
    let company = this.state.company;
    company.owners.push('');
    this.setState({
      company: company
    });
  };

  handleRemoveOwner = (params, event) => {
    let company = this.state.company;
    company.owners = _.filter(company.owners, function (value, index) {
      return index !== params.key;
    });

    this.setState({
      company: company
    });
  };

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  };

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  };

  submitForm = (data) => {
    console.info(data);
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
          <Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm} >
            <FormsyText
              name='name'
              value={self.state.company.name}
              validationError='Error name'
              required
              floatingLabelText='Name'
              style={this.styles.general.input} />
            <FormsyText
              name='address'
              value={self.state.company.address}
              required
              floatingLabelText='Address'
              multiLine={trueVar}
              rows={2}
              rowsMax={4}
              style={this.styles.general.input} />
            <FormsyText
              name='city'
              value={self.state.company.city}
              required
              floatingLabelText='City'
              style={this.styles.general.input} />
            <FormsyText
              name='country'
              value={self.state.company.country}
              required
              floatingLabelText='Country'
              style={this.styles.general.input} />
            <FormsyText
              name='email'
              value={self.state.company.email}
              validations='isEmail'
              validationError='Error'
              required
              floatingLabelText='Email'
              style={this.styles.general.input} />
            <FormsyText
              name='phone'
              value={self.state.company.phone}
              validations='isNumeric'
              validationError='Error'
              required
              floatingLabelText='Phone number'
              style={this.styles.general.input} />
            <div>
              <div>
                <div style={this.styles.inline.buttonDiv}>
                  <FloatingActionButton
                    backgroundColor={Colors.green600}
                    mini={trueVar}
                    onClick={this.handleAddOwner}>
                    <Add color={Colors.white}/>
                  </FloatingActionButton>
                </div>
                <div style={this.styles.inline.buttonDiv}>
                  <h4>Owners</h4>
                </div>
              </div>
              <Divider />
              <List>
                {self.state.company.owners.map(function (result, key) {
                  let handleRemoveOwner = self.handleRemoveOwner.bind(this, {key: key});
                  return (
                    <ListItem key={key} disabled>
                      <div style={self.styles.inline.buttonDiv}>
                        <FloatingActionButton
                          backgroundColor={Colors.red600}
                          mini={trueVar}
                          onClick={handleRemoveOwner}>
                          <Remove color={Colors.white}/>
                        </FloatingActionButton>
                      </div>
                      <div style={self.styles.inline.inputDiv}>
                        <FormsyText
                          name={`owner[${key}]`}
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
            <div style={{textAlign: 'right'}}>
              <RaisedButton
                type='submit'
                label='Save'
                secondary={trueVar}
                disabled={!this.state.canSubmit} />
            </div>
          </Form>
        </div>
      </Paper>
    );
  }
}

CreateView.propTypes = {
  params: React.PropTypes.object
};

export default CreateView;
