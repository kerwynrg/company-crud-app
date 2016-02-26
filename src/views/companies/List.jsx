/* @flow */
import { BaseComponent } from 'components/core';
import api from 'rest/api';

class ListView extends BaseComponent {
  constructor (props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentWillMount = () => {
    var _this = this;
    api.getAll('companies')
    .then(function (companies) {
      console.info(companies);
      _this.setState({
        companies: companies
      });
    });
  }

  render () {
    return (
      <div className='container text-center'>
        <h2>List for all companies</h2>
        <ul>
          {this.state.companies.map(function (company, key) {
            return (<li key={key}>{`${company.name} - ${company._links.company.href}`}</li>);
          })}
        </ul>
      </div>
    );
  }
}

export default ListView;
