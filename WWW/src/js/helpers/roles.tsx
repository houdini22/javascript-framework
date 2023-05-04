import { User } from '../../types.d'

export const sortRolesByNameAscending = (roles = []) => {
    return roles.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
}
