import * as React from 'react'
import { Col, Row, Table, Label, Dropdown, Typography } from '../../../../components'
import { DeleteIcon, DetailsIcon, InfoIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'

interface RowExpandPermissionsProps {
    user: Object
    permissionsFromRoles: Object
    setIsLoading: Function
    navigate: Function
    deleteUserPermission: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const {
            role,
            setIsLoading,
            navigate,
            addToastNotification,
            fetch,
            deleteUserRole,
            openModal,
            registerModal,
            closeModal,
        } = this.props

        return (
            <Table.Tr key={`permissions${role.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Users with Role</h3>
                            </Typography.Container>
                        </Col>
                        {role?.users
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id: _id, name }) => {
                                registerModal(
                                    `user-remove-role-from-user-${_id}-delete`,
                                    <ModalConfirm
                                        onConfirm={() => {
                                            setIsLoading(true)

                                            return deleteUserRole(role, {
                                                id: _id,
                                            }).then(() => {
                                                fetch().then(() => {
                                                    setIsLoading(false)
                                                    addToastNotification({
                                                        title: 'Delete success.',
                                                        text: 'Role has been removed from User.',
                                                        type: 'success',
                                                    })
                                                    closeModal(`user-remove-role-from-user-${_id}-delete`)
                                                })
                                            })
                                        }}
                                        onCancel={() => closeModal(`user-remove-role-from-user-${_id}-delete`)}
                                    >
                                        <p>
                                            Are you sure to delete Role: <b>{role.name}</b> from User: <b>{name}</b>?
                                        </p>
                                    </ModalConfirm>,
                                )

                                return (
                                    <Col xs={4} key={name}>
                                        <Dropdown.Container triggerSize={'lg'}>
                                            <Dropdown.Trigger
                                                size="lg"
                                                component={Label}
                                                componentProps={{ block: true }}
                                            >
                                                {name}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item type={'header'}>
                                                    <InfoIcon /> User ID: {_id}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/permissions?user=${name}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show User Permissions
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?user=${name}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show User Roles
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/media?user=${name}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show User Media
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/users/edit?id=${_id}`)
                                                    }}
                                                >
                                                    <DeleteIcon /> Edit User
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color="danger"
                                                    onClick={() => {
                                                        openModal(`user-remove-role-from-user-${_id}-delete`)
                                                    }}
                                                >
                                                    <DeleteIcon /> Remove Role from User
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    </Col>
                                )
                            })}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions