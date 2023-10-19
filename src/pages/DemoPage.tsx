import { Checkbox, Col, Dropdown, Layout, MenuProps, PaginationProps, Row, Space, Table } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
// import moment from 'moment'
import { useEffect, useState } from 'react'
import Filter from '../components/Filter/Filter'
import HeaderDemo from '../components/HeaderDemo/HeaderDemo'
import Info from '../components/Info/Info'
import '../components/Sider/Sider.scss'
import SiderItem from '../components/SiderItem/SiderItem'
import StateIndication from '../components/StateIndication/StateIndication'
import Treeview from '../components/Treeview/Treeview'
import { IArea } from '../models/reducers/folderNav.model'
import { ICountByState, IInfoPatient, IPatient, IReportsPatient, ISearch } from '../models/reducers/patients.model'
import { fetchTreeviewArea } from '../reducers/slice/folderNavSlice'
import { getCountByState, getListPatient, setListPatient } from '../reducers/slice/listPatientSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { ColumnsType } from 'antd/es/table'
import { setListFilterPatient } from '../reducers/slice/listFilterPatientSlice'
import dayjs from 'dayjs'
import { EditOutlined, PrinterFilled, SettingFilled, UserOutlined } from '@ant-design/icons'
import { setDataGlobal } from '../utils'
import { setCountByState } from '../reducers/slice/countByStateSlice'
import { getHistory } from '../reducers/slice/historySlice'
import { sethistoryPatient } from '../reducers/slice/historyPatientSlice'
import { getReports } from '../reducers/slice/reportsSlice'
import { setReportsPatient } from '../reducers/slice/reportsPatientSlice'
import { getInfoPatient } from '../reducers/slice/infoPatientSlice'

type Props = {}

const DemoPage = ({ }: Props) => {
  const dispatch = useAppDispatch()
  const folderNav: Array<IArea> = useAppSelector((state: RootState) => state.folderNav)
  const listFilterPatient: Array<IPatient> = useAppSelector((state: RootState) => state.listFilterPatient)
  const listPatient: ISearch = useAppSelector((state: RootState) => state.listPatient)
  const countState: Array<ICountByState> = useAppSelector((state: RootState) => state.countByState)
  const historyPatient: Array<IPatient> = useAppSelector((state: RootState) => state.historyPatient)
  const reportsPatient: IReportsPatient = useAppSelector((state: RootState) => state.reportsPatient)
  const infoPatient: IInfoPatient = useAppSelector((state: RootState) => state.infoPatient)

  // const a = async () => {
  //   const list = await dispatch(getListPatient({
  //     ...listPatient,
  //     fromDate: moment().format('YYYY-MM-DD'),
  //     toDate: moment().format('YYYY-MM-DD'),
  //   }))
  //   dispatch(setListPatient({
  //     ...listPatient,
  //     fromDate: moment().format('YYYY-MM-DD'),
  //     toDate: moment().format('YYYY-MM-DD'),
  //   }))
  //   dispatch(setListFilterPatient(list.payload))
  // }

  useEffect(() => {
    console.log(1)
    dispatch(fetchTreeviewArea())

    // a()

    return () => { }
  }, [])

  const [showFilter, setShowFilter] = useState(false)
  const [showTree, setShowTree] = useState(true)
  const [showState, setShowState] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [printActive, setPrintActive] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showInfoPatient, setShowInfoPatient] = useState(false)

  const handleClickFilter = () => {
    setShowFilter(!showFilter)
    if (showTree) setShowTree(!showTree)
  }

  const handleClickModalities = async () => {
    if (!showTree) {
      const newArrayID = []
      for (let k = 0; k < folderNav.length; k++) {
        for (let i = 0; i < folderNav[k].folder.length; i++) {
          for (let j = 0; j < folderNav[k].folder[i].modalitys.length; j++) {
            newArrayID.push(folderNav[k].folder[i].modalitys[j].id)
          }
        }
      }
      setDataGlobal({ arrayID: newArrayID })
      // console.log(getDataGlobal().arrayID)

      const list = await dispatch(getListPatient({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      const countByState = await dispatch(getCountByState({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      dispatch(setListPatient({
        ...listPatient,
        servers: [...newArrayID],
        pageIndex: 1
      }))
      dispatch(setListFilterPatient(list.payload))
      dispatch(setCountByState(countByState.payload))
    }

    setShowTree(!showTree)
    if (showFilter) setShowFilter(!showFilter)
  }

  const handleClickStateIndication = () => {
    setShowState(!showState)
  }

  const handleClickIndicationInfo = () => {
    setShowInfo(!showInfo)
  }

  const onPaginationChange: PaginationProps['onChange'] = async (pageNumber) => {
    const list = await dispatch(getListPatient({
      ...listPatient,
      pageIndex: pageNumber
    }))
    dispatch(setListPatient({
      ...listPatient,
      pageIndex: pageNumber
    }))
    dispatch(setListFilterPatient(list.payload))
  };

  const handleClickPrintIcon = () => {
    setPrintActive(!printActive)
  }

  const columns: ColumnsType<IPatient> = [
    {
      key: '0',
      title: () => (
        <Space>
          <Dropdown menu={{ items }} placement="bottom" arrow={true}>
            <SettingFilled />
          </Dropdown>
          <PrinterFilled
            className={printActive ? 'icon-print-active' : ''}
            onClick={handleClickPrintIcon}
          />
        </Space>
      ),
      width: 50,
      render: (_, _patient, index) => (
        <span>{index + 1}</span>
      ),
    },
    {
      key: '16',
      title: 'State',
      width: 90,
      render: (_, patient) => (
        <span>
          {patient.svSTATE === 0 ? "UnRead" : (
            patient.svSTATE === 1 ? "Reading" : (
              patient.svSTATE === 3 ? "Read" : (
                patient.svSTATE === 5 ? "Consulting" : (
                  patient.svSTATE === 6 ? "Consulted" : (
                    patient.svSTATE === 4 ? "Approving" : (
                      patient.svSTATE === 2 ? "Approved" : ""
                    )
                  )
                )
              )
            )
          )}
        </span>
      ),
    },
    {
      key: '1',
      title: 'Time Example',
      width: 140,
      render: (_, patient) => (
        <Space size="middle">
          <span>{dayjs(patient.timeEx).format("DD/MM/YYYY")}</span>
          <span>{dayjs(patient.timeEx).format("HH:mm")}</span>
        </Space>
      ),
    },
    {
      key: '2',
      title: 'Server Name',
      dataIndex: 'serverName',
      width: 160,
    },
    {
      key: '3',
      title: 'Code',
      dataIndex: 'pCode',
      width: 120,
    },
    {
      key: '4',
      title: 'Patient Name',
      dataIndex: 'pName',
      width: 260,
      className: 'patient-name'
    },
    {
      key: '5',
      title: 'Age',
      dataIndex: 'pAge',
      width: 50,
    },
    {
      key: '6',
      title: 'Gender',
      width: 70,
      render: (_, patient) => (
        <span>{patient.pGender === "M" ? "Nam" : (patient.pGender === "F" ? "Nữ" : "")}</span>
      ),
    },
    {
      key: '7',
      title: 'Modality',
      dataIndex: 'modality',
      width: 80,
    },
    {
      key: '8',
      title: 'Body Part',
      dataIndex: 'bodypart',
      width: 200,
    },
    {
      key: '9',
      title: 'Diagnose (CID)',
      dataIndex: 'clinicalDiagnosis',
      width: 200,
    },
    {
      key: '10',
      title: 'Department',
      dataIndex: 'assDepartment',
      width: 140,
    },
    {
      key: '11',
      title: 'Doctor',
      dataIndex: 'doctorAss',
      width: 180,
    },
    {
      key: '12',
      title: 'Doctor edit',
      dataIndex: 'editByDrName',
      width: 220,
    },
    {
      key: '13',
      title: 'Doctor approve',
      dataIndex: 'aproveByDrName',
      width: 220,
    },
    {
      key: '14',
      title: 'Indication',
      dataIndex: 'serviceName',
      width: 320,
    },
    {
      key: '15',
      title: 'Executor',
      dataIndex: 'executor',
      width: 100,
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '16',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>State</span>
        </Space>
      ),
    },
    {
      key: '1',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Time Example</span>
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Server Name</span>
        </Space>
      ),
    },
    {
      key: '3',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Code</span>
        </Space>
      ),
    },
    {
      key: '4',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Patient Name</span>
        </Space>
      ),
    },
    {
      key: '5',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Age</span>
        </Space>
      ),
    },
    {
      key: '6',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Gender</span>
        </Space>
      ),
    },
    {
      key: '7',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Modality</span>
        </Space>
      ),
    },
    {
      key: '8',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Body Part</span>
        </Space>
      ),
    },
    {
      key: '9',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Diagnose (CID)</span>
        </Space>
      ),
    },
    {
      key: '10',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Department</span>
        </Space>
      ),
    },
    {
      key: '11',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Doctor</span>
        </Space>
      ),
    },
    {
      key: '12',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Doctor edit</span>
        </Space>
      ),
    },
    {
      key: '13',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Doctor approve</span>
        </Space>
      ),
    },
    {
      key: '14',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Indication</span>
        </Space>
      ),
    },
    {
      key: '15',
      label: (
        <Space size="small">
          <Checkbox
            defaultChecked={true}
          />
          <span>Executor</span>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ width: '100%', overflowY: 'hidden' }}>
      <Header>
        <HeaderDemo />
      </Header>
      <Layout hasSider={true} style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Sider width={220} style={{ background: '#1a1835' }}>
          <SiderItem clickItem={handleClickFilter} text={"FILTER"} />
          {showFilter && <Filter />}
          <SiderItem clickItem={handleClickModalities} text={"MODALITIES"} />
          {showTree && <Treeview folderNav={folderNav} />}
          <SiderItem clickItem={handleClickStateIndication} text={"STATE INDICATION"} />
          {showState && <StateIndication />}
          <SiderItem clickItem={handleClickIndicationInfo} text={"INDICATION'S INFO"} />
          {showInfo && <Info />}
        </Sider>
        <Content className='content-container'>
          <div className='list-patient-container'>
            <div className='list-patient'>
              <Table
                className='patient-table'
                onRow={(record, _rowIndex) => {
                  return {
                    onClick: async (event) => {
                      const rowList = document.getElementsByClassName('ant-table-row ant-table-row-level-0')
                      for(let i = 0; i < rowList.length; i++) {
                        rowList[i].className = 'ant-table-row ant-table-row-level-0'
                      }
                      event.currentTarget.className = 'ant-table-row ant-table-row-level-0 row-active'
                      // console.log(event);
                      const history = await dispatch(getHistory({
                        pCode: record.pCode,
                        pageIndex: 1,
                        pageSize: 50
                      }))
                      const reports = await dispatch(getReports({
                        studyId: record.sid,
                        svId: record.svID
                      }))
                      dispatch(sethistoryPatient(history.payload))
                      // console.log(history.payload)
                      dispatch(setReportsPatient(reports.payload))
                      // console.log(reports.payload)
                      dispatch(getInfoPatient({
                        sId: record.sid,
                        svId: record.svID
                      }))
                      // console.log(infoPatient)
                      setShowReports(true)
                      setShowInfoPatient(true)
                    },
                  };
                }}
                sticky={true}
                columns={columns}
                dataSource={listFilterPatient}
                rowKey={(record, _rowIndex) => {
                  return record.sid.toString() + _rowIndex
                }}
                size='small'
                pagination={{
                  pageSize: 50,
                  total: countState.reduce((total, current) => {
                    return total + current.count
                  }, 0),
                  current: listPatient.pageIndex,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                  onChange: onPaginationChange
                }}
              // scroll={{ y: 370, x: 0 }}
              />
            </div>
            <div className='patient-selected'>
              <Table
                className='patient-table'
                onRow={(record, _rowIndex) => {
                  return {
                    onClick: async (event) => {
                      const rowList = document.getElementsByClassName('ant-table-row ant-table-row-level-0')
                      for(let i = 0; i < rowList.length; i++) {
                        rowList[i].className = 'ant-table-row ant-table-row-level-0'
                      }
                      event.currentTarget.className = 'ant-table-row ant-table-row-level-0 row-active'
                      // console.log(event);
                      const history = await dispatch(getHistory({
                        pCode: record.pCode,
                        pageIndex: 1,
                        pageSize: 50
                      }))
                      const reports = await dispatch(getReports({
                        studyId: record.sid,
                        svId: record.svID
                      }))
                      dispatch(sethistoryPatient(history.payload))
                      // console.log(history.payload)
                      dispatch(setReportsPatient(reports.payload))
                      // console.log(reports.payload)
                      dispatch(getInfoPatient({
                        sId: record.sid,
                        svId: record.svID
                      }))
                      // console.log(infoPatient)
                      setShowReports(true)
                      setShowInfoPatient(true)
                    },
                  };
                }}
                sticky={true}
                columns={columns}
                dataSource={historyPatient}
                rowKey={(record, _rowIndex) => {
                  return record.sid.toString() + _rowIndex
                }}
                size='small'
                pagination={{
                  pageSize: 50,
                  total: 50,
                  current: 1,
                  showSizeChanger: false,
                  position: ['bottomLeft'],
                }}
              // scroll={{ y: 120, x: 0 }}
              />
            </div>
          </div>
          <div className='info-patient-container'>
            <div className='patient-info'>
              <Layout>
                <Header className='patient-info-header'>
                  <UserOutlined className='patient-info-header-icon' />
                  <div className='patient-info-header-text'>Patient's Infomation</div>
                </Header>
                {showInfoPatient && <Content className='patient-info-content'>
                  <Row className='patient-info-row'>
                    <Col span={12}>
                      <span className='patient-info-title'>Name: </span>
                      <span>{infoPatient.pName}</span>
                    </Col>
                    <Col span={6}>
                      <span className='patient-info-title'>Age: </span>
                      <span>{infoPatient.pAge}</span>
                    </Col>
                    <Col span={6}>
                      <span className='patient-info-title'>Gender: </span>
                      <span>{infoPatient.pGender === "M" ? "Nam" : (infoPatient.pGender === "F" ? "Nữ" : "")}</span>
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={12}>
                      <span className='patient-info-title'>Code: </span>
                      <span>{infoPatient.pCode}</span>
                    </Col>
                    <Col span={12}>
                      <span className='patient-info-title'>Health's Code: </span>
                      {/*  */}
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={12}>
                      <span className='patient-info-title'>Email: </span>
                      {/*  */}
                    </Col>
                    <Col span={12}>
                      <span className='patient-info-title'>Phone: </span>
                      <span>{infoPatient.pPhoneNo}</span>
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={24}>
                      <span className='patient-info-title'>Address: </span>
                      <span>{infoPatient.pAddress}</span>
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={12}>
                      <span className='patient-info-title'>Diagnose: </span>
                      <span>{infoPatient.diagnose}</span>
                    </Col>
                    <Col span={12}>
                      <span className='patient-info-title'>Doctor: </span>
                      <span>{infoPatient.assDoctor}</span>
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={24}>
                      <span className='patient-info-title'>Indication: </span>
                      <span>{infoPatient.indication}</span>
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={12}>
                      <span className='patient-info-title'>Department: </span>
                      <span>{infoPatient.assDepartment}</span>
                    </Col>
                    <Col span={12}>
                      <span className='patient-info-title'>Visit Code: </span>
                      {/*  */}
                    </Col>
                  </Row>
                  <Row className='patient-info-row'>
                    <Col span={24}>
                      <span className='patient-info-title'>Technicians: </span>
                      {/*  */}
                    </Col>
                  </Row>
                </Content>}
              </Layout>
            </div>
            <div className='patient-print'>
              {showReports && <Layout>
                <Header className='patient-print-header'>
                  <EditOutlined />
                </Header>
                <Content className='patient-print-content'>
                  <div className='patient-print-title'>Indication:</div>
                  <div className='patient-print-desc'>{reportsPatient.serviceName}</div>
                  <div className='patient-print-title'>Technical:</div>
                  <div className='patient-print-desc'>{reportsPatient.tech}</div>
                  <div className='patient-print-title'>Description:</div>
                  <div className='patient-print-desc' dangerouslySetInnerHTML={{ __html: reportsPatient.descImg }} />
                  <div className='patient-print-title'>Conclusion:</div>
                  <div
                    className='patient-print-desc'
                    style={{ fontWeight: "bold" }}
                    dangerouslySetInnerHTML={{ __html: reportsPatient.result }}
                  />
                  <div className='patient-print-title'>Proposal:</div>
                  {reportsPatient.aproTime && <div className='patient-print-proposal'>
                    <Space size="small">
                      <span>{dayjs(reportsPatient.aproTime).format("HH:mm")}</span>
                      <span>{dayjs(reportsPatient.aproTime).format("DD/MM/YYYY")}</span>
                    </Space>
                    <div>Doctor</div>
                    <div>{reportsPatient.aproveByDrName}</div>
                  </div>}
                </Content>
              </Layout>}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DemoPage
