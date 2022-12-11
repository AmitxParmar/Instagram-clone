import React, { useEffect } from 'react'


const NotFound = () => {
    useEffect(() => {
        document.title = 'Not Found - Instagram';
    }, [])

    return (
        <div className='bg-gray-background'>
            <div className='mx-auth max-w-screen-lg'>
                <p className='text-center text-2xl'>NotFound!</p>
            </div>
        </div>
    )
}


export default NotFound;