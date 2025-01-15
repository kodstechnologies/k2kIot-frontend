import React, { useState } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';

const DispatchCreation = () => {
    const [formData, setFormData] = useState({
        workOrderNumber: '',
        plantCode: '',
        clientName: '',
        projectName: '',
        productId: '',
        uom: '',
        dispatchQuantity: '',
        dispatchDate: '',
        invoiceSto: '',
        vehicleNumber: '',
        qrCodeImage: '',
    });

    const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);

    const workOrders = [
        { id: 'WO101', plantCode: 'Plant 001', clientName: 'Client A', projectName: 'Project X' },
        { id: 'WO102', plantCode: 'Plant 002', clientName: 'Client B', projectName: 'Project Y' },
        { id: 'WO103', plantCode: 'Plant 003', clientName: 'Client C', projectName: 'Project Z' },
    ];

    const products = ['Product A', 'Product B', 'Product C'];
    const uoms = ['Unit', 'Box', 'Kg'];

    const handleWorkOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedWorkOrder = workOrders.find((wo) => wo.id === e.target.value);

        setFormData((prev) => ({
            ...prev,
            workOrderNumber: e.target.value,
            plantCode: selectedWorkOrder?.plantCode || '',
            clientName: selectedWorkOrder?.clientName || '',
            projectName: selectedWorkOrder?.projectName || '',
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleQRCodeGeneration = () => {
        // Mock QR code generation
        setFormData((prev) => ({
            ...prev,
            qrCodeImage: 'https://via.placeholder.com/150?text=QR+Code', // Replace with real QR code logic
        }));
        setIsQRCodeGenerated(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };



        const [items, setItems] = useState<any>([
            { id: 1, title: 'Product 1', uom: 'KG', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
            { id: 2, title: 'Product 2', uom: 'Piece', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
            { id: 3, title: 'Product 3', uom: 'Box', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
        ]);
    
        const removeItem = (item: any) => {
            setItems(items.filter((d: any) => d.id !== item.id));
        };
    
        const updateField = (id: number, field: string, value: number) => {
            setItems((prevItems: any) =>
                prevItems.map((item: any) =>
                    item.id === id ? { ...item, [field]: value } : item
                )
            );
        };

        // **Downtime Details State**
            const [downtimeItems, setDowntimeItems] = useState<any[]>([
                { id: 1, description: '', minutes: 0, remarks: '' },
            ]);
        
            const addDowntimeItem = () => {
                const maxId = downtimeItems.length ? Math.max(...downtimeItems.map((item) => item.id)) : 0;
                setDowntimeItems([...downtimeItems, { id: maxId + 1, description: '', minutes: 0, remarks: '' }]);
            };
        
            const removeDowntimeItem = (item: any) => {
                setDowntimeItems(downtimeItems.filter((d: any) => d.id !== item.id));
            };
        
            const handleDowntimeChange = (id: number, field: string, value: string | number) => {
                setDowntimeItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
            };

    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg">Dispatch Creation</h5>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Work Order Number */}
                    <div>
                        <label htmlFor="workOrderNumber">Work Order Number</label>
                        <select
                            id="workOrderNumber"
                            name="workOrderNumber"
                            className="form-input"
                            value={formData.workOrderNumber}
                            onChange={handleWorkOrderChange}
                        >
                            <option value="">Select Work Order</option>
                            {workOrders.map((wo) => (
                                <option key={wo.id} value={wo.id}>
                                    {wo.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Plant Code */}
                    <div>
                        <label htmlFor="plantCode">Plant Code</label>
                        <input
                            id="plantCode"
                            name="plantCode"
                            type="text"
                            className="form-input"
                            value={formData.plantCode}
                            disabled
                        />
                    </div>

                    {/* Client Name */}
                    <div>
                        <label htmlFor="clientName">Client Name</label>
                        <input
                            id="clientName"
                            name="clientName"
                            type="text"
                            className="form-input"
                            value={formData.clientName}
                            disabled
                        />
                    </div>

                       {/* Project Name */}
                       <div>
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            id="projectName"
                            name="projectName"
                            type="text"
                            className="form-input"
                            value={formData.projectName}
                            disabled
                        />
                    </div>
                </div>


                <div className="mt-8">
                    <h3 className="font-semibold text-lg">Select Product </h3>

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="w-1">UOM</th>
                                    <th className="w-1">Dispatch Quantity</th>
                                    <th className="w-1">Dispatch Date</th>
                                  

                                    <th className="w-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length <= 0 && (
                                    <tr>
                                        <td colSpan={6} className="!text-center font-semibold">
                                            No Item Available
                                        </td>
                                    </tr>
                                )}
                                {items.map((item: any) => (
                                    <tr className="align-top" key={item.id}>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-input min-w-[200px]"
                                                placeholder="Enter Item Name"
                                                defaultValue={item.title}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-input w-32"
                                                placeholder="UOM"
                                                defaultValue={item.uom}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="PO Quantity"
                                                min={0}
                                                value={item.poQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'poQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                className="form-input w-32"
                                                placeholder="Planned Quantity"
                                                min={0}
                                                value={item.plannedQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'plannedQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
                                      

                                      
                                        
                                        <td>
                                            <button type="button" onClick={() => removeItem(item)}>
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                <div className="sm:mb-0 mb-6">
                    <button type="button" className="btn btn-primary" onClick={addItem}>
                        <IconChecks className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Add Product
                    </button>
                </div>
            </div> */}

                  


                </div>




                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 

                 

                  
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Invoice/STO */}
                    <div>
                        <label htmlFor="invoiceSto">Invoice/STO</label>
                        <input
                            id="invoiceSto"
                            name="invoiceSto"
                            type="text"
                            placeholder="Enter Invoice or STO"
                            className="form-input"
                            value={formData.invoiceSto}
                            onChange={handleInputChange}
                        />
                    </div>
                {/* </div> */}

                    {/* Vehicle Number */}
                    <div>
                        <label htmlFor="vehicleNumber">Vehicle Number</label>
                        <input
                            id="vehicleNumber"
                            name="vehicleNumber"
                            type="text"
                            placeholder="Enter Vehicle Number"
                            className="form-input"
                            value={formData.vehicleNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Vehicle Number */}
                    <div>
                        <label htmlFor="vehicleNumber">Docket Number</label>
                        <input
                            id="docketNumber"
                            name="docketNumber"
                            type="text"
                            placeholder="Enter Docket Number"
                            className="form-input"
                            value={formData.vehicleNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                   
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button type="submit" className="btn btn-success w-1/2">
                        <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Submit
                    </button>
                    <button type="button" className="btn btn-danger w-1/2">
                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DispatchCreation;
