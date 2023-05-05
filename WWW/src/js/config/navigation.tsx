import * as React from 'react'
import { FaSitemap } from 'react-icons/fa'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    AddIcon,
    CategoryIcon,
    DocumentIcon,
    FileIcon,
    LinkIcon,
    LogsIcon,
    PermissionIcon,
    RoleIcon,
    UserIcon,
} from '../components/icons'

export const navigation = [
    {
        type: 'header',
        caption: 'Content',
    },
    {
        type: 'link',
        caption: 'CMS',
        href: '/cms/pages',
        icon: <FaSitemap />,
        urlActive: [/\/cms\/pages.*/],
        permission: 'cms.list',
        children: [
            {
                type: 'link',
                href: '/cms/pages',
                caption: 'Pages',
                icon: <AiOutlineOrderedList />,
                urlActive: [
                    /^\/cms\/pages/,
                    /\/cms\/pages\/edit_category/,
                    /\/cms\/pages\/edit_document/,
                    /\/cms\/pages\/edit_link/,
                ],
                permission: 'cms.list',
            },
            {
                type: 'link',
                caption: 'Add',
                icon: <AddIcon />,
                urlActive: [/\/cms\/pages\/add_category/, /\/cms\/pages\/add_document/, /\/cms\/pages\/add_link/],
                permission: ['cms.add_link', 'cms.add_category', 'cms.add_document'],
                children: [
                    {
                        type: 'link',
                        href: '/cms/pages/add_category',
                        caption: 'Category',
                        icon: <CategoryIcon />,
                        urlActive: [/\/cms\/pages\/add_category/],
                        permission: 'cms.add_category',
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_document',
                        caption: 'Document',
                        icon: <DocumentIcon />,
                        urlActive: [/\/cms\/pages\/add_document/],
                        permission: 'cms.add_document',
                    },
                    {
                        type: 'link',
                        href: '/cms/pages/add_link',
                        caption: 'Link',
                        icon: <LinkIcon />,
                        urlActive: [/\/cms\/pages\/add_link/],
                        permission: 'cms.add_link',
                    },
                ],
            },
        ],
    },
    {
        type: 'link',
        caption: <span>Media</span>,
        href: '/media',
        icon: <FileIcon />,
        urlActive: [/^\/media$/],
        permission: 'media.list',
    },
    {
        type: 'header',
        caption: 'Accounts',
    },
    {
        type: 'link',
        href: '/users',
        caption: 'Users',
        icon: <UserIcon />,
        urlActive: [/^\/users$/, /^\/users\/add$/, /^\/users\/edit$/],
        permission: 'users.list',
        children: [
            {
                type: 'link',
                href: '/users/add',
                caption: 'Add',
                icon: <AddIcon />,
                urlActive: [/\/users\/add/],
                permission: 'users.add',
            },
            {
                type: 'link',
                href: '/users/logs',
                caption: 'Logs',
                icon: <LogsIcon />,
                urlActive: [/\/users\/logs/],
                permission: 'logs.list',
            },
        ],
    },
    {
        type: 'link',
        href: '/roles',
        caption: 'Roles',
        icon: <RoleIcon />,
        urlActive: [/^\/roles$/, /^\/roles\/add$/, /^\/roles\/edit$/],
        permission: 'roles.list',
        children: [
            {
                type: 'link',
                href: '/roles/add',
                caption: 'Add',
                icon: <AddIcon />,
                urlActive: [/\/roles\/add/],
                permission: 'roles.add',
            },
        ],
    },
    {
        type: 'link',
        href: '/permissions',
        caption: 'Permissions',
        icon: <PermissionIcon />,
        urlActive: [/^\/permissions$/, /^\/permissions\/add$/, /^\/permissions\/edit$/],
        permission: 'permissions.list',
        children: [
            {
                type: 'link',
                href: '/permissions/add',
                caption: 'Add',
                icon: <AddIcon />,
                urlActive: [/\/permissions\/add/],
                permission: 'permissions.add',
            },
        ],
    },
]
