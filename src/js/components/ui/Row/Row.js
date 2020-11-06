import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from '../../../../assets/scss/components/_row.scss'

const cx = classNames.bind(styles)

class Row extends React.Component {
    render() {
        const { children, builder, ...props } = this.props

        return (
            <div
                {...props}
                className={cx('component-row', {
                    [cx('builder')]: builder,
                    [cx('component-row--no-padding')]: props['noPadding'],
                })}
            >
                {children}
            </div>
        )
    }
}

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
    ]),
    noPadding: PropTypes.bool,
}

export { Row }
export default { Row }
