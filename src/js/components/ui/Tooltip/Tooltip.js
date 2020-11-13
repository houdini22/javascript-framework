import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import jQuery from 'jquery'
import styles1 from '../../../../assets/scss/components/_tooltip.scss'
import styles2 from '../../../../assets/scss/_animations.scss'

const cx = classNames.bind({ ...styles1, ...styles2 })

class Tooltip extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: false, left: 0, top: 0 }
    }

    calculateLeft(placement) {
        const element = this.element
        const tooltip = this.tooltip

        if (element && tooltip) {
            const { left } = jQuery(element).offset()
            const elementWidth = jQuery(element).width()
            const tooltipWidth = jQuery(tooltip).width()

            switch (placement) {
                case 'top-start':
                    return left
                case 'top-end':
                    return left + (elementWidth - tooltipWidth) - 20
                case 'bottom-start':
                    return left
                case 'bottom-end':
                    return left + (elementWidth - tooltipWidth) - 20
            }
            return left
        }
        return 0
    }

    calculateTop(placement) {
        const element = this.element
        const tooltip = this.tooltip

        if (element) {
            const { top } = jQuery(element).offset()
            const elementHeight = jQuery(element).height()
            const tooltipHeight = jQuery(tooltip).height()
            const scrollTop = jQuery(window).scrollTop()

            switch (placement) {
                case 'top-start':
                    return top
                case 'top-end':
                    return top
                case 'bottom-start':
                    return top + elementHeight + 10
                case 'bottom-end':
                    return top + elementHeight + 10
            }
        }
        return 0
    }

    calculateDimensions() {
        this.setState({
            left: this.calculateLeft(this.props.placement),
            top: this.calculateTop(this.props.placement),
        })
    }

    showTooltip() {
        this.setState({ show: true }, () => {
            this.calculateDimensions()
        })
    }

    hideTooltip() {
        this.setState({ show: false })
    }

    render() {
        const {
            children,
            color,
            outline,
            size,
            className,
            tooltip,
            placement,
            trigger,
            ...props
        } = this.props
        const { show, left, top } = this.state

        return (
            <div
                className={cx('component-tooltip', {
                    [className]: className,
                    [`component-tooltip--color-${color}`]: color,
                    [`component-tooltip--outline`]: outline,
                    [`component-tooltip--size-${size}`]: size,
                    [`component-tooltip--size-${placement}`]: placement,
                })}
                {...props}
            >
                <div className={cx('component-tooltip')}>
                    <div
                        className={cx('component-tooltip__element')}
                        onMouseEnter={() => {
                            if (trigger === 'hover') {
                                this.showTooltip()
                            }
                        }}
                        onMouseLeave={() => {
                            if (trigger === 'hover') {
                                this.hideTooltip()
                            }
                        }}
                        onClick={() => {
                            if (trigger === 'click') {
                                show ? this.hideTooltip() : this.showTooltip()
                            }
                        }}
                        ref={(el) => {
                            this.element = el
                        }}
                    >
                        {children}
                    </div>
                    {show && (
                        <div
                            className={cx('component-tooltip__tooltip')}
                            style={{
                                left,
                                top,
                            }}
                            ref={(el) => (this.tooltip = el)}
                        >
                            {tooltip}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

Tooltip.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired,
        PropTypes.string.isRequired,
    ]),
    color: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    outline: PropTypes.bool,
    placement: PropTypes.string,
    tooltip: PropTypes.any,
    trigger: PropTypes.string,
}

Tooltip.defaultProps = {
    color: 'default',
    size: 'md',
    placement: 'top',
    trigger: 'hover',
}

export { Tooltip }
export default { Tooltip }
