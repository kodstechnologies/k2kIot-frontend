import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { useForm } from 'react-hook-form';
import { login } from '../../api/auth';
import { setAuth } from '../../store/auth/AuthSlice';
import { toast } from 'react-toastify';

const LoginBoxed = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm();
    const dispatch = useDispatch();

    // Static login data
    const STATIC_USER = {
        email: 'admin@gmail.com',
        password: 'password123',
        fullName: 'Test User',
        phoneNumber: '1234567890',
        userType: 'Admin',
    };

    const handleLogin = async (data: any) => {
        try {
            // Simulate login check
            if (data.email === STATIC_USER.email && data.password === STATIC_USER.password) {
                dispatch(
                    setAuth({
                        _id: 'static-id',
                        phoneNumber: STATIC_USER.phoneNumber,
                        email: STATIC_USER.email,
                        fullName: STATIC_USER.fullName,
                        userType: STATIC_USER.userType,
                        isAuthenticated: true,
                    }),
                );
                submitForm();
                toast.success('Login successful');
                console.log('User authenticated successfully!');
                // navigate('/'); Uncomment if using navigation
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            setError('email', { type: 'manual', message: 'Invalid email or password' });
            toast.error(err.message || 'An unexpected error occurred.');
        }
    };
      
      
    // const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Page'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div>
        <div className="absolute inset-0">
            <img src="/assets/images/auth/3234129.jpg" alt="Background" className="h-full w-full object-cover" />
        </div>
    
        <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/assets/images/auth/coming-soon-object1.png" alt="Decorative" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="Decorative" className="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="Decorative" className="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="Decorative" className="absolute bottom-0 end-[28%]" />
    
            <div className="relative w-full max-w-[870px] rounded-md p-2 bg-[linear-gradient(45deg,#E9F7EF_0%,rgba(233,247,239,0.5)_50%,rgba(233,247,239,0)_100%)] dark:bg-[linear-gradient(45deg,#0F3D3E_0%,rgba(15,61,62,0.5)_50%,rgba(15,61,62,0)_100%)]">
                <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                    {/* Logo Image */}
                    <div className="flex justify-center mb-10">
                        <img src="/k2k_iot_logo.jfif" alt="Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                    </div>
    
                    <div className="mx-auto w-full max-w-[440px]">
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-success md:text-4xl">Login Page</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">
                                Enter your email and password to login
                            </p>
                        </div>
    
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(handleLogin)}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        {/* <input id="Email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" /> */}

                                        <input
                                id="email"
                                type="email"
                                placeholder="Enter Email"
                                className="form-input w-full ps-10 placeholder:text-gray-400 border border-gray-300 rounded-md py-2"
                                {...register('email', { required: 'Email is required' })}
                            />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                        {/* {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )} */}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        {/* <input id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" /> */}
                                        <input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                className="form-input w-full ps-10 placeholder:text-gray-400 border border-gray-300 rounded-md py-2"
                                {...register('password', { required: 'Password is required' })}
                            />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                        {/* {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )} */}
                                    </div>
                                </div>
                                {/* <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Keep me signed in!</span>
                                    </label>
                                </div> */}
                                {/* <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"> */}
                                <button
    type="submit"
    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] 
        bg-[linear-gradient(135deg, #A8FF78 0%, #78FFD6 25%, #6DD5FA 75%, #3AAFFA 100%)] 
        hover:bg-[linear-gradient(135deg, #78FFD6 0%, #6DD5FA 50%, #3AAFFA 100%, #A8FF78 75%)] 
        text-white"
>
                                    Sign in111
                                </button>
                            </form>
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
