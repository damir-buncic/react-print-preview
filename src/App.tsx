import { useEffect, useState } from "react";
import style from "./App.module.scss";
import { Paper, Table } from "./components";
import { Text } from "./components/Text";
import { fetchData } from "./api";

const columns = ["First Name", "Last Name", "E-mail", "Phone", "Username"];

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className={style.container}>
      <Paper>
        <Text />
        <Table columns={columns} data={data} />
        <Text />
      </Paper>
    </div>
  );
}

export default App;
