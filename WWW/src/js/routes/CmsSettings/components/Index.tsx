import * as React from 'react'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { EditPermission } from './Edit/Index'
import { TitleManager, RouteManager, PermissionsManager } from '../../../containers'

export class UserRolesEdit extends React.Component<null, null> {
    render() {
        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Users', 'Permissions', 'Edit'])

                    return (
                        <RouteManager>
                            {({ query: { id } }) => (
                                <PermissionsManager id={id}>
                                    {({ isLoading, setIsLoading, fetchPermission, editPermission, permission }) => {
                                        return (
                                            <PageContent>
                                                <Header permission={permission} />
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <EditPermission
                                                            editPermission={editPermission}
                                                            permission={permission}
                                                            fetchPermission={fetchPermission}
                                                            isLoading={isLoading}
                                                            setIsLoading={setIsLoading}
                                                        />
                                                    </Col>
                                                </Row>
                                            </PageContent>
                                        )
                                    }}
                                </PermissionsManager>
                            )}
                        </RouteManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default UserRolesEdit
