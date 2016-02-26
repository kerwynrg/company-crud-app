/* @flow */
import { BaseComponent } from 'components/core';
import { Link } from 'react-router';
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
            let splittedUrl = company._links.company.href.split('/');
            let id = splittedUrl[splittedUrl.length - 1];
            return (
              <li key={key}>
                <Link
                  to={`/companies/edit/${id}`} >
                  {`${company.name} - ${company._links.company.href}`}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListView;
