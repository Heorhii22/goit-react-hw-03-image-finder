import { RotatingLines } from 'react-loader-spinner';
import css from 'components/Styles.module.css';

function Spinner() {
  return (
    <div className={css.Loader}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="4"
        animationDuration="1"
        width="196"
        visible={true}
      />
    </div>
  );
}

export default Spinner;
