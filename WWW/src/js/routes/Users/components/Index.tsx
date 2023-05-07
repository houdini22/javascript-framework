import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import { Card, LoadingOverlay, Modal } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { ListManager } from '../../../components/common/List/ListManager'
import { Pagination } from '../../../components/common/List/Pagination'
import UsersTable from './UsersTable'
import UsersFilters from './UsersFilters'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import Header from './Header'
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import { FiltersManager } from '../../../containers/FiltersManager'
import { getDefaultFilters } from '../../../helpers/users'
import { splitIds } from '../../../helpers/filters'
import List from './List'

interface UsersViewState {
    deleteUserId: number | boolean
}

export class UsersView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { roles: rolesFromUri = '', permissions: permissionsFromUri = '' } }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users'])

                            return (
                                <AuthorizationManager>
                                    {({ canByPermission }) => (
                                        <UsersManager getRoles getPermissions>
                                            {({
                                                roles,
                                                permissions,
                                                deleteUserPermission,
                                                deleteUser,
                                                deleteUserRole,
                                                activateUser,
                                                deactivateUser,
                                                isLoading,
                                                deleteAvatar,
                                                setIsLoading,
                                            }) => (
                                                <FiltersManager
                                                    name={'users-list'}
                                                    defaultFilters={getDefaultFilters()}
                                                    urlFilters={{
                                                        roles: splitIds(rolesFromUri),
                                                        permissions: splitIds(permissionsFromUri),
                                                    }}
                                                >
                                                    {({
                                                        defaultFilters,
                                                        filters,
                                                        setFilters,
                                                        setFilter,
                                                        resetFilters,
                                                        saveFilters,
                                                        deleteSavedFilter,
                                                        savedFilters,
                                                        restoreSavedFilter,
                                                    }) => (
                                                        <ListManager
                                                            url={'/users/list'}
                                                            filters={filters}
                                                            setIsLoading={setIsLoading}
                                                        >
                                                            {({
                                                                fetch,
                                                                data,
                                                                total,
                                                                hasPrevPage,
                                                                hasNextPage,
                                                                totalPages,
                                                                page,
                                                                setPage,
                                                                perPage,
                                                                links,
                                                            }) => {
                                                                return (
                                                                    <PageContent>
                                                                        <Header />
                                                                        <List
                                                                            filters={filters}
                                                                            setFilter={setFilter}
                                                                            roles={roles}
                                                                            permissions={permissions}
                                                                            resetFilters={resetFilters}
                                                                            defaultFilters={defaultFilters}
                                                                            isLoading={isLoading}
                                                                            setFilters={setFilters}
                                                                            savedFilters={savedFilters}
                                                                            saveFilters={saveFilters}
                                                                            deleteSavedFilter={deleteSavedFilter}
                                                                            restoreSavedFilter={restoreSavedFilter}
                                                                            data={data}
                                                                            setIsLoading={setIsLoading}
                                                                            deleteUserRole={deleteUserRole}
                                                                            deleteUserPermission={deleteUserPermission}
                                                                            fetch={fetch}
                                                                            activateUser={activateUser}
                                                                            deactivateUser={deactivateUser}
                                                                            page={page}
                                                                            perPage={perPage}
                                                                            total={total}
                                                                            totalPages={totalPages}
                                                                            deleteUser={deleteUser}
                                                                            deleteAvatar={deleteAvatar}
                                                                            links={links}
                                                                            setPage={setPage}
                                                                            hasNextPage={hasNextPage}
                                                                            hasPrevPage={hasPrevPage}
                                                                        />
                                                                    </PageContent>
                                                                )
                                                            }}
                                                        </ListManager>
                                                    )}
                                                </FiltersManager>
                                            )}
                                        </UsersManager>
                                    )}
                                </AuthorizationManager>
                            )
                        }}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
