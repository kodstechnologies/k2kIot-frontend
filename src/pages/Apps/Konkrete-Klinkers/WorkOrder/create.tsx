import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconX from '@/components/Icon/IconX';

import IconSave from '@/components/Icon/IconSave';
// IconSend
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconFile from '@/components/Icon/IconFile';
import IconChecks from '@/components/Icon/IconChecks';
import { BackgroundImage } from '@mantine/core';

{/* <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" /> */ }


interface FormData {
    clientName: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    productId: string;
    uom: string;
    orderQuantity: string;
    plantCode: string;
    files: ImageListType;
}


const Create = () => {
    const [formData, setFormData] = useState<FormData>({
        clientName: '',
        projectName: '',
        workOrderNumber: '',
        workOrderDate: '',
        productId: '',
        uom: '',
        orderQuantity: '',
        plantCode: '',
        files: [],
    });

    const maxNumber = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const clients = ['Client A', 'Client B', 'Client C'];
    const projects = ['Project X', 'Project Y', 'Project Z'];
    const plantCodes = ['Plant 101', 'Plant 102', 'Plant 103'];


    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
            plantCode: '', // New field
            deliveryDate: '', // New field
        },
    ]);
    
    const addItem = () => {
        let maxId = items?.length
            ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id)
            : 0;
    
        setItems([...items, { id: maxId + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0, plantCode: '', deliveryDate: '' }]);
    };
    
    const updateItemField = (field: string, value: any, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (item) {
            item[field] = value;
        }
        setItems([...list]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeQuantityPrice = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (type === 'quantity') {
            item.quantity = Number(value);
        }
        if (type === 'price') {
            item.amount = Number(value);
        }
        setItems([...list]);
    };




    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg">Create Work Order</h5>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Client Name */}
                <div>
                    <label htmlFor="clientName">Client Name</label>
                    <select
                        id="clientName"
                        name="clientName"
                        className="form-input"
                        value={formData.clientName}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client} value={client}>
                                {client}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project Name */}
                <div>
                    <label htmlFor="projectName">Project Name</label>
                    <select
                        id="projectName"
                        name="projectName"
                        className="form-input"
                        value={formData.projectName}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project} value={project}>
                                {project}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Work Order Number */}
                <div>
                    <label htmlFor="workOrderNumber">Work Order Number</label>
                    <input
                        id="workOrderNumber"
                        name="workOrderNumber"
                        type="text"
                        placeholder="Enter Work Order Number"
                        className="form-input"
                        value={formData.workOrderNumber}
                        onChange={handleInputChange}
                    />
                </div>

            
                {/* Work Order Date */}
                <div>
                    <label htmlFor="workOrderDate">Work Order Date</label>
                    <input
                        id="workOrderDate"
                        name="workOrderDate"
                        type="date"
                        className="form-input"
                        value={formData.workOrderDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mt-8">
    <div className="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th className="w-1">UOM</th>
                    <th className="w-1">PO Quantity</th>
                    <th className="w-1">Plant Code</th>
                    <th className="w-1">Delivery Date</th>
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
                {items.map((item: any) => {
                    return (
                        <tr className="align-top" key={item.id}>
                            <td>
                                <input
                                    type="text"
                                    className="form-input min-w-[200px]"
                                    placeholder="Enter Item Name"
                                    defaultValue={item.title}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-input w-32"
                                    placeholder="Quantity"
                                    min={0}
                                    defaultValue={item.quantity}
                                    onChange={(e) => changeQuantityPrice('quantity', e.target.value, item.id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-input w-32"
                                    placeholder="Price"
                                    min={0}
                                    defaultValue={item.amount}
                                    onChange={(e) => changeQuantityPrice('price', e.target.value, item.id)}
                                />
                            </td>
                            <td>
                                <select
                                    className="form-select w-32"
                                    value={item.plantCode || ''}
                                    onChange={(e) =>
                                        updateItemField('plantCode', e.target.value, item.id)
                                    }
                                >
                                    <option value="">Select Plant Code</option>
                                    {plantCodes.map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    className="form-input w-32"
                                    value={item.deliveryDate || ''}
                                    onChange={(e) =>
                                        updateItemField('deliveryDate', e.target.value, item.id)
                                    }
                                />
                            </td>
                            <td>
                                <button type="button" onClick={() => removeItem(item)}>
                                    <IconX className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    <div className="flex justify-between sm:flex-row flex-col mt-6 px-4 float-right">
        <div className="sm:mb-0 mb-6 ">
            <button type="button" className="btn btn-primary " onClick={() => addItem()}>
                <IconChecks className="ltr:mr-2 rtl:ml-2 shrink-0" />
                Add Product
            </button>
        </div>
    </div>
</div>
             

                {/* File Upload */}
                <div>
                    <label>Upload Files</label>
                    <ImageUploading
                        multiple
                        value={formData.files}
                        onChange={handleFileChange}
                        maxNumber={maxNumber}
                    >
                        {({ imageList, onImageUpload, onImageRemove }) => (
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-primary mb-2"
                                    onClick={onImageUpload}
                                >
                                    <IconFile className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Upload Files
                                </button>
                                <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                    {imageList.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image.dataURL}
                                                alt="uploaded"
                                                className="w-full h-32 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                onClick={() => onImageRemove(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ImageUploading>
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

export default Create;


