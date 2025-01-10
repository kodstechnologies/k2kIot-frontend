import React, { useState } from 'react';

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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                    {/* Product ID */}
                    <div>
                        <label htmlFor="productId">Product ID</label>
                        <select
                            id="productId"
                            name="productId"
                            className="form-input"
                            value={formData.productId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product} value={product}>
                                    {product}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* UOM */}
                    <div>
                        <label htmlFor="uom">Unit of Measure (UOM)</label>
                        <select
                            id="uom"
                            name="uom"
                            className="form-input"
                            value={formData.uom}
                            onChange={handleInputChange}
                        >
                            <option value="">Select UOM</option>
                            {uoms.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Dispatch Quantity */}
                    <div>
                        <label htmlFor="dispatchQuantity">Dispatch Quantity</label>
                        <input
                            id="dispatchQuantity"
                            name="dispatchQuantity"
                            type="number"
                            placeholder="Enter Dispatch Quantity"
                            className="form-input"
                            value={formData.dispatchQuantity}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Dispatch Date */}
                    <div>
                        <label htmlFor="dispatchDate">Dispatch Date</label>
                        <input
                            id="dispatchDate"
                            name="dispatchDate"
                            type="date"
                            className="form-input"
                            value={formData.dispatchDate}
                            onChange={handleInputChange}
                        />
                    </div>

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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                    {/* QR Code Display */}
                    <div>
                        <label>QR Code</label>
                        {isQRCodeGenerated && formData.qrCodeImage ? (
                            <img src={formData.qrCodeImage} alt="QR Code" className="w-full h-32 object-contain" />
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleQRCodeGeneration}
                            >
                                Generate QR Code
                            </button>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DispatchCreation;
