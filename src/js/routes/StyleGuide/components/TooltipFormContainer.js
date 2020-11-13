import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { TooltipForm as FormComponent } from './TooltipForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const TooltipFormContainer = compose(
    connect((state, props) => {
        const { options } = props
        return {
            initialValues: options,
        }
    }),
    reduxForm({
        onChange,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'TooltipForm',
    }),
)(FormComponent)

TooltipFormContainer.propTypes = {
    options: PropTypes.object.isRequired,
    setOptions: PropTypes.func.isRequired,
}

export { TooltipFormContainer }
export default { TooltipFormContainer }
