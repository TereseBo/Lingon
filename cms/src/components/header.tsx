import { UserButton } from '@clerk/nextjs'
// import { CreateOrganization, OrganizationList } from '@clerk/nextjs'
// import { InviteMember } from './InviteMember'

export function MainHeader() {

    return (
        <nav>
            {/* <CreateOrganization />
            <OrganizationList />
            <InviteMember /> */}

            < UserButton afterSignOutUrl='/' />
        </nav>
    )
}