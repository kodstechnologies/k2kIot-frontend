import React, { useState } from 'react';
import BarcodeScannerComponent  from 'react-qr-barcode-scanner';

const PackingCreation = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productQuantity: '',
        rejectedQuantity: '',
        qrCodeId: '',
    });

    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const products = ['Product A', 'Product B', 'Product C'];
const workOrders = ["Work Order A", "Work Order B", "Work Order C"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleScanResult = (result: string | null) => {
        if (result) {
            setFormData((prev) => ({ ...prev, qrCodeId: result }));
            setIsScannerOpen(false); // Close scanner after reading
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg">Packing Creation</h5>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      {/* Work Order Name */}
                      <div>
                        <label htmlFor="productName">Work Order </label>
                        <select
                            id="productName"
                            name="productName"
                            className="form-input"
                            value={formData.productName}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Work Order</option>
                            {workOrders.map((product) => (
                                <option key={product} value={product}>
                                    {product}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Product Name */}
                    <div>
                        <label htmlFor="productName">Product Name</label>
                        <select
                            id="productName"
                            name="productName"
                            className="form-input"
                            value={formData.productName}
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

                    {/* Product Quantity */}
                    <div>
                        <label htmlFor="productQuantity">Product Quantity</label>
                        <input
                            id="productQuantity"
                            name="productQuantity"
                            type="number"
                            placeholder="Enter Product Quantity"
                            className="form-input"
                            value={formData.productQuantity}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Rejected Quantity */}
                    <div>
                        <label htmlFor="rejectedQuantity">Rejected Quantity</label>
                        <input
                            id="rejectedQuantity"
                            name="rejectedQuantity"
                            type="number"
                            placeholder="Enter Rejected Quantity"
                            className="form-input"
                            value={formData.rejectedQuantity}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    {/* QR Code ID */}
                    <div>
                        <label htmlFor="qrCodeId">QR Code ID</label>
                        <input
                            id="qrCodeId"
                            name="qrCodeId"
                            type="text"
                            placeholder="Scanned QR Code ID"
                            className="form-input"
                            value={formData.qrCodeId}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary mt-2"
                            onClick={() => setIsScannerOpen(true)}
                        >
                            Open QR Scanner
                        </button>
                    </div>
                </div>

                {/* QR Code Scanner */}
                {isScannerOpen && (
                    <div className="mb-4">
                      <BarcodeScannerComponent
                            onUpdate={(error, result) => {
                                if (result) handleScanResult(result.getText());
                                if (error) console.warn(error);
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => setIsScannerOpen(false)}
                        >
                            Close Scanner
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PackingCreation;
