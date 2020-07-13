const initState = {
    nhanvien: [
          {
            key: 1,
            index: 1,
            MaNhanvien: 'NV001',
            TenNhanvien: 'Nguyễn Văn A',
            Chinhanh: "Chi nhánh HCM",
            Chucvu: "Nhân viên chính thức",
            Gioitinh: "Nam",
            Email: "NguyenVanA@gmail.com",
            SDT: "0909259713",
            CMND: "241733036",
            Ngaycap: "15/07/2015",
            Noicap: "daklak",
            Diachi: '129 Xuân hồng',
            Phuongxa: "Phường X",
            Khuvuc: "Khu vực X",
            Trangthai: "Nhân viên chính thức",
            Ghichu: "N/A",
            Anhdaidien: "N/A"
          }
    ],
    columns: [
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
    ],
    dataList: [
        {
            content: 'Tìm kiếm'
        },
        {
            content: 'Thêm'
        },
        {
            content: 'Sao chép'
        },
        {
            content: 'Chỉnh sửa'
        },
        {
            content: 'Xóa'
        },
        {
            content: 'Xuất file'
        },
    ],
    nhanvienSearch: [],
    activeSearch: 0
}


const rootReducer = (state = initState, action) => {
    if(action.type === "DELETE_NV"){
        let nhanvienAfterDelete = state.nhanvien.filter(nv => {
            return(
                nv.MaNhanvien !== action.id
            )
        })

        return{
            ...state,
            nhanvien: nhanvienAfterDelete
        }
    }

    if(action.type === "SEARCH_NV"){

        state.nhanvienSearch = state.nhanvien

        var nhanvienAfterSearchTenNhanvien = []


        if(action.id.Nhanvien === null || action.id.Nhanvien === '' || action.id.Nhanvien === undefined){
            nhanvienAfterSearchTenNhanvien = []
        }else{
            nhanvienAfterSearchTenNhanvien = state.nhanvien.filter(nv => {
                return(
                    nv.TenNhanvien === action.id.Nhanvien
                )
            })
            if(nhanvienAfterSearchTenNhanvien.length === 0){
                return{
                    ...state,
                    activeSearch: 1,
                    nhanvienSearch: []
                }
            }
        }

        var nhanvienAfterSearchChinhanh = []

        if(action.id.chinhanh === null || action.id.chinhanh === '' || action.id.chinhanh === undefined){
            nhanvienAfterSearchChinhanh = []
        }else{
            nhanvienAfterSearchChinhanh = state.nhanvien.filter(nv => {
                return(
                    nv.Chinhanh === action.id.chinhanh
                )
            })
            if(nhanvienAfterSearchChinhanh.length === 0){
                return{
                    ...state,
                    activeSearch: 1,
                    nhanvienSearch: []
                }
            }
        }

        var nhanvienAfterSearchChucvu = []

        if(action.id.chucvu === null || action.id.chucvu === '' || action.id.chucvu === undefined){
            nhanvienAfterSearchChucvu = []
        }else{
            nhanvienAfterSearchChucvu = state.nhanvien.filter(nv => {
                return(
                    nv.Chucvu === action.id.chucvu
                )
            })
            if(nhanvienAfterSearchChucvu.length === 0){
                return{
                    ...state,
                    activeSearch: 1,
                    nhanvienSearch: []
                }
            }
        }

        var nhanvienAfterSearchTrangthai = []

        if(action.id.trangthai === null || action.id.trangthai === '' || action.id.trangthai === undefined){
            nhanvienAfterSearchTrangthai = []
        }else{
            nhanvienAfterSearchTrangthai = state.nhanvien.filter(nv => {
                return(
                    nv.Trangthai === action.id.trangthai
                )
            })
            if(nhanvienAfterSearchTrangthai.length === 0){
                return{
                    ...state,
                    activeSearch: 1,
                    nhanvienSearch: []
                }
            }
        }
        

        
        var SearchNV = [].concat(nhanvienAfterSearchTenNhanvien, nhanvienAfterSearchChinhanh, nhanvienAfterSearchChucvu, nhanvienAfterSearchTrangthai)
        
        const unique =  SearchNV.map(e => e['key'])

        .map((e, i, final) => final.indexOf(e) === i && i)

       .filter((e) => SearchNV[e]).map(e => SearchNV[e]);

    //    console.log(unique)
    //    console.log('unique')

        if(SearchNV.length === 0){
            return{
                ...state,
                nhanvienSearch: state.nhanvien
            }
        }else{
            return{
                ...state,
                nhanvienSearch: unique
            }
        }
    }

    if(action.type === "ADD_NV"){
        action.info.key = state.nhanvien.length + 1
        action.info.index = state.nhanvien.length + 1
        let NewNV = [].concat(state.nhanvien, action.info)
        return{
            ...state,
            nhanvien: NewNV
        }
    }

    if(action.type === "EDIT_NV"){
        // action.info.key = state.nhanvien.length + 1
        // action.info.index = state.nhanvien.length + 1
        console.log(action.id)

        let MaNVEdit = state.nhanvien.findIndex(nv => {
            return(
                nv.MaNhanvien === action.id.MaNhanvien
            )
        })

        let MaNVEditkey = state.nhanvien.find(nv => {
            return(
                nv.MaNhanvien === action.id.MaNhanvien
            )
        })


        action.id.key = MaNVEditkey.key
        action.id.index = MaNVEditkey.index

        // console.log(state.nhanvien.length)
        // console.log(MaNVEdit)


        let newNV1 = state.nhanvien.slice(0, MaNVEdit)
        let newNV3 = state.nhanvien.slice(MaNVEdit+1, state.nhanvien.length)


        let newNV12 = [].concat(newNV1, action.id)
        let newNV = [].concat(newNV12, newNV3)
    
        return{
            ...state,
            nhanvien: newNV
        }
    }

    return state
}

export default rootReducer