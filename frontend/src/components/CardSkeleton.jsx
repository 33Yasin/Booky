import React from 'react'

const CardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-xl p-4 rounded-xl w-full">
            <div className="skeleton w-full h-60 rounded-lg" />
            <div className="mt-4 space-y-2">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-11/12" />
                <div className="skeleton h-4 w-10/12" />
                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="skeleton h-4 w-28" />
                    <div className="skeleton h-9 w-24 rounded-btn" />
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton