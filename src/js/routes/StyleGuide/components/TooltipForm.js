import React from 'react'
import { Field } from 'redux-form'
import { Col, FormField, Row, Tabs } from '../../../components/index'

class TooltipForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            options: { withIcon },
            colSize1,
        } = this.props

        return (
            <form>
                <Field
                    name="updateCount"
                    type="hidden"
                    component={FormField}
                    inputOnly
                />
                <Tabs.Container color="default" left solid header="Options">
                    <Tabs.Tab name="presentation">
                        <Tabs.Trigger>Presentation</Tabs.Trigger>
                        <Tabs.Content>
                            <Row>
                                <Col xs={12}>
                                    <Field
                                        name="color"
                                        label="color"
                                        type="select"
                                        options={[
                                            {
                                                label: 'default',
                                                value: 'default',
                                            },
                                            {
                                                label: 'primary',
                                                value: 'primary',
                                            },
                                            {
                                                label: 'secondary',
                                                value: 'secondary',
                                            },
                                            {
                                                label: 'info',
                                                value: 'info',
                                            },
                                            {
                                                label: 'danger',
                                                value: 'danger',
                                            },
                                            {
                                                label: 'warning',
                                                value: 'warning',
                                            },
                                            {
                                                label: 'success',
                                                value: 'success',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="size"
                                        label="size"
                                        type="select"
                                        options={[
                                            {
                                                label: 'sm',
                                                value: 'sm',
                                            },
                                            {
                                                label: 'md',
                                                value: 'md',
                                            },
                                            {
                                                label: 'lg',
                                                value: 'lg',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="outline"
                                        label="outline"
                                        type="checkbox"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="tooltip"
                                        label="tooltip"
                                        type="text"
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="trigger"
                                        label="trigger"
                                        type="select"
                                        options={[
                                            {
                                                label: 'hover',
                                                value: 'hover',
                                            },
                                            {
                                                label: 'click',
                                                value: 'click',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <Field
                                        name="placement"
                                        label="placement"
                                        type="select"
                                        options={[
                                            {
                                                label: 'top-start',
                                                value: 'top-start',
                                            },
                                            {
                                                label: 'top',
                                                value: 'top',
                                            },
                                            {
                                                label: 'top-end',
                                                value: 'top-end',
                                            },
                                            {
                                                label: 'bottom-start',
                                                value: 'bottom-start',
                                            },
                                            {
                                                label: 'bottom',
                                                value: 'bottom',
                                            },
                                            {
                                                label: 'bottom-end',
                                                value: 'bottom-end',
                                            },
                                        ]}
                                        component={FormField}
                                    />
                                </Col>
                            </Row>
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
            </form>
        )
    }
}

TooltipForm.propTypes = {}

export { TooltipForm }
export default { TooltipForm }
