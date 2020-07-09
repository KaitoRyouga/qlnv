const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    //   render: text => <a>{text}</a>,
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'MaNhanvien',
      key: 'MaNV'
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'TenNhanvien',
        key: 'TenNV'
    },
    {
        title: 'Chi nhánh',
        dataIndex: 'Chinhanh',
        key: 'CN'
    },
    {
        title: 'Chức vụ',
        dataIndex: 'Chucvu',
        key: 'CV'
    },
    {
        title: 'CMND',
        dataIndex: 'CMND',
        key: 'CMND'
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'NS',
        key: 'NS'
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        key: 'Email'
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'SDT',
        key: 'SDT'
    },
    {
        title: 'Trạng thái',
        dataIndex: 'Trangthai',
        key: 'TT'
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'Diachi',
        key: 'DC'
    },
];

export default columns;