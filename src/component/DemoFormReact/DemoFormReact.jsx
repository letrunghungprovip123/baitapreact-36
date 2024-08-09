import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import InputCustom from "./InputCustom";
import { DatePicker, Input } from "antd";
import ButtonCustom from "./ButtonCustom";
import TableNhanVien from "./TableNhanVien";
import * as yup from "yup";
import {
  getIndex,
  getLocalStorage,
  setLocalStorage,
  removeVietnameseTones,
} from "./util";
import { useDispatch, useSelector } from "react-redux";
import { chonArrNhanVien } from "../../store/Slice/arrNhanVienSlice";
import { AudioOutlined } from "@ant-design/icons";
const DemoFormReact = () => {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  // const [value, setValue] = useState({
  //   hoTen: "",
  //   email: "",
  // });
  // console.log(value);
  // const handleChange = (event) => {
  //   const id = event.target.id;
  //   setValue({ ...value, [id]: event.target.value });
  // };

  // msnv,họ tên, email, mật khẩu, ngày tháng năm sinh, giới tính, số điện thoại
  // Form nhập dữ liệu người dùng (thuần), Table quản lí nhân viên (antd)
  const { NhanVien } = useSelector((state) => state.arrNhanVienSlice);
  const [arrNhanVien, setArrNhanVien] = useState(getLocalStorage("NhanVien"));
  const dispatch = useDispatch();
  const [arrFillter,setArrFilter] = useState(arrNhanVien);
  const [isDisabled,setIsDisabled] = useState(false);
  console.log(isDisabled)
  dispatch(chonArrNhanVien(arrNhanVien));
  useEffect(() => {
    setLocalStorage("NhanVien", arrNhanVien)
    setArrFilter(arrNhanVien);
  }, [arrNhanVien]);

  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    handleBlur,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    // initialValues là dữ liệu mặc định của formik được cung cấp từ người dùng
    initialValues: {
      msnv: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      matKhau: "",
      gioiTinh: "",
      ngaySinh: "",
    },
    // onSubmit được thực thi khi form bắt đầu chạy sự kiện submit, tham số values đại diện cho dữ liệu của tất cả field trong form
    onSubmit: (values) => {
      setArrNhanVien([...arrNhanVien, values]);
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập đúng định dạng email"),
      msnv: yup.string().required("Vui lòng không bỏ trống"),
      //   .min(4, "Vui lòng nhập tối thiểu 4 ký tự")
      //   .max(8, "Vui lòng nhập tối đa 8 ký tự"),
      // soDienThoai: yup
      //   .string()
      //   .matches(
      //     /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
      //     "Vui lòng nhập đúng sdt việt nam"
      //   ),
      matKhau: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
          "Vui lòng tạo mật khẩu có ít nhất 1 ký tự đặc biệt, 1 chữ cái viết hoa và 1 số"
        ),
      hoTen: yup
        .string()
        .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Vui lòng nhập chữ không có số"),
      gioiTinh: yup.string().required("Vui lòng chọn giới tính"),
      ngaySinh: yup.string().required("Vui lòng chọn ngày sinh"),

      // msnv : gồm từ 4 đến 8 ký tự, không bỏ trống
      // số điện thoại : nhập đúng số điện thoại việt nam (regex)
      // matKhau : bao gồm ít nhất 1 ký tự đặc biệt, ít nhất 1 chữ cái viết hoa và có ít nhất 1 số
      // giới tính : bắt buộc chọn
      // họ tên : phải là chữ
    }),
  });
  const toogleDisable = (is) => { 
    is ? setIsDisabled(true) : setIsDisabled(false)
  }
  const deleteNhanVien = (msnv) => {
    const newArrNhanVien = [...arrNhanVien];
    const index = getIndex(newArrNhanVien, msnv);
    if (index != -1) {
      newArrNhanVien.splice(index, 1);
      setArrNhanVien(newArrNhanVien);
    } else {
      valueContext.handleNotification(
        "error",
        "Có lỗi xảy ra người dùng không có trong hệ thống"
      );
    }
  };

  const getInforNhanVien = (record) => {
    let index = getIndex(NhanVien, record);
    Object.entries(NhanVien[index]).map(([key, value]) => {
      setFieldValue(key, value);
    });
    return index;
  };
  const updateNhanVien = (values) => {
    let index = getInforNhanVien(values.msnv);
    let updateArrNhanVien = [...arrNhanVien];
    updateArrNhanVien.splice(index, 1, values);
    setArrNhanVien(updateArrNhanVien);
  };
  const searchNhanVien = (value) => {
    let originWord = removeVietnameseTones(value).toLowerCase().trim();
    let arrFillter = NhanVien.filter((item, index) => {
      let newNhanVien = Object.assign({}, item);
      let originWord2 = removeVietnameseTones(newNhanVien.hoTen)
        .toLowerCase()
        .trim();
      return originWord2.includes(originWord);
    });
    // console.log(arrFillter)
    return arrFillter
  };
  return (
    <div>
      <div className="text-center mb-10">
      <h2 className="text-4xl font-bold">Bài Tập Form Sinh Viên</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputCustom
            labelContent={"MSSV"}
            placeholder={"Vui lòng nhập msnv"}
            name={"msnv"}
            value={values.msnv}
            onChange={handleChange}
            id={"msnv"}
            onBlur={handleBlur}
            error={errors.msnv}
            touched={touched.msnv}
            disabled={isDisabled ? true : false}
          />
          <InputCustom
            labelContent={"Họ tên"}
            placeholder={"Vui lòng nhập họ tên"}
            name={"hoTen"}
            value={values.hoTen}
            onChange={handleChange}
            id={"hoTen"}
            onBlur={handleBlur}
            error={errors.hoTen}
            touched={touched.hoTen}
          />
          <InputCustom
            labelContent={"Email"}
            placeholder={"Vui lòng nhập email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            id={"email"}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <InputCustom
            labelContent={"Số điện thoại"}
            placeholder={"Vui lòng nhập số điện thoại"}
            name={"soDienThoai"}
            value={values.soDienThoai}
            onChange={handleChange}
            id={"soDienThoai"}
            onBlur={handleBlur}
            error={errors.soDienThoai}
            touched={touched.soDienThoai}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày sinh
            </label>
            <DatePicker
              format={"DD-MM-YY"}
              onChange={(date, dateString) => {
                setFieldValue("ngaySinh", dateString);
              }}
              onBlur={() => handleBlur({ target: { name: "ngaySinh" } })}
            />
            {errors.ngaySinh && touched.ngaySinh ? (
              <p className="text-red-500">{errors.ngaySinh}</p>
            ) : null}
          </div>
          <div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Giới tính
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={values.gioiTinh}
                onChange={handleChange}
                name="gioiTinh"
                onBlur={handleBlur}
              >
                <option value="">Vui lòng chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              {errors.gioiTinh && touched.gioiTinh ? (
                <p className="text-red-500">{errors.gioiTinh}</p>
              ) : null}
            </div>
          </div>
          <InputCustom
            labelContent={"Mật khẩu"}
            id={"matKhau"}
            name={"matKhau"}
            placeholder={"Vui lòng nhập mật khẩu"}
            value={values.matKhau}
            onChange={handleChange}
            classWrapper="col-span-2"
            onBlur={handleBlur}
            error={errors.matKhau}
            touched={touched.matKhau}
            type="password"
          />
          <div className="space-x-5">
            <ButtonCustom content={"Thêm Sinh Viên"} type="submit" disabled={isDisabled ? true : false} />
            <ButtonCustom
              onClick={() => {
                toogleDisable(false)
                resetForm();
              }}
              content={"Reset Form"}
              bgColor="bg-black"
            />
            <ButtonCustom
              onClick={() => {
                toogleDisable(false)
                updateNhanVien(values);
                resetForm();
              }}
              content={"Cập nhật Sinh Viên"}
              bgColor="bg-yellow-500"
              disabled={isDisabled ? false : true}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Search
            className="w-1/2"
            placeholder="Nhập Họ Tên Sinh Viên"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onChange={(event) => {
              setArrFilter(searchNhanVien(event.target.value))
            }}
          />
        </div>
        <TableNhanVien
          getInforNhanVien={getInforNhanVien}
          data={arrFillter}
          handleDeleteNhanVien={deleteNhanVien}
          toogleDisable={toogleDisable}
        />
      </form>
    </div>
  );
};

export default DemoFormReact;
