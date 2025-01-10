import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';

interface FormData {
    workOrder: string;
    jobOrder: string;
    productId: string;
    rejectedQuantity: string;
    rejectionReason: string;
}

const QcCheckForm: React.FC = () => {

    //tooltip
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleCode = (code: string) => {
        setShowTooltip((prev) => !prev);
    };
    const [formData, setFormData] = useState<FormData>({
        workOrder: '',
        jobOrder: '',
        productId: '',
        rejectedQuantity: '',
        rejectionReason: '',
    });

    const workOrders = ['Work Order 1', 'Work Order 2', 'Work Order 3'];
    const jobOrders: { [key: string]: string[] } = {
        'Work Order 1': ['Job Order A1', 'Job Order A2'],
        'Work Order 2': ['Job Order B1', 'Job Order B2'],
        'Work Order 3': ['Job Order C1', 'Job Order C2'],
    };
    const products = ['Product A', 'Product B', 'Product C'];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // Reset dependent fields
            ...(name === 'workOrder' ? { jobOrder: '', productId: '' } : {}),
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="panel">
       <div className="mb-5 flex items-center justify-between">
                <h5 className="font-semibold text-lg dark:text-white-light">QC Check Form</h5>
                <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 relative"
                >
                    <span className="flex items-center">
                        <IconInfoCircle className="me-2" />
                    </span>
                    {showTooltip && (
                        <div className="absolute top-0 right-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg">
                            This form is used for QC checks. Select the appropriate work order, job order, and product ID. Fill out the rejected quantity and reason for rejection.
                        </div>
                    )}
                </button>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    {/* Work Order */}
                    <div>
                        <label htmlFor="workOrder">Work Order</label>
                        <select
                            id="workOrder"
                            name="workOrder"
                            className="form-input"
                            value={formData.workOrder}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Work Order</option>
                            {workOrders.map((workOrder) => (
                                <option key={workOrder} value={workOrder}>
                                    {workOrder}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Job Order */}
                    <div>
                        <label htmlFor="jobOrder">Job Order</label>
                        <select
                            id="jobOrder"
                            name="jobOrder"
                            className="form-input"
                            value={formData.jobOrder}
                            onChange={handleInputChange}
                            disabled={!formData.workOrder}
                        >
                            <option value="">Select Job Order</option>
                            {formData.workOrder &&
                                jobOrders[formData.workOrder]?.map((jobOrder) => (
                                    <option key={jobOrder} value={jobOrder}>
                                        {jobOrder}
                                    </option>
                                ))}
                        </select>
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
                            disabled={!formData.jobOrder}
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product} value={product}>
                                    {product}
                                </option>
                            ))}
                        </select>
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

                    {/* Rejection Reason */}
                    <div>
                        <label htmlFor="rejectionReason">Rejection Reason</label>
                        {/* <input
                            id="rejectionReason"
                            name="rejectionReason"
                            type="text"
                            placeholder="Enter Rejection Reason"
                            className="form-input"
                            value={formData.rejectionReason}
                            onChange={handleInputChange}
                        /> */}

<textarea
                                                   id="rejectionReason"
                                                   name="rejectionReason"

                                                   placeholder="Enter Rejection Reason"
                                                   className="form-input"
                                                   value={formData.rejectionReason}
                                                   onChange={handleInputChange}
                                                ></textarea>

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

export default QcCheckForm;
