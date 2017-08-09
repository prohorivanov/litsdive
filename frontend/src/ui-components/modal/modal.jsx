import React, {
  Component,
  PropTypes
} from 'react'
import classNames from 'classnames'
import Fade from 'ui-components/fade-overlay'
import Icon from 'ui-components/icon'
import './style.css'

/**
 * @todo будем брать из компонентов
 *  по необходимости расширять
 * тесты не написаны
 */
export default class ModalContainer extends Component {
  static propTypes = {
    styleWindow: PropTypes.object,
    styleContent: PropTypes.object,
    classNameWindow: PropTypes.string,
    globalModalId: PropTypes.string,
    classNameContent: PropTypes.string,
    className: PropTypes.string,
    stopClose: PropTypes.bool,
    withOverlay: PropTypes.bool,
    topContent: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    layerStyle: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired
  }
  /**
   * @type {{withOverlay: boolean, onClose: (function()), center: string}}
   */
  static defaultProps = {
    withOverlay: true,
    globalModalId: '',
    onClose: () => {
    },
    center: ''
  }

  static childContextTypes = {
    scrollTop: PropTypes.func
  }

  constructor (props) {
    super(props)
    document.addEventListener('keyup', this.onEscape)
  }

  getChildContext () {
    return {
      scrollTop: this.scrollTop
    }
  }

  componentDidMount () {
    this._clearTimeOut = setTimeout(() => {
      document.querySelector('body').classList.add(
        'no-scroll',
        'show-modal',
        `show-modal-${this.props.globalModalId}`
      )
    }, 300)
  }

  /**
   * добавляем некоторые классы на body
   * no-scroll - выключаем скролл у body
   * show-modal - дополнителный класс если нужно что то глобально поменять
   * show-modal-${this.props.globalModalId} - уникальный класс окна
   */
  componentWillUnmount () {
    if (this._clearTimeOut) {
      clearTimeout(this._clearTimeOut)
    }

    document.querySelector('body').classList.remove(
      'no-scroll',
      'show-modal',
      `show-modal-${this.props.globalModalId}`
    )
    document.removeEventListener('keyup', this.onEscape)
  }

  onStopPropagation = evt => (evt ? evt.stopPropagation() : null)

  /**
   * Закрываем окно если это не клин в само модальное окно
   * @param evt
   */
  onCloseModal = (evt) => {
    if (evt) evt.stopPropagation()
    this.props.onClose && this.props.onClose()
  }

  /**
   * Закрываем модальное окно
   * по клавише esc
   * @param e
   */
  onEscape = (e) => {
    if (e.which === 27) {
      this.onCloseModal()
    }
  }

  /**
   * Дополнительный параметр чтобы отключить клик по оверлею
   * @param evt
   */
  onCloseModalOverlay = (evt) => {
    if (evt) evt.stopPropagation()
    if (!this.props.stopClose) {
      this.props.onClose && this.props.onClose()
    }
  }

  /**
   * метод прокидывается через context
   * например нужно для вызова из дочерних компонентов
   * для того чтобы проскролить содержимое окна наверх
   */
  scrollTop = () => {
    try {
      this.refs.WRAPPER.scrollIntoView(true)
    } catch (e) {
      console.warn('this.refs.WRAPPER.scrollIntoView')
    }
  }

  /**
   * в завимимости от наличия параметра topContent
   *  возвращаем тело модального окна
   * @returns {*}
   */
  contentWindow () {
    const {topContent} = this.props
    return topContent ? this.topContent() : this.centerContent()
  }

  /**
   * центрируем окно по вертикали и горизонтали
   * делаем скролл елсли контент больше window
   * @returns {XML}
   */
  centerContent () {
    const {styleWindow, styleContent, classNameWindow} = this.props
    const {hideCloseButton, classNameContent} = this.props

    const classSelector = classNames({
      'b-ui-modal__window': true,
      [classNameWindow]: true
    })

    const classContent = classNames('b-ui-modal__window-content', {
      [classNameContent]: !!classNameContent
    })

    return (
      <table className='b-ui-modal__wrapper' ref='WRAPPER'>
        <tbody>
          <tr>
            <td className='b-ui-modal__td'>
              <div className={classSelector} style={styleWindow || {}} onClick={this.onStopPropagation}>
                <div className={classContent} onClick={this.onStopPropagation} style={styleContent}>
                  {!hideCloseButton &&
                  <Icon
                    type='close'
                    size='24'
                    className='b-modal-icon-close'
                    onClick={this.onCloseModal}
                  />
                  }
                  {this.props.children}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  /**
   * не центрируем по вертикали окно
   * @returns {XML}
   */
  topContent () {
    const {styleWindow, styleContent, classNameWindow} = this.props
    const {hideCloseButton, topContent, classNameContent} = this.props

    const classSelector = classNames('b-ui-modal__window', {
      'b-ui-modal__window-top': !!topContent,
      [classNameWindow]: !!classNameWindow
    })

    const classContent = classNames(
      'b-ui-modal__window-content',
      'b-ui-modal__window-content-top', {
        [classNameContent]: !!classNameContent
      }
    )

    return (
      <div className={classSelector} ref='WRAPPER' style={styleWindow || {}} onClick={this.onStopPropagation}>
        <div className={classContent} onClick={this.onStopPropagation} style={styleContent}>
          {!hideCloseButton &&
          <Icon
            type='close'
            size='24'
            className='b-modal-icon-close'
            onClick={this.onCloseModal}
          />
          }
          {this.props.children}
        </div>
      </div>
    )
  }

  /**
   * модальное окно может быть как с overlay внутри, так и без него
   * @returns {XML}
   */
  render () {
    const {className, withOverlay, onClick, layerStyle} = this.props

    const classSelector = classNames({
      'b-ui-modal': true,
      [className]: !!className
    })
    return (
      <div className={classSelector} onClick={onClick}>
        {withOverlay ? <Fade onClick={this.onCloseModalOverlay} layerStyle={layerStyle}>
          {this.contentWindow()}
        </Fade>
          : this.contentWindow()
        }
      </div>
    )
  }
}
