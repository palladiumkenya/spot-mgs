import React, { useEffect, useState } from "react";
import axios from "axios";
import Tile from "./Tile";
import MigrationList from "./MigrationList";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter,
} from "react-router-dom";

const Migration = (props) => {
  const url = `https://${window.location.hostname}:4730/api/v1/stats/migration`;

  const [stats, setStats] = useState({
    isLoading: true,
    mgsInfo: {},
  });
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await axios.get(url);
      let data = response.data;
      setStats({
        isLoading: false,
        mgsInfo: data,
      });
    } catch (error) {
      setStats({
        isLoading: false,
        mgsInfo: {},
      });
      console.error(error);
    }
  };
  return (
    <div className="layout-wrapper">
      <div className="layout-main">
        <div className="layout-content">
          {stats.isLoading && <h2>loading...</h2>}

          <Tile tile={stats.mgsInfo.tile} />
          <MigrationList
            migrated={stats.mgsInfo.migrated}
            isLoading={stats.isLoading}
            tile={stats.mgsInfo.tile}
          />
        </div>
      </div>
    </div>
  );
};
export default Migration;
