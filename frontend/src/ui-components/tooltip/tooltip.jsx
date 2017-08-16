/* eslint-disable react/no-did-mount-set-state */
import React, {
  Component,
  PropTypes
} from 'react';
import classNames           from 'classnames';
import styles               from './style.less';


/**
 * Комопнент небольших тултипов
 *
 * подмисываемся на события
 *   document.addEventListener('click', this.clickOut);
 *   document.addEventListener('keyup', this.escKeyHandler);
 * закрываем попап по ESC и по клику в не зоне попапа
 *
 * @TODO не работает клик в не области попапа когда оборачиваем
 *  <label> <checkbox /> </label>
 *
 */

const ENUM_FORM_TAG = {
  LABEL: 'LABEL',
  INPUT: 'INPUT',
};

export default class TooltipContent extends Component {

  static propTypes = {
    onClose            : PropTypes.func.isRequired,
    position           : React.PropTypes.shape({
      top : PropTypes.number,
      left: PropTypes.number
    }),
    // линтер не видит свойсво если его достали не через this.props
    positionType       : PropTypes.oneOf([ // eslint-disable-line react/no-unused-prop-types
      'top',
      'right',
      'bottom',
      'left',
      'right bottom'
    ]),
    children           : PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    style              : PropTypes.object,
    className          : PropTypes.string,
    notCloseElTooltip  : PropTypes.string, // класс элемента по клику на которые не нужно закрывать попап
    closeTooltipElement: PropTypes.string, // противоположный класс notCloseElTooltip, закрываем попап по клику closeTooltipElement
    clearPosition      : PropTypes.bool,
    noAnimation        : PropTypes.bool // не анимировать смену позиции попапа
  }

  /**
   *
   * @type {{
   *    @todo left - right - bottom - top
   *    positionType: string,
   *
   *    @todo не закрываем tooltip по элементам с данным классом
   *    notCloseElTooltip: null,
   *
   *    position: {top: number, left: number}}
   *  }
   */
  static defaultProps = {
    positionType: 'bottom',
    position    : {
      top : 0,
      left: 0
    }
  }

  state = {
    show: true,

    // @todo сохраняем props для сравнения в componentDidUpdate
    prevPropsPosition: {
      top : 0,
      left: 0
    },
    position         : {
      top : 0,
      left: 0
    }
  }


  componentDidMount() {
    document.addEventListener('click', this.clickOut);
    document.addEventListener('touchstart', this.clickOut);
    document.addEventListener('keyup', this.escKeyHandler);

    this.setState({
      prevPropsPosition: this.props.position,
      position         : this._preparePosition(this.props)
    });
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ prevPropsPosition: nextProps.position });
  }

  /**
   * после обновления компонента,
   * пересчитываем его размеры и позицию
   * @param nextProps
   */
  componentDidUpdate(nextProps) {
    const { prevPropsPosition: { top, left } } = this.state;
    const isTop = nextProps.position.top !== top;
    const isLeft = nextProps.position.left !== left;
    if (this.TOOLTIP && (isTop || isLeft)) {
      /* this.setState({
       prevPropsPosition: nextProps.position,
       position: this._preparePosition(nextProps)
       }); */
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOut);
    document.removeEventListener('touchstart', this.clickOut);
    document.removeEventListener('keyup', this.escKeyHandler);
  }


  /**
   *
   * @param evt
   */
  escKeyHandler = (evt) => {
    if (evt.which === 27) {
      this.clickOut(evt);
    }
  }

  /**
   *
   * @param evt
   */
  clickOut = (evt) => {
    this._stopPropogation(evt);
    const target = evt.target;
    const tagName = target.tagName ? target.tagName.toUpperCase() : '';
    const { notCloseElTooltip, closeTooltipElement } = this.props;
    const is = notCloseElTooltip && (target.className && target.className === notCloseElTooltip);
    const shouldClose = target.className && (target.className === closeTooltipElement);
    const isFormEl = ENUM_FORM_TAG[tagName];

    if ((!target.closest(`.${styles.Tooltip}`) && (!is && !isFormEl)) || shouldClose) {
      this.props.onClose(evt);
    }
  }

  /**
   *
   * @returns {{left: *, top: *}}
   * @private
   */
  _preparePosition(props) {
    const { position, positionType } = props;
    const size = {
      width : this.TOOLTIP.offsetWidth,
      height: this.TOOLTIP.offsetHeight
    };
    const { width, height } = size;
    const windowW = window.innerWidth;
    let left = position.left;
    let top = position.top;

    if (positionType === 'right') {
      left += 20;
      top -= (height / 2);
    }

    if (positionType === 'bottom') {
      left -= (width / 2);
      top += 20;
    }

    if (positionType === 'right bottom') {
      left -= width;
      top += 20;
    }

    if (positionType === 'left') {
      left -= (width + 20);
      top -= (height / 2);
    }

    if (positionType === 'top') {
      top -= (width + 20);
    }

    if (left + width > windowW) {
      if (position.left - (width + 20) < 0) {
        left = 10;
      } else {
        left = position.left - (width + 20);
      }
    }

    return {
      left: `${left}px`,
      top : `${top}px`
    };
  }

  _stopPropogation = (evt) => {
    evt.stopPropagation();
  }

  /**
   * оптимизировать,
   * рендер вызывается три раза
   * @returns {XML}
   */
  render() {
    const { className, style, noAnimation, clearPosition, children } = this.props;
    const { show, position: { left, top } } = this.state;

    const classSelectors = classNames('b-tootip-component', styles.Tooltip, {
      [styles.TooltipNoAnimation]: !!noAnimation,
      [className]                : !!className
    });

    let styleTootip = {
      ...style,
      display: show ? 'block' : 'none'
    };

    if (!clearPosition) {
      styleTootip = {
        ...styleTootip,
        left,
        top
      };
    }

    return (
      <div className={classSelectors} style={styleTootip} ref={(el) => { this.TOOLTIP = el; }}>
        {children}
      </div>
    );
  }
}

/**
 * Режим вставки компонента внутри дерева элементов
 *  В отличии от <Tooltip /> который вставляется в body
 * @param props
 */
export const TooltipStatic = props => (
  <TooltipContent {...props} />
);
