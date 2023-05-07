import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import Manager from './Manager'
import { RouteManager } from '../../../containers/RouteManager'
import { Header } from './Header'
import { AddCategoryFormContainer } from '../containers/AddCategoryFormContainer'
import { formattedCurrentDate, formattedDateTime } from '../../../helpers/date-time'
import { generateUrl } from '../../../helpers/cms'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

export class AddCategoryView extends React.Component {
    render() {
        return (
            <RouteManager>
                {({ navigate, query: { parent_id } }) => (
                    <AuthorizationManager>
                        {({ canByPermission }) => (
                            <PageContent>
                                <Manager id={parent_id}>
                                    {({ currentNode, isLoading, setIsLoading, currentNodeParents, addCategory }) => {
                                        return (
                                            <>
                                                <Header
                                                    currentNodeParents={currentNodeParents}
                                                    currentNode={currentNode}
                                                    title={'CMS - Add Category'}
                                                    actionTitle={'Add Category'}
                                                    action={'add'}
                                                    canByPermission={canByPermission}
                                                />
                                                <AddCategoryFormContainer
                                                    currentNode={currentNode}
                                                    initialValues={{
                                                        tree: {
                                                            tree_published_from: formattedDateTime({
                                                                year: 2000,
                                                                month: 1,
                                                                day: 1,
                                                                hour: 0,
                                                                minute: 0,
                                                                second: 0,
                                                            }),
                                                            tree_published_to: formattedDateTime({
                                                                year: 2099,
                                                                month: 1,
                                                                day: 1,
                                                                hour: 0,
                                                                minute: 0,
                                                                second: 0,
                                                            }),
                                                            tree_is_published: true,
                                                        },
                                                        category: {
                                                            menu_category_id: 'new',
                                                            category_url: generateUrl(currentNode?.category?.category_url),
                                                        },
                                                        parent_id: currentNode.id,
                                                    }}
                                                    save={addCategory}
                                                    setIsLoading={setIsLoading}
                                                    isLoading={isLoading}
                                                />
                                            </>
                                        )
                                    }}
                                </Manager>
                            </PageContent>
                        )}
                    </AuthorizationManager>
                )}
            </RouteManager>
        )
    }
}

export default AddCategoryView
