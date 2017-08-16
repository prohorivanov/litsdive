import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';
import styles from './style.less';

export default class Sticky extends Component {
  
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    topSpacing: PropTypes.number.isRequired,
    className: PropTypes.string,
    classNameFixed: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  
  constructor(props) {
    super(props);
    document.addEventListener('scroll', this._scroll);
  }
  
  state = {
    isFixed: false
  }
  
  componentDidMount() {
    setTimeout(() => {
      this._scroll();
    }, 0);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this._scroll);
  }
  
  _scroll = () => {
    const { topSpacing } = this.props;
    if (this.TOP_FILTERS) {
      let { top } = this.TOP_FILTERS.getBoundingClientRect();
      top -= topSpacing;
      if (top <= 1 && !this.state.isFixed) {
        this.setState({ isFixed: true });
      } else if (top > 1 && this.state.isFixed) {
        this.setState({ isFixed: false });
      }
    }
  }
  
  render() {
    const { topSpacing, className, classNameFixed, children, height } = this.props;
    const { isFixed } = this.state;
    
    const classSelector = classNames({
      [className]: !!className,
      [classNameFixed]: !!classNameFixed && isFixed,
      [styles.TopFilters]: true,
      [styles.TopFiltersFixed]: isFixed
    });
    
    const style = {
      height: isFixed ? `${height || topSpacing}px` : 'auto'
    };
    
    const top = {
      top: isFixed ? `${topSpacing}px` : 'auto'
    };
    
    return (
      <div ref={(el) => { this.TOP_FILTERS = el; }} style={style}>
        <div className={classSelector} style={top}>
          {children}
        </div>
      </div>
    );
  }
}
