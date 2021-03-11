import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
const port = process.env.PORT || 3011;

const getUrlData = async () => {
  const res = await axios.get(`http://localhost:${port}/routes/getUrlData`);
  let tableData = [];
  let data = res.data;

  tableData = data.map(({ afterUrl }) => {
    return {
      afterUrl: afterUrl,
    };
  });

  return {
    props: tableData,
  };
};

const Home = ({ props }) => {
  const [data, setId] = useState(props);

  const tableColumns = [
    {
      // title: "ShortURL",
      dataIndex: "afterUrl",
      align: "center",
      heigth: 1,
    },
  ];

  useEffect(() => {
    getUrlData();
    // console.log(beforeUrl);
  }, []);
  return (
    <div>
      <Table
        columns={tableColumns}
        dataSource={data}
        pagination={{
          pageSizeOptions: ["50", "100"],
          showLessItems: false,
          showSizeChanger: true,
          position: ["topCenter"],
          pageSize: 20,
        }}
        scroll={{ y: 550 }}
      />
    </div>
  );
};

Home.getInitialProps = getUrlData;
export default Home;
