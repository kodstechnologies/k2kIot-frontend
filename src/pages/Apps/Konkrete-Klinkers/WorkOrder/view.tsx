import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconBell from '@/components/Icon/IconBell';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlus from '@/components/Icon/IconPlus';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import IconTrashLines from '@/components/Icon/IconTrashLines';
// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
const rowData = [
    {
        id: 1,
        client: "Client A",
        project: "Project Alpha",
        created_at: "2025-01-01",
        status: "In Progress",
        deadline: "2025-01-15",
        priority: "High",
    },
    {
        id: 2,
        client: "Client B",
        project: "Project Beta",
        created_at: "2025-01-05",
        status: "Pending",
        deadline: "2025-01-20",
        priority: "Medium",
    },
];


const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Column Chooser Table'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'client', title: 'Client Name' },
        { accessor: 'project', title: 'Project Name' },
        { accessor: 'created_at', title: 'Created At' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'deadline', title: 'Deadline' },
        { accessor: 'priority', title: 'Priority' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '#', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/work-order/view', isActive: true },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.client.toLowerCase().includes(search.toLowerCase()) ||
                    item.project.toLowerCase().includes(search.toLowerCase()) ||
                    item.created_at.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.deadline.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.priority.toLowerCase().includes(search.toLowerCase())

                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    return (
        <div>

            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Add Work Order', link: '/konkrete-klinkers/work-order/create' }}
            />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Show/Hide Columns</h5>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={!hideCols.includes(col.accessor)}
                                                                className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                                onChange={(event: any) => {
                                                                    setHideCols(event.target.value);
                                                                    showHideColumns(col.accessor, event.target.checked);
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true, hidden: hideCols.includes('id') },
                            {
                                accessor: 'client',
                                title: 'Client Name',
                                sortable: true,
                                hidden: hideCols.includes('client'),
                            },
                            {
                                accessor: 'project',
                                title: 'Project Name',
                                sortable: true,
                                hidden: hideCols.includes('project'),
                            },
                            {
                                accessor: 'created_at',
                                title: 'Created At',
                                sortable: true,
                                hidden: hideCols.includes('created_at'),
                                render: ({ created_at }) => <div>{new Date(created_at).toLocaleDateString()}</div>,
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                hidden: hideCols.includes('status'),
                                render: ({ status }) => (
                                    <div
                                        className={`${status === 'In Progress'
                                                ? 'text-info'
                                                : status === 'Pending'
                                                    ? 'text-warning'
                                                    : status === 'Completed'
                                                        ? 'text-success'
                                                        : 'text-danger'
                                            } capitalize`}
                                    >
                                        {status}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'deadline',
                                title: 'Deadline',
                                sortable: true,
                                hidden: hideCols.includes('deadline'),
                                render: ({ deadline }) => <div>{new Date(deadline).toLocaleDateString()}</div>,
                            },
                            {
                                accessor: 'priority',
                                title: 'Priority',
                                sortable: true,
                                hidden: hideCols.includes('priority'),
                                render: ({ priority }) => (
                                    <div
                                        className={`${priority === 'High'
                                                ? 'text-danger'
                                                : priority === 'Medium'
                                                    ? 'text-warning'
                                                    : 'text-success'
                                            } capitalize`}
                                    >
                                        {priority}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                hidden: hideCols.includes('action'),
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`/konkrete-klinkers/work-order/create`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to={`/konkrete-klinkers/work-order/detail`} className="flex hover:text-primary">
                                            <IconEye />
                                        </NavLink>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />

                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
