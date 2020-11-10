import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/all'
import { FaInfoCircle } from 'react-icons/fa'
import { TiWarning } from 'react-icons/ti'
import { CgDanger } from 'react-icons/cg'
import { AiTwotoneLike } from 'react-icons/all'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { connect } from 'react-redux'
import {
    selectors as notificationsSelectors,
    actions as notificationsActions,
} from '../../../reducers/notifications'
import { bindActionCreators } from 'redux'
import { Badge } from '../../../components'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'

const cx = classNames.bind(styles)

class BaseSidebarHeaderNotifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    getIcon(type) {
        switch (type) {
            case 'default':
                return <IoIosNotificationsOutline />

            case 'primary':
                return <IoIosNotificationsOutline />

            case 'secondary':
                return <IoIosNotificationsOutline />

            case 'info':
                return <FaInfoCircle />

            case 'warning':
                return <TiWarning />

            case 'danger':
                return <CgDanger />

            case 'success':
                return <AiTwotoneLike />
        }
    }

    render() {
        const { expanded } = this.state
        const { notifications, unread, resetUnread } = this.props

        return (
            <span
                className={cx(
                    'layout__header__bar__right__element',
                    'layout__header__bar__right__element--notifications',
                )}
            >
                <IoIosNotificationsOutline
                    onClick={() => {
                        this.setState({ expanded: !expanded }, () => {
                            resetUnread()
                        })
                    }}
                />
                {unread > 0 && (
                    <Badge size={'sm'} color={'warning'} rounded>
                        {unread}
                    </Badge>
                )}
                {expanded && notifications.length > 0 && (
                    <div
                        className={cx(
                            'layout__header__bar__right__element--notifications__expanded',
                        )}
                    >
                        <Scrollbars style={{ height: '400px' }}>
                            <ul>
                                {notifications.map(
                                    ({ type, text, href, title }) => {
                                        return (
                                            <li
                                                className={cx({
                                                    'layout__header__bar__right__element--notifications__expanded__item': true,
                                                    [`layout__header__bar__right__element--notifications__expanded__item--color-${type}`]: true,
                                                })}
                                                key={`${type}-${text}-${href}`}
                                            >
                                                <Link to={href}>
                                                    <span
                                                        className={cx(
                                                            'layout__header__bar__right__element--notifications__expanded__item__icon',
                                                        )}
                                                    >
                                                        {this.getIcon(type)}
                                                    </span>
                                                    <span
                                                        className={cx(
                                                            'layout__header__bar__right__element--notifications__expanded__item__content',
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                'layout__header__bar__right__element--notifications__expanded__item__content__title',
                                                            )}
                                                        >
                                                            {title}
                                                        </span>
                                                        <span
                                                            className={cx(
                                                                'layout__header__bar__right__element--notifications__expanded__item__content__text',
                                                            )}
                                                        >
                                                            {text}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    },
                                )}
                            </ul>
                        </Scrollbars>
                    </div>
                )}
            </span>
        )
    }
}

const SidebarHeaderNotifications = connect(
    (state) => ({
        notifications: notificationsSelectors.getNotifications(state),
        unread: notificationsSelectors.getUnreadNotifications(state),
    }),
    (dispatch) => {
        return bindActionCreators(
            { resetUnread: notificationsActions.resetUnreadNotifications },
            dispatch,
        )
    },
)(BaseSidebarHeaderNotifications)

export { SidebarHeaderNotifications }
export default { SidebarHeaderNotifications }