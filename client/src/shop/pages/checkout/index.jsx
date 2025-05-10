import React, { useState, useRef, useEffect, useContext } from 'react';
import Axios from 'axios'
import { ShopContext } from '../../context/shop-context';
import { AuthContext } from '../../context/auth-context';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { shopConfig } from '../../../config'
import { Toast } from 'primereact/toast';
import { CheckoutForm } from '../../components/checkout-form'
import { VoucherForm } from '../../components/voucher-form'
import { Header } from '../../components/header';
import './checkout.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';

const Checkout = ({props}) => {

    return (
        <>
            <Header />
            <div className="card flex justify-content-center">
                <div className="stepper-voucher-container">
                    <div className="stepper-col">
                        <CheckoutForm />
                    </div>
                    <div className="voucher-col">
                        <VoucherForm />
                    </div>
                </div>
            </div>
        </>
    );

};

export default Checkout;
