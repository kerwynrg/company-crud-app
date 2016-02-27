/* @flow */
import { BaseComponent } from 'components/core';
import { Link } from 'react-router';
import api from 'rest/api';
import {
  Divider,
  List,
  ListItem
} from 'material-ui';

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
      <div>
        <h2>List for all companies</h2>
        <Divider />
        <List>
          {this.state.companies.map(function (company, key) {
            let splittedUrl = company._links.company.href.split('/');
            let id = splittedUrl[splittedUrl.length - 1];
            return (
              <Link
                key={key}
                to={`/companies/edit/${id}`}
                style={{
                  textDecoration: 'none'
                }}>
                <ListItem>
                  <span>{`${company.name}`}</span>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
    );
  }
}

export default ListView;
