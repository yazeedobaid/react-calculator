import React from 'react';


function History(props) {

    const historyFrames = props.history.map((historyFrame, index) => {
        return (
            <React.Fragment key={index}>
                <p className={'text-gray-400'}>{historyFrame.expr}</p>
                <h2 className={'pb-4 text-gray-700 md:text-2xl font-bold sm:text-base'}>
                    {historyFrame.result}
                </h2>
            </React.Fragment>
        );
    });

    return (
        <div className={'w-full h-full px-4 py-2 flex flex-col bg-gray-200 text-right overflow-y-scroll'}>
            {historyFrames}
        </div>
    );
}

export default History;