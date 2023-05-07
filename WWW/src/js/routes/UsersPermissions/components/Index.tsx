import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { ListManager } from '../../../components/common/List/ListManager'
import Header from './Header'
import { getDefaultFilters } from '../../../helpers/permissions'
import { splitIds } from '../../../helpers/filters'
import List from './List'
import { PermissionsManager, FiltersManager, TitleManager, RouteManager } from '../../../containers'

export class UsersPermissions extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { user = '', roles: rolesFromUri } }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users', 'Permissions'])

                            return (
                                <PermissionsManager getRoles>
                                    {({
                                        deleteRole,
                                        setIsLoading,
                                        deletePermission,
                                        deleteRolePermission,
                                        deleteUserRole,
                                        isLoading,
                                        roles,
                                        deleteUserPermission,
                                    }) => (
                                        <FiltersManager
                                            name={'permissions-list'}
                                            defaultFilters={getDefaultFilters()}
                                            urlFilters={{
                                                user,
                                                roles: splitIds(rolesFromUri),
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
                                                    filtersDataUrl={'/permissions/filtersData'}
                                                    url={'/permissions/list'}
                                                    filters={filters}
                                                    setIsLoading={setIsLoading}
                                                >
                                                    {({
                                                        data,
                                                        links,
                                                        page,
                                                        setPage,
                                                        hasNextPage,
                                                        hasPrevPage,
                                                        totalPages,
                                                        perPage,
                                                        total,
                                                        fetch,
                                                        filtersData,
                                                    }) => {
                                                        return (
                                                            <PageContent>
                                                                <Header />

                                                                <List
                                                                    roles={roles}
                                                                    filters={filters}
                                                                    setFilter={setFilter}
                                                                    resetFilters={resetFilters}
                                                                    defaultFilters={defaultFilters}
                                                                    isLoading={isLoading}
                                                                    setFilters={setFilters}
                                                                    savedFilters={savedFilters}
                                                                    saveFilters={saveFilters}
                                                                    deleteSavedFilter={deleteSavedFilter}
                                                                    restoreSavedFilter={restoreSavedFilter}
                                                                    links={links}
                                                                    page={page}
                                                                    setPage={setPage}
                                                                    hasNextPage={hasNextPage}
                                                                    hasPrevPage={hasPrevPage}
                                                                    totalPages={totalPages}
                                                                    data={data}
                                                                    setIsLoading={setIsLoading}
                                                                    deleteUserRole={deleteUserRole}
                                                                    perPage={perPage}
                                                                    total={total}
                                                                    deleteRolePermission={deleteRolePermission}
                                                                    fetch={fetch}
                                                                    deletePermission={deletePermission}
                                                                    deleteRole={deleteRole}
                                                                    deleteUserPermission={deleteUserPermission}
                                                                    filtersData={filtersData}
                                                                />
                                                            </PageContent>
                                                        )
                                                    }}
                                                </ListManager>
                                            )}
                                        </FiltersManager>
                                    )}
                                </PermissionsManager>
                            )
                        }}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersPermissions
