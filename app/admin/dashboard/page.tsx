import React from 'react'
import { BusinessInfoProvider } from '@/contexts/contact/BusinessInfoContext'
import AdminBusinessForm from '@/components/admin/AdminBusinessForm';
import BusinessHourMap from '@/components/contact-us/BusinessHourMap';

const page = () => {
    return (
        <><AdminBusinessForm /><BusinessHourMap /></>
    )
}

export default page;