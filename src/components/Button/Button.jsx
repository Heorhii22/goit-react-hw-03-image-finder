import PropTypes from 'prop-types';
import css from 'components/Styles.module.css';

function Button({ handleClickBtn }) {
  return (
    <button className={css.Button} type="button" onClick={handleClickBtn}>
      Load more
    </button>
  );
}
Button.propTypes = {
  handleClickBtn: PropTypes.func.isRequired,
};
export default Button;
