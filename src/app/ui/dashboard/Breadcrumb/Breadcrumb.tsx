'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb as BSBreadcrumb, BreadcrumbItem } from 'react-bootstrap'

export default function Breadcrumb() {
  const pathname = usePathname()
  // Split the path into segments
  const pathSegments = pathname.split('/').filter((segment) => segment !== '')
  return (
    <BSBreadcrumb listProps={{ className: 'mb-0 align-items-center' }}>
      <BreadcrumbItem linkProps={{ className: 'text-decoration-none' }} href="/">
        Home
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`

        return (
          <BreadcrumbItem key={href} linkProps={{ className: 'text-decoration-none' }} href={href}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
            {' '}
          </BreadcrumbItem>
        )
      })}
    </BSBreadcrumb>
  )
}
