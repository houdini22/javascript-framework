import * as React from 'react'
import styles from '../../../../assets/scss/components/_list_manager.scss'
import classNames from 'classnames/bind'
import { Button, FormField } from '../../../components'
import { clearTimeout } from 'timers'

const cx = classNames.bind(styles)

interface FilterProps {
    name?: string
    options?: Array<{ label: string; value: string | number }>
    filters: Object
    setFilter: Function
    fetch: Function
    type: string
    label: string
}

class Filter extends React.Component<FilterProps, null> {
    renderRadio() {
        const { name, options, filters, setFilter, fetch } = this.props

        return (
            <div>
                {options.map(({ label, value }) => {
                    return (
                        <Button
                            key={`${name}${value}`}
                            color={filters[name] === value ? 'warning' : 'secondary'}
                            onClick={() => {
                                setFilter(name, value).then(() => fetch())
                            }}
                        >
                            {label}
                        </Button>
                    )
                })}
            </div>
        )
    }
    renderOrderByColumn() {
        const { options, filters, setFilter, fetch } = this.props

        return (
            <FormField
                type={'select'}
                name={'order_by'}
                options={options}
                inputOnly
                defaultValue={filters['order_by']}
                onChange={({ target: { value } }) => {
                    setFilter('order_by', value).then(() => fetch())
                }}
            />
        )
    }
    renderOrderDirection() {
        const { filters, setFilter, fetch } = this.props
        const options = [
            {
                label: 'Ascending',
                value: 'asc',
            },
            {
                label: 'Descending',
                value: 'desc',
            },
        ]

        return (
            <FormField
                type={'select'}
                name={'order_direction'}
                options={options}
                inputOnly
                defaultValue={filters['order_direction']}
                onChange={({ target: { value } }) => {
                    setFilter('order_direction', value).then(() => fetch())
                }}
            />
        )
    }
    renderFilterLabel() {
        const { type, label } = this.props

        if (type === 'order') {
            return 'Sort by'
        }

        return label
    }
    renderSearch() {
        return (
            <FormField
                type={'text'}
                placeholder={'Search phrase'}
                name={'search'}
                inputOnly
                onBlur={({ target: { value } }) => {
                    const { setFilter, fetch } = this.props
                    setFilter('search', value).then(() => fetch())
                }}
            />
        )
    }
    render() {
        const { type } = this.props
        return (
            <div className={cx('filter')}>
                <span>{this.renderFilterLabel()}:</span>
                {type === 'search' && this.renderSearch()}
                {type === 'radio' && this.renderRadio()}
                {type === 'order' && (
                    <div>
                        {this.renderOrderByColumn()}
                        {this.renderOrderDirection()}
                    </div>
                )}
            </div>
        )
    }
}

export default { Filter }
export { Filter }
