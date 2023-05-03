import * as React from 'react'
import { compose } from 'redux'
import { EditForm as FormComponent } from './EditForm'
import { reduxForm, SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

const onSubmit = (values, _, { save, fetch, addToastNotification }) => {
    return save({ ...values }).then(
        () => {
            fetch().then(() => {
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: 'Role has been saved.',
                })
            })
        },
        (response) => {
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: '#',
            })
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const EditFormContainer = compose(
    reduxForm({
        enableReinitialize: true,
        destroyOnUnmount: false,
        form: 'EditUserRoleForm',
        onSubmit,
    }),
)(FormComponent)

export { EditFormContainer }
export default { EditFormContainer }
