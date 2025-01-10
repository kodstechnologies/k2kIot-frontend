import React, { useState } from 'react';

import IconX from '@/components/Icon/IconX';

import IconSave from '@/components/Icon/IconSave';
// IconSend
import IconTrashLines from '@/components/Icon/IconTrashLines';

interface WorkOrder {
  id: string;
  clientName: string;
  projectName: string;
  poQuantity: number;
}

interface FormData {
  workOrderNumber: string;
  clientName: string;
  projectName: string;
  salesOrderNumber: string;
  productId: string;
  uom: string;
  poQuantity: string | number; // Can be string (from input) or number (from `workOrders`)
  date: string;
  plannedQuantity: string;
  actualQuantity: string;
  rejectedQuantity: string;
}


const ProductionPlanning = () => {
    const [formData, setFormData] = useState<FormData>({
        workOrderNumber: '',
        clientName: '',
        projectName: '',
        salesOrderNumber: '',
        productId: '',
        uom: '',
        poQuantity: '',
        date: '',
        plannedQuantity: '',
        actualQuantity: '',
        rejectedQuantity: '',
    });

    const workOrders = [
        { id: 'WO101', clientName: 'Client A', projectName: 'Project X', poQuantity: 100 },
        { id: 'WO102', clientName: 'Client B', projectName: 'Project Y', poQuantity: 200 },
        { id: 'WO103', clientName: 'Client C', projectName: 'Project Z', poQuantity: 300 },
    ];

    const handleWorkOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedWorkOrder = workOrders.find((wo) => wo.id === e.target.value);

        setFormData((prev) => ({
            ...prev,
            workOrderNumber: e.target.value,
            clientName: selectedWorkOrder?.clientName || '',
            projectName: selectedWorkOrder?.projectName || '',
            poQuantity: selectedWorkOrder?.poQuantity || '',
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };


    const [items, setItems] = useState<any>([
        { id: 1, title: 'Product 1', uom: 'KG',poQuantity:5, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 },
        { id: 2, title: 'Product 2', uom: 'Piece', poQuantity:5,plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 },
        { id: 3, title: 'Product 3', uom: 'Box',poQuantity:5, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 },
    ]);

    const addItem = () => {
        const maxId = items.length ? Math.max(...items.map((item: any) => item.id)) : 0;
        setItems([...items, { id: maxId + 1, title: '', uom: '', plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 }]);
    };

    const removeItem = (item: any) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const updateField = (id: number, field: string, value: number) => {
        setItems((prevItems:any) =>
            prevItems.map((item:any) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg">Job Order Creation</h5>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* <div className="grid grid-cols-4 sm:grid-cols-3 gap-4"> */}
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                    {/* Sales Order Number */}
                    <div>
                        <label htmlFor="salesOrderNumber">Sales Order Number (Optional)</label>
                        <input
                            id="salesOrderNumber"
                            name="salesOrderNumber"
                            type="text"
                            placeholder="Enter Sales Order Number"
                            className="form-input"
                            value={formData.salesOrderNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                 
                {/* </div> */}

                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> */}
                   

                    {/* Date */}
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            className="form-input"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Planned Quantity */}
                   
                </div>



                <div className="mt-8">
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className="w-1">UOM</th>
                            <th className="w-1">PO Quantity</th>
                            <th className="w-1">Planned Quantity</th>
                            <th className="w-1">Achieved Quantity</th>
                            <th className="w-1">Rejected Quantity</th>
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
                                        type="text"
                                        className="form-input w-32"
                                        placeholder="poQuantity"
                                        defaultValue={item.poQuantity}
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
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
                                    <input
                                        type="number"
                                        className="form-input w-32"
                                        placeholder="Achieved Quantity"
                                        min={0}
                                        value={item.achievedQuantity}
                                        onChange={(e) =>
                                            updateField(item.id, 'achievedQuantity', Number(e.target.value))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-input w-32"
                                        placeholder="Rejected Quantity"
                                        min={0}
                                        value={item.rejectedQuantity}
                                        onChange={(e) =>
                                            updateField(item.id, 'rejectedQuantity', Number(e.target.value))
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


              {/* Submit Button */}
              <div className="flex gap-4">
                    <button type="submit" className="btn btn-success w-1/2">
                        <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Submit
                    </button>
                    <button type="submit" className="btn btn-danger w-1/2">
                        <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProductionPlanning;
