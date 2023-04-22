import PropTypes from 'prop-types';
import { Component } from 'react';
import css from 'components/Styles.module.css';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    value: '',
  };

  handleInputChange = e => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast.warning('Enter data in the search field!');
      return;
    }
    this.props.onSubmit(this.state.value.trim().toLowerCase());
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              <div>
                <FiSearch />
              </div>
            </IconContext.Provider>

            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
