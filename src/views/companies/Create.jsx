/* @flow */
import { BaseComponent } from 'components/core';
import { FormsyText } from 'formsy-material-ui';
import { Form } from 'formsy-react';

class CreateView extends BaseComponent {
  render () {
    return (
      <div className='container text-center'>
        <h1>New company</h1>
        <Form>
          <FormsyText
            name='name'
            validations='isWords'
            validationError='Error name'
            required
            hintText='Indicates name'
            floatingLabelText='Name' />
          <FormsyText
            name='address'
            validations='isWords'
            validationError='Error address'
            required
            hintText='Indicates address'
            floatingLabelText='Address' />
        </Form>
      </div>
    );
  }
}

export default CreateView;
