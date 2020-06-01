import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import TimeAgo from "react-timeago/lib";
import Moment from "react-moment";

const MigrationList = ({ migrated, isLoading, tile }) => {
  const dateTemplate = (rowData, column) => {
    const dt = rowData["SnapshotDate"];
    return (
      <span>
        <Moment format="DD MMM YYYY ">{dt}</Moment>
      </span>
    );
  };

  const elapsedTemplate = (rowData, column) => {
    const dt = rowData["SnapshotDate"];
    return (
      <span>
        <TimeAgo date={dt}></TimeAgo>
      </span>
    );
  };

  const manageTemplate = (rowData, column) => {
    return (
      <div>
        <Button
          disabled={true}
          hidden={true}
          icon="pi pi-external-link"
          onClick={() => console.log(rowData)}
        ></Button>
      </div>
    );
  };

  const header = (
    <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
      Migrated Health Facilities
    </div>
  );

  return (
    <div>
      <DataTable
        value={migrated}
        loading={isLoading}
        paginator={true}
        header={header}
        rows={50}
        rowsPerPageOptions={[50, 100, 200, 500]}
        totalRecords={tile?.totalOverall}
      >
        <Column
          field="SnapshotSiteCode"
          header="Code"
          sortable={true}
          filter={true}
        />
        <Column
          field="Name"
          header="Name"
          sortable={true}
          filter={true}
          filterMatchMode={"contains"}
        />
        <Column
          field="County"
          header="County"
          sortable={true}
          filter={true}
          filterMatchMode={"contains"}
        />
        <Column
          field="SnapshotDate"
          header="Date Migrated"
          sortable={true}
          body={dateTemplate}
        />
        <Column field="SnapshotDate" header="" body={elapsedTemplate} />
        {/* <Column
        body={manageTemplate}
        style={{ textAlign: "center", width: "5em" }}
      />*/}
      </DataTable>
    </div>
  );
};
export default MigrationList;
