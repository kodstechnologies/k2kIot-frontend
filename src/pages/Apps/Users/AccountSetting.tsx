import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';

import { useEffect, useState } from 'react';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconHome from '@/components/Icon/IconHome';
import IconUser from '@/components/Icon/IconUser';
import IconSave from '@/components/Icon/IconSave';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

 
        const toggleAllPermissions = () => {
            const isChecked = (document.getElementById('selectAll') as HTMLInputElement).checked;
            const checkboxes = document.querySelectorAll('.form-checkbox');
            checkboxes.forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = isChecked;
            });
        };
    
        const savePermissions = () => {
            alert('Permissions saved successfully!');
        };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Account Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Home
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('payment-details')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'payment-details' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconUser />
                               Permissions
                            </button>
                        </li>
                  
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('danger-zone')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'danger-zone' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconSave />
                                Danger Zone
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                <label htmlFor="name">Full Name</label>
                                <input id="name" type="text" placeholder={userDetail?.fullName || 'Guest User'} className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="profession">Profession</label>
                                <input id="profession" type="text" placeholder= 'Web Developer' className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="country">Country</label>
                                <select defaultValue="India" id="country" className="form-select text-white-dark">
                                    <option value="All Countries">All Countries</option>
                                 
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                    <option value="China">China</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Canada">Canada</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input id="address" type="text" placeholder="RR Nagar" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="location">Location</label>
                                <input id="location" type="text" placeholder="Location" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" type="text" placeholder="+91 8987788899" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder={userDetail?.email || 'k2k.@example.com'} className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="web">Employee Id</label>
                                <input id="web" type="text" placeholder={userDetail?._id || 'Enter Employee Id'} className="form-input" />
                            </div>
                                    <div>
                                        <label className="inline-flex cursor-pointer">
                                            <input type="checkbox" className="form-checkbox" />
                                            <span className="text-white-dark relative checked:bg-none">Make this my default address</span>
                                        </label>
                                    </div>
                                    <div className="sm:col-span-2 mt-3">
                                        <button type="button" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                       
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'payment-details' ? (
                        <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">User Permissions</h5>
                                    <p>
                                        Manage the permissions for individual users. Select or deselect the permissions you want to grant.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <form>
                                        <div className="mb-5">
                                            <h6 className="font-semibold text-base mb-3">General Permissions</h6>
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id="selectAll"
                                                    className="form-checkbox cursor-pointer"
                                                    onChange={toggleAllPermissions}
                                                />
                                                <label htmlFor="selectAll" className="ml-3 text-sm">Select All</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="createWorkOrder" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="createWorkOrder" className="ml-3 text-sm">Create Work Order</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="approveWorkOrder" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="approveWorkOrder" className="ml-3 text-sm">Approval of Work Order</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="productionPlanning" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="productionPlanning" className="ml-3 text-sm">Daily Production Report</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="dispatch" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="dispatch" className="ml-3 text-sm">Dispatch</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="operator" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="operator" className="ml-3 text-sm">Operator</label>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <input type="checkbox" id="packing" className="form-checkbox cursor-pointer" />
                                                <label htmlFor="packing" className="ml-3 text-sm">Packing</label>
                                            </div>
                                        </div>
            
                                        <button type="button" className="btn btn-primary" onClick={savePermissions}>
                                            Save Permissions
                                        </button>
                                    </form>
                                </div>
                            </div>
            
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">User Information</h5>
                                    <p>
                                        Displaying the current user's basic information.
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Full Name:
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">
                                               {userDetail.fullName || "Employee name"}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Email:
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">
                                                {userDetail.email || "k2k@gmail.com"}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start justify-between py-3">
                                            <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">
                                                Role:
                                                <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1">
                                                   Admin
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-dark">Edit User Information</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
              
                {tabs === 'danger-zone' ? (
                    <div className="switch">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Deactivate Account</h5>
                                <p>You will not be able to receive messages, notifications for up to 24 hours.</p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox7" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                            </div>
                            <div className="panel space-y-5">
                                <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                                <p>Once you delete the account, there is no going back. Please be certain.</p>
                                <button className="btn btn-danger btn-delete-account">Delete my account</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
