import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store"
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import Select from 'react-select';

interface FormData {
    name: string;
    address: string;
    city: string;
    state: StateOption | null; // Updated to store the selected option object or null
    pincode: string;
    gst: string;
    placeOfSupply: string;
  }
interface StateOption {
    value: string;
    label: string;
}



const ClientCreation = () => {
    const baseURL = import.meta.env.VITE_APP_SERVER_URL;
    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

    console.log("userdetaila", baseURL)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        address: '',
        city: '',
        state: null,
        pincode: '',
        gst: '',
        placeOfSupply: '',
    });

    const stateOptions: StateOption[] = [
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Assam', label: 'Assam' },
        { value: 'Bihar', label: 'Bihar' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Haryana', label: 'Haryana' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
        { value: 'Jharkhand', label: 'Jharkhand' },
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Manipur', label: 'Manipur' },
        { value: 'Meghalaya', label: 'Meghalaya' },
        { value: 'Mizoram', label: 'Mizoram' },
        { value: 'Nagaland', label: 'Nagaland' },
        { value: 'Odisha', label: 'Odisha' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Tripura', label: 'Tripura' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
        { value: 'Uttarakhand', label: 'Uttarakhand' },
        { value: 'West Bengal', label: 'West Bengal' },
    ];

    const handleStateChange = (selectedOption: StateOption | null) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          state: selectedOption,
        }));
      };
      const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const selectedStateValue = formData.state ? formData.state.value : '';


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Example API call to create a client
            const userId = userDetail._id;
            const response = await fetch(`${baseURL}/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Pass the token here
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create client');
            }
            console.log('Client created successfully');
            navigate('/clients');
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Helpers', link: '/', isActive: false },
        { label: 'Clients', link: '/clients', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/clients' }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Client Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Client Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <label htmlFor="name" className="w-1/4 pr-4">Client Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Client Name"
                                className="form-input flex-1"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center">
                        <label htmlFor="address" className="w-1/4 pr-4">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Enter Address"
                            className="form-input flex-1"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* City */}
                    <div className="flex items-center">
                        <label htmlFor="city" className="w-1/4 pr-4">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter City"
                            className="form-input flex-1"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* State */}
                    <div className="flex items-center">
                        <label htmlFor="state" className="w-1/4 pr-4">State</label>
                   

                        <select
    id="state"
    name="state"
    className="form-input flex-1"
    value={formData.state ? formData.state.value : ''}
    onChange={(e) => {
        const selectedOption = stateOptions.find((option) => option.value === e.target.value) || null;
        handleStateChange(selectedOption);
    }}
>
    <option value="">Select State</option>
    {stateOptions.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
</select>

                    </div>

                    {/* Pincode */}
                    <div className="flex items-center">
                        <label htmlFor="pincode" className="w-1/4 pr-4">Pincode</label>
                        <input
                            id="pincode"
                            name="pincode"
                            type="text"
                            placeholder="Enter Pincode"
                            className="form-input flex-1"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Client GST */}
                    <div className="flex items-center">
                        <label htmlFor="gst" className="w-1/4 pr-4">Client GST</label>
                        <input
                            id="gst"
                            name="gst"
                            type="text"
                            placeholder="Enter Client GST"
                            className="form-input flex-1"
                            value={formData.gst}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Place of Supply */}
                    <div className="flex items-center">
                        <label htmlFor="placeOfSupply" className="w-1/4 pr-4">Place of Supply</label>
                        <input
                            id="placeOfSupply"
                            name="placeOfSupply"
                            type="text"
                            placeholder="Enter Place of Supply"
                            className="form-input flex-1"
                            value={formData.placeOfSupply}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <Link to="/clients" className="flex-1">
                            <button type="button" className="btn btn-danger w-full">
                                <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default ClientCreation;
