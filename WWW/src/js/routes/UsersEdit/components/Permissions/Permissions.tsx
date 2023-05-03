import * as React from 'react'
import { Badge, Card, Dropdown, Label, LoadingOverlay, Tabs } from '../../../../components'
import { DeleteIcon, InfoIcon, DetailsIcon, EditIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { mergeUserPermissions, userPermissionFromRoles } from '../../../../helpers/permissions'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deletePermission: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class Permissions extends React.Component<AddRoleProps, null> {
    render() {
        const {
            setIsLoading,
            fetchOne,
            user,
            isLoading,
            navigate,
            deleteUserPermission,
            fetchPermissions,
            addToastNotification,
            openModal,
            closeModal,
            registerModal,
        } = this.props

        const allPermissions = mergeUserPermissions(user)
        const permissionsFromRoles = userPermissionFromRoles(user)

        user?.permissions?.forEach(({ id: _id, name }) => {
            registerModal(
                `user-delete-permission-from-user-${_id}`,
                <ModalConfirm
                    onConfirm={() => {
                        setIsLoading(true)

                        return deleteUserPermission(
                            {
                                id: _id,
                            },
                            user,
                        ).then(() => {
                            Promise.all([fetchOne(user['id']), fetchPermissions()]).then(() => {
                                setIsLoading(false)
                                addToastNotification({
                                    type: 'success',
                                    title: 'Remove success.',
                                    text: 'Permission has been removed from User.',
                                })
                                closeModal(`user-delete-permission-from-user-${_id}`)
                            })
                        })
                    }}
                    onCancel={() => closeModal(`user-delete-permission-from-user-${_id}`)}
                >
                    <p>
                        Are you sure to delete Role: <b>{name}</b> from User: <b>{user.name}</b>?
                    </p>
                </ModalConfirm>,
            )
        })

        return (
            <Card header={<h1>Permissions</h1>}>
                <Tabs.Container>
                    <Tabs.Tab name={'all'}>
                        <Tabs.Trigger>
                            All Permissions <Badge color={'info'}>{Object.keys(allPermissions).length}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {Object.keys(allPermissions)
                                .map((key) => allPermissions[key])
                                .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                                .map(({ id, name, occurence }) => {
                                    return (
                                        <Label key={id} block size={'lg'}>
                                            {name} {occurence > 1 && `(${occurence})`}
                                        </Label>
                                    )
                                })}
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name={'from_roles'}>
                        <Tabs.Trigger>
                            From Roles <Badge color={'info'}>{Object.keys(permissionsFromRoles).length}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {Object.keys(permissionsFromRoles)
                                .map((key) => permissionsFromRoles[key])
                                .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                                .map(({ id, name, occurence }) => {
                                    return (
                                        <Dropdown.Container triggerSize={'lg'} key={id}>
                                            <Dropdown.Trigger component={Label} componentProps={{ block: true }}>
                                                {name} {occurence > 1 && `(${occurence})`}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item type={'header'}>
                                                    <InfoIcon /> Permission ID {id}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?permissions=${id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Roles with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/users?permissions=${id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Users with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/permissions/edit?id=${id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Edit Permission
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    )
                                })}
                        </Tabs.Content>
                    </Tabs.Tab>
                    <Tabs.Tab name={'direct_permissions'}>
                        <Tabs.Trigger>
                            Direct Permissions <Badge color={'info'}>{user?.permissions?.length || 0}</Badge>
                        </Tabs.Trigger>
                        <Tabs.Content>
                            {user?.permissions
                                ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                                .map(({ id, name, occurence }) => {
                                    return (
                                        <Dropdown.Container triggerSize={'lg'} key={id}>
                                            <Dropdown.Trigger component={Label} componentProps={{ block: true }}>
                                                {name} {occurence > 1 && `(${occurence})`}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item type={'header'}>
                                                    <InfoIcon /> Permission ID {id}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?permissions=${id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Roles with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/users?permissions=${id}`)
                                                    }}
                                                >
                                                    <DetailsIcon /> Show Users with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/permissions/edit?id=${id}`)
                                                    }}
                                                >
                                                    <EditIcon /> Edit Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'danger'}
                                                    onClick={() => {
                                                        openModal(`user-delete-permission-from-user-${id}`)
                                                    }}
                                                >
                                                    <DeleteIcon /> Delete Permission from User
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    )
                                })}
                        </Tabs.Content>
                    </Tabs.Tab>
                </Tabs.Container>
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Permissions
