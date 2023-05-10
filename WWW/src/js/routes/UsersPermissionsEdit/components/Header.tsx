import * as React from 'react'
import { PageHeader } from '../../../components'
import { HomeIcon } from '../../../components/icons'
import { Permission } from '../../../../types.d'

interface HeaderProps {}

export class Header extends React.Component<HeaderProps, null> {
    render() {
        return (
            <PageHeader.Container>
                <PageHeader.Title>Settings</PageHeader.Title>
                <PageHeader.Breadcrumbs>
                    <PageHeader.BreadcrumbsItem href="/">
                        <HomeIcon /> Home
                    </PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/cms/pages">CMS</PageHeader.BreadcrumbsItem>
                    <PageHeader.BreadcrumbsItem href="/cms/settings">Settings</PageHeader.BreadcrumbsItem>
                </PageHeader.Breadcrumbs>
            </PageHeader.Container>
        )
    }
}

export default Header
