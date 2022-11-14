import React from "react";

function LoadingOne() {
    return (
        <div className="p-2 rounded text-white">
            <div className="rounded-md p-1 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingOne;
