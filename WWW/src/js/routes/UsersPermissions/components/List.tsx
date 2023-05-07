import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { Pagination } from '../../../components/common/List/Pagination'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'
import {
    DeletePermission,
    DeleteRole,
    DeleteRolePermission,
    DeleteSavedFilter,
    DeleteUserPermission,
    DeleteUserRole,
    Filters,
    PaginationLinks,
    Permission,
    ResetFilters,
    RestoreSavedFilter,
    Role,
    SavedFilters,
    SaveFilters,
    SetFilter,
    SetFilters,
    SetIsLoading,
    SetPage,
} from '../../../../types.d'
import PermissionsFilters from './PermissionsFilters'
import PermissionsTable from './PermissionsTable'

interface ListProps {
    filters: Filters
    setFilter: SetFilter
    resetFilters: ResetFilters
    defaultFilters: Filters
    isLoading: boolean
    setFilters: SetFilters
    savedFilters: SavedFilters
    saveFilters: SaveFilters
    deleteSavedFilter: DeleteSavedFilter
    restoreSavedFilter: RestoreSavedFilter
    links: PaginationLinks
    page: number
    setPage: SetPage
    hasNextPage: boolean
    hasPrevPage: boolean
    totalPages: number
    data: Array<Permission>
    setIsLoading: SetIsLoading
    deleteUserRole: DeleteUserRole
    perPage: number
    total: number
    deleteRolePermission: DeleteRolePermission
    fetch: () => Promise<void>
    deletePermission: DeletePermission
    deleteRole: DeleteRole
    roles: Array<Role>
    deleteUserPermission: DeleteUserPermission
    filtersData: Object
}

export class List extends React.Component<ListProps, null> {
    render() {
        const {
            filters,
            setFilter,
            permissions,
            resetFilters,
            defaultFilters,
            isLoading,
            setFilters,
            savedFilters,
            saveFilters,
            deleteSavedFilter,
            restoreSavedFilter,
            links,
            page,
            setPage,
            hasNextPage,
            hasPrevPage,
            totalPages,
            data,
            setIsLoading,
            deleteUserRole,
            perPage,
            total,
            deleteRole,
            fetch,
            deleteRolePermission,
            deletePermission,
            roles,
            deleteUserPermission,
            filtersData,
        } = this.props

        return (
            <AuthorizationManager>
                {({ canByPermission }) => (
                    <>
                        {canByPermission('permissions.list') && (
                            <>
                                <PermissionsFilters
                                    filters={filters}
                                    setFilter={setFilter}
                                    fetch={fetch}
                                    permissions={permissions}
                                    defaultFilters={defaultFilters}
                                    isLoading={isLoading}
                                    resetFilters={resetFilters}
                                    setFilters={setFilters}
                                    setIsLoading={setIsLoading}
                                    savedFilters={savedFilters}
                                    saveFilters={saveFilters}
                                    deleteSavedFilter={deleteSavedFilter}
                                    restoreSavedFilter={restoreSavedFilter}
                                    roles={roles}
                                    filtersData={filtersData}
                                />
                                <Card>
                                    <Pagination
                                        links={links}
                                        page={page}
                                        fetch={fetch}
                                        setPage={setPage}
                                        hasNextPage={hasNextPage}
                                        hasPrevPage={hasPrevPage}
                                        totalPages={totalPages}
                                    />
                                    <PermissionsTable
                                        setIsLoading={setIsLoading}
                                        data={data}
                                        deleteRolePermission={deleteRolePermission}
                                        deleteUserRole={deleteUserRole}
                                        fetch={fetch}
                                        deletePermission={deletePermission}
                                        page={page}
                                        perPage={perPage}
                                        total={total}
                                        totalPages={totalPages}
                                        deleteRole={deleteRole}
                                        deleteUserPermission={deleteUserPermission}
                                        permissions={permissions}
                                    />
                                    <Pagination
                                        links={links}
                                        page={page}
                                        fetch={fetch}
                                        setPage={setPage}
                                        hasNextPage={hasNextPage}
                                        hasPrevPage={hasPrevPage}
                                        totalPages={totalPages}
                                    />
                                    {isLoading && <LoadingOverlay />}
                                </Card>
                            </>
                        )}
                    </>
                )}
            </AuthorizationManager>
        )
    }
}

export default List