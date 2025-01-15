import { useEffect } from 'react';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconSend from '@/components/Icon/IconSend';
import IconPrinter from '@/components/Icon/IconPrinter';
import IconDownload from '@/components/Icon/IconDownload';
import IconEdit from '@/components/Icon/IconEdit';
import IconPlus from '@/components/Icon/IconPlus';

const InvoicePreview = () => {
    const reduxDispatch = useReduxDispatch(); // Renamed to avoid naming conflict
    const location = useLocation();
    const dispatchData = location.state?.dispatchData;

    useEffect(() => {
        reduxDispatch(setPageTitle('Invoice Preview')); // Use renamed variable here
    }, [reduxDispatch]);

    if (!dispatchData) {
        return <div>No data available for the invoice</div>;
    }

    const { workOrderNumber, clientName, projectName, productId, uom, dispatchQuantity, invoiceSto, vehicleNumber } =
        dispatchData;

    const exportTable = () => {
        window.print();
    };

    const items = [
        {
            id: 1,
            title: `Product: ${productId}`,
            quantity: dispatchQuantity,
            price: '150', // Replace with actual pricing logic if available
            amount: (dispatchQuantity * 150).toFixed(2), // Assuming $150 per unit
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'price',
            label: 'PRICE',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    return (
        <div>
            <div className="flex items-center lg:justify-end justify-center flex-wrap gap-4 mb-6">
                {/* <button type="button" className="btn btn-info gap-2">
                    <IconSend />
                    Send Invoice
                </button> */}

                <button type="button" className="btn btn-primary gap-2" onClick={() => exportTable()}>
                    <IconPrinter />
                    Print
                </button>
{/* 
                <button type="button" className="btn btn-success gap-2">
                    <IconDownload />
                    Download
                </button> */}

             
            </div>
            <div className="panel">
                <div className="flex justify-between flex-wrap gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Dispatch Invoice</div>
                    <div className="shrink-0">
                        <img src="/k2k_iot_logo.jfif" alt="img" className="w-14 ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div className="ltr:text-right rtl:text-left px-4">
                    <div className="space-y-1 mt-6 text-white-dark">
                        <div>46, 3rd Floor, BEML Layout, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098</div>
                        <div>kodstech@gmail.com.com</div>
                        <div>+91 8987999988</div>
                    </div>
                </div>

                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div className="flex-1">
                        <div className="space-y-1 text-white-dark">
                            <div>Issue For:</div>
                            <div className="text-black dark:text-white font-semibold">{clientName}</div>
                            <div>{projectName}</div>
                        </div>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Work Order Number :</div>
                                <div>{workOrderNumber}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Invoice/STO :</div>
                                <div>{invoiceSto}</div>
                            </div>
                            <div className="flex items-center w-full justify-between mb-2">
                                <div className="text-white-dark">Vehicle Number :</div>
                                <div>{vehicleNumber}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive mt-6">
                    <table className="table-striped">
                        <thead>
                            <tr>
                                {columns.map((column) => {
                                    return (
                                        <th key={column.key} className={column?.class}>
                                            {column.label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.price}</td>
                                        <td className="ltr:text-right rtl:text-left">${item.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                    <div></div>
                    <div className="ltr:text-right rtl:text-left space-y-2">
                        <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">${(dispatchQuantity * 150).toFixed(2)}</div>
                        </div>
                        <div className="flex items-center font-semibold text-lg">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">${(dispatchQuantity * 150).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
