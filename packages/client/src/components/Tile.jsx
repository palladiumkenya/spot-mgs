import React from 'react';

const Tile = ({ tile }) => {
    return (
        <div>
            <div className="p-grid dashboard">
                <div className="p-col-12 p-md-6 p-lg-3">
                    <div className="p-grid card colorbox colorbox-2">
                        <div className="p-col-4">
                            <i className="material-icons">description</i>
                        </div>
                        <div className="p-col-8">
                            <span className="colorbox-name">Targeted</span>
                            <span className="colorbox-count">
                                {tile?.totalOverall}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <div className="p-grid card colorbox colorbox-1">
                        <div className="p-col-4">
                            <i className="material-icons">check_circle</i>
                        </div>
                        <div className="p-col-8">
                            <span className="colorbox-name">Completed</span>
                            <span className="colorbox-count">
                                {tile?.totalMigrated}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <div className="p-grid card colorbox colorbox-3">
                        <div className="p-col-4">
                            <i className="material-icons">hourglass_empty</i>
                        </div>
                        <div className="p-col-8">
                            <span className="colorbox-name">Pending</span>
                            <span className="colorbox-count">
                                {tile?.totalNonMigrated}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-3">
                    <div className="p-grid card colorbox colorbox-4">
                        <div className="p-col-4">
                            <i className="material-icons">assessment</i>
                        </div>
                        <div className="p-col-8">
                            <span className="colorbox-name">Progress</span>
                            <span className="colorbox-count">
                                {tile?.migrationProgress} %
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tile;
