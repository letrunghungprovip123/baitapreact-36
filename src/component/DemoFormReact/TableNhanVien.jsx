import React from "react";
import { Space, Table, Tag } from "antd";
import ButtonCustom from "./ButtonCustom";

const TableNhanVien = ({ data, handleDeleteNhanVien,getInforNhanVien,toogleDisable }) => {
  const columns = [
    {
      // Tiêu đề các cột
      title: "MSSV",
      // Giúp xác định thuộc tính sẽ gọi tới để lấy dữ liệu
      dataIndex: "msnv",
      // Định danh cột đang sử dụng
      key: "msnv",
      // quyết định cấu trúc jsx hiển thị trên giao diện, có 3 tham số là text(nội dung của dataIndex lấy về),record(đại diện cho phần tử đang lấy dữ liệu),index(vị trí index của record trong data)
      // render: (text, record, index) => {
      //   return <button className="bg-red-500">{text}</button>;
      // },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      key: "gioiTinh",
      dataIndex: "gioiTinh",
      render: (text, record, index) => {
        return <Tag color={text == "Nam" ? "magenta" : "geekblue"}>{text}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "hanhDong",
      render: (text, record, index) => {
        return (
          <>
            <div className="space-x-3">
              <ButtonCustom
                onClick={() => {
                  handleDeleteNhanVien(record.msnv);
                }}
                content={"Xoá"}
                bgColor="bg-red-500"
              />
              <ButtonCustom onClick={() => {
                toogleDisable(true)
                getInforNhanVien(record.msnv)}} content={"Sửa"} bgColor="bg-purple-500" />
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="mt-10">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableNhanVien;
