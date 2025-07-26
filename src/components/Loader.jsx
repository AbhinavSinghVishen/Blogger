import React from 'react'
import Container from './container/Container'

const Loader = ({status}) => {
    return (
        <div>
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full h-[65vh] flex justify-center items-center border rounded-2xl">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {status}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Loader
