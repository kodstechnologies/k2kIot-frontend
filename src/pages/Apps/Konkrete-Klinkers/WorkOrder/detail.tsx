import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import { DataTable } from 'mantine-datatable';
import AnimateHeight from 'react-animate-height';
import IconBell from '@/components/Icon/IconBell';

const WorkOrderPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Work Order'));
    }, [dispatch]);

    // Sample data for demonstration
    const clientDetails = {
        clientName: 'ABC Corp',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        gst: '123456789ABC',
        placeOfSupply: 'New York',
    };

    const products = [
        {
            description: 'Product A',
            uom: 'Kg',
            requiredQuantity: 100,
            plantCode: 'P1',
            deliveryDate: '2025-01-20',
        },
        {
            description: 'Product B',
            uom: 'Ltr',
            requiredQuantity: 200,
            plantCode: 'P2',
            deliveryDate: '2025-01-22',
        },
    ];

    const jobOrders = [
        {
            id: 1,
            productName: 'Product A',
            uom: 'Kg',
            poQuantity: 100,
            plannedQuantity: 90,
            achievedQuantity: 80,
            rejectedQuantity: 10,
            dailyReports: [
                {
                    createdBy: 'Operator 1',
                    date: '2025-01-10',
                    poQuantity: 50,
                    plannedQuantity: 45,
                    achievedQuantity: 40,
                    rejectedQuantity: 5,
                    recycledQuantity: 2,
                },
                {
                    createdBy: 'Operator 2',
                    date: '2025-01-11',
                    poQuantity: 50,
                    plannedQuantity: 50,
                    achievedQuantity: 40,
                    rejectedQuantity: 10,
                    recycledQuantity: 3,
                },
            ],
        },
        {
            id: 2,
            productName: 'Product B',
            uom: 'Ltr',
            poQuantity: 200,
            plannedQuantity: 180,
            achievedQuantity: 170,
            rejectedQuantity: 10,
            dailyReports: [
                {
                    createdBy: 'Operator 3',
                    date: '2025-01-12',
                    poQuantity: 100,
                    plannedQuantity: 90,
                    achievedQuantity: 85,
                    rejectedQuantity: 5,
                    recycledQuantity: 4,
                },
                {
                    createdBy: 'Operator 4',
                    date: '2025-01-13',
                    poQuantity: 100,
                    plannedQuantity: 90,
                    achievedQuantity: 85,
                    rejectedQuantity: 5,
                    recycledQuantity: 3,
                },
            ],
        },

    ];


    const workOrder = {
        id: 'abc123',
        createdAt: '2025-01-10 10:30 AM',
        createdBy: {
            name: 'Bharath Kumar',
            role: 'Manager',
        },
        deadline: '2025-01-20',
        status: 'In Progress',
        priority: 'High',
    };


    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const PAGE_SIZES = [5, 10, 20];


    const packingData = [
        {
            serialNumber: 'BR001',
            productId: 'P101',

            quantity: 500,
            rejectedQuantity: 10,
            date: '2025-01-10 10:30 AM',
            createdBy: 'Bharath',
        },
        {
            serialNumber: 'BR002',
            productId: 'P102',
            quantity: 450,
            rejectedQuantity: 5,
            date: '2025-01-11 11:15 AM',
            createdBy: 'Samira',
        },
        {
            serialNumber: 'BR003',
            productId: 'P103',

            quantity: 600,
            rejectedQuantity: 15,
            date: '2025-01-12 09:45 AM',
            createdBy: 'ALisha',
        },
        {
            serialNumber: 'BR004',
            productId: 'P104',

            quantity: 550,
            rejectedQuantity: 20,
            date: '2025-01-13 02:20 PM',
            createdBy: 'Ravi ',
        },
    ];

    const dispatchData = [
        {
            dispatchId: 'D001',
            products: [
                {
                    productName: 'Bricks A',
                    quantity: 500,
                    uom: 'Pieces',
                    rate: 10,
                    amount: 5000,
                    timestamp: '2025-01-15 10:30 AM',
                    vehicleNumber: 'KA-01-1234',
                    docketNumber: 'DOC001',
                },
                {
                    productName: 'Bricks B',
                    quantity: 300,
                    uom: 'Pieces',
                    rate: 12,
                    amount: 3600,
                    timestamp: '2025-01-15 10:30 AM',
                    vehicleNumber: 'KA-01-1234',
                    docketNumber: 'DOC001',
                },
            ],
        },
        {
            dispatchId: 'D002',
            products: [
                {
                    productName: 'Bricks C',
                    quantity: 400,
                    uom: 'Pieces',
                    rate: 15,
                    amount: 6000,
                    timestamp: '2025-01-16 11:00 AM',
                    vehicleNumber: 'KA-02-5678',
                    docketNumber: 'DOC002',
                },
            ],
        },
    ];


    const filteredData = packingData.filter(
        (item) =>
            item.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
            item.productId.toLowerCase().includes(search.toLowerCase())
    );

    const [expandedJobOrders, setExpandedJobOrders] = useState(jobOrders.map((job) => job.id));

    const toggleJobOrder = (id: any) => {
        if (expandedJobOrders.includes(id)) {
            setExpandedJobOrders((prev) => prev.filter((jobId) => jobId !== id));
        } else {
            setExpandedJobOrders((prev) => [...prev, id]);
        }
    };
    // Filter data based on search
    const filteredData1 = dispatchData.filter((dispatch) =>
        dispatch.products.some(
            (product) =>
                product.productName.toLowerCase().includes(search.toLowerCase()) ||
                product.vehicleNumber.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="p-4">
            {/* Client Details Section */}
            <div className="panel mb-6 bg-yellow-100">
                <h2 className="text-lg font-semibold mb-4">Client Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div><strong>Client Name:</strong> {clientDetails.clientName}</div>
                        <div><strong>Address:</strong> {clientDetails.address}</div>
                        <div><strong>City:</strong> {clientDetails.city}</div>
                    </div>
                    <div>
                        <div><strong>State:</strong> {clientDetails.state}</div>
                        <div><strong>GST:</strong> {clientDetails.gst}</div>
                        <div><strong>Place of Supply:</strong> {clientDetails.placeOfSupply}</div>
                    </div>
                </div>
            </div>
            {/* progress section */}
            {/* Work order Details Section */}
            <div className="panel mb-6 bg-blue-50">
                <h2 className="text-lg font-semibold mb-4">Work Order Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div><strong>Work Order Id:</strong> {workOrder.id}</div>
                        <div><strong>Created At:</strong> {workOrder.createdAt}</div>
                        <div><strong>Created By:</strong> {workOrder.createdBy.name} ({workOrder.createdBy.role})</div>
                    </div>
                    <div>
                        <div><strong>Deadline:</strong> {workOrder.deadline}</div>
                        <div><strong>Status:</strong>
                            <span
                                className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${workOrder.status === 'In Progress'
                                    ? 'text-blue-500'
                                    : workOrder.status === 'Completed'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}
                            >
                                {workOrder.status}
                            </span>
                        </div>
                        <div><strong>Priority:</strong>
                            <span
                                className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${workOrder.priority === 'High'
                                    ? 'text-red-500'
                                    : workOrder.priority === 'Medium'
                                        ? 'text-yellow-500'
                                        : 'text-green-500'
                                    }`}
                            >
                                {workOrder.priority}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Products Section */}
            <div className="panel mb-6 bg-blue-100">
                <h2 className="text-lg font-semibold mb-4">Products</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>UOM</th>
                            <th>Required Quantity</th>
                            <th>Plant Code</th>
                            <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.description}</td>
                                <td>{product.uom}</td>
                                <td>{product.requiredQuantity}</td>
                                <td>{product.plantCode}</td>
                                <td>{product.deliveryDate}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* progress section */}
            <div className="panel mb-4 bg-gray-100" id="labeled">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Overall Progress</h5>

                    {/* </div> */}
                    {/* <div className="mb-5 space-y-5"> */}
                    <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
                        <div className="bg-info h-4 rounded-full w-4/5 text-center text-white text-xs">80%</div>
                    </div>
                </div>
            </div>

            {/* new job orders */}
            <div>
                {jobOrders.map((jobOrder) => (
                    <div key={jobOrder.id} className="panel mb-6">
                        <h2 className="text-lg font-semibold mb-4">Job Order - {jobOrder.productName}</h2>
                        <table className="table-auto w-full mb-4">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>UOM</th>
                                    <th>PO Quantity</th>
                                    <th>Planned Quantity</th>
                                    <th>Achieved Quantity</th>
                                    <th>Rejected Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{jobOrder.productName}</td>
                                    <td>{jobOrder.uom}</td>
                                    <td>{jobOrder.poQuantity}</td>
                                    <td>{jobOrder.plannedQuantity}</td>
                                    <td>{jobOrder.achievedQuantity}</td>
                                    <td>{jobOrder.rejectedQuantity}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Tree View for Daily Production Reports */}
                        <div>
                            <button
                                type="button"
                                onClick={() => toggleJobOrder(jobOrder.id)}
                                className="flex items-center text-primary font-semibold mb-4"
                            >
                                <span className={`mr-2 ${expandedJobOrders.includes(jobOrder.id) ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                                {expandedJobOrders.includes(jobOrder.id)
                                    ? 'Hide Production Reports'
                                    : 'Show Production Reports'}
                            </button>
                            <AnimateHeight duration={300} height={expandedJobOrders.includes(jobOrder.id) ? 'auto' : 0}>
                                <ul className="font-semibold">
                                    {jobOrder.dailyReports.map((report, index) => (
                                        <li key={index} className="mb-4">
                                            <div className="py-2 px-4 bg-gray-100 rounded">
                                                <h3 className="text-md font-semibold">
                                                    Daily Report - {report.date} (Created by {report.createdBy})
                                                </h3>
                                                <table className="table-auto w-full mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th>PO Quantity</th>
                                                            <th>Planned Quantity</th>
                                                            <th>Achieved Quantity</th>
                                                            <th>Rejected Quantity</th>
                                                            <th>Recycled Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{report.poQuantity}</td>
                                                            <td>{report.plannedQuantity}</td>
                                                            <td>{report.achievedQuantity}</td>
                                                            <td>{report.rejectedQuantity}</td>
                                                            <td>{report.recycledQuantity}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </AnimateHeight>
                        </div>
                    </div>
                ))}
            </div>

            {/* Packing Section */}
            <div className="panel  bg-slate-50">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Packing Details</h5>
                    <input
                        type="text"
                        className="form-input w-auto"
                        placeholder="Search by Serial Number or Product ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={filteredData}
                        columns={[
                            { accessor: 'serialNumber', title: 'Serial Number' },
                            { accessor: 'productId', title: 'Product ID' },
                            { accessor: 'date', title: 'Date & Time' },
                            { accessor: 'quantity', title: 'Quantity' },
                            { accessor: 'rejectedQuantity', title: 'Rejected Quantity' },
                            { accessor: 'createdBy', title: 'Created By' },

                        ]}
                        totalRecords={filteredData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>

            {/* Dispatch Section */}
            <div className="panel mt-4 bg-slate-50">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Dispatch Details</h5>
                    <input
                        type="text"
                        className="form-input w-auto"
                        placeholder="Search by Product Name or Vehicle Number..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="datatables">
                    <table className="whitespace-nowrap table-striped w-full">
                        <thead>
                            <tr>
                                <th>Dispatch ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>Timestamp</th>
                                <th>Vehicle Number</th>
                                <th>Docket Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData1.map((dispatch) => (
                                <React.Fragment key={dispatch.dispatchId}>
                                    {/* Dispatch Header */}
                                    <tr className="bg-gray-100 font-bold">
                                        <td colSpan={9}>Dispatch ID: {dispatch.dispatchId}</td>
                                    </tr>
                                    {/* Products under Dispatch */}
                                    {dispatch.products.map((product, index) => (
                                        <tr key={index}>
                                            <td></td> {/* Empty cell for Dispatch ID */}
                                            <td>{product.productName}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.uom}</td>
                                            <td>{product.rate}</td>
                                            <td>{product.amount}</td>
                                            <td>{product.timestamp}</td>
                                            <td>{product.vehicleNumber}</td>
                                            <td>{product.docketNumber}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkOrderPage;
