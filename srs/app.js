import React, { useState, useEffect } from ‘react’;
import { Smartphone, Shield, CheckCircle, QrCode, User, Lock, Eye, EyeOff, FileText, Clock, AlertCircle } from ‘lucide-react’;

export default function DigitalWalletMVP() {
const [activeView, setActiveView] = useState(‘home’);
const [userAuthenticated, setUserAuthenticated] = useState(false);
const [showBiometric, setShowBiometric] = useState(false);
const [selectedData, setSelectedData] = useState([]);
const [verificationMode, setVerificationMode] = useState(false);
const [showQR, setShowQR] = useState(false);
const [verificationResult, setVerificationResult] = useState(null);

// بيانات المستخدم التجريبية
const userData = {
name: “أحمد محمد العتيبي”,
idNumber: “1088123456”,
dateOfBirth: “1990/05/15”,
nationality: “سعودي”,
gender: “ذكر”,
issueDate: “2020/01/01”,
expiryDate: “2030/01/01”,
photo: “👤”
};

const availableData = [
{ id: ‘name’, label: ‘الاسم’, value: userData.name },
{ id: ‘id’, label: ‘رقم الهوية’, value: userData.idNumber },
{ id: ‘dob’, label: ‘تاريخ الميلاد’, value: userData.dateOfBirth },
{ id: ‘nationality’, label: ‘الجنسية’, value: userData.nationality },
];

const handleBiometricAuth = () => {
setShowBiometric(true);
setTimeout(() => {
setUserAuthenticated(true);
setShowBiometric(false);
setActiveView(‘wallet’);
}, 2000);
};

const handleShare = () => {
if (selectedData.length === 0) {
alert(‘الرجاء اختيار البيانات المراد مشاركتها’);
return;
}
setShowQR(true);
setTimeout(() => {
setShowQR(false);
alert(‘تمت المشاركة بنجاح! ✓’);
setSelectedData([]);
}, 3000);
};

const handleVerify = () => {
setVerificationResult(‘جاري التحقق…’);
setTimeout(() => {
setVerificationResult(‘valid’);
}, 2000);
};

const HomeView = () => (
<div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
<div className="text-center space-y-4">
<div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto">
<Shield className="w-12 h-12 text-white" />
</div>
<h1 className="text-3xl font-bold text-gray-800">المحفظة الرقمية</h1>
<p className="text-gray-600">هويتك الوطنية في هاتفك</p>
</div>


  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
    <button
      onClick={handleBiometricAuth}
      className="bg-green-600 text-white p-6 rounded-xl shadow-lg hover:bg-green-700 transition flex flex-col items-center space-y-2"
    >
      <Smartphone className="w-8 h-8" />
      <span className="font-bold">محفظتي</span>
    </button>

    <button
      onClick={() => {
        setVerificationMode(true);
        setActiveView('verify');
      }}
      className="bg-blue-600 text-white p-6 rounded-xl shadow-lg hover:bg-blue-700 transition flex flex-col items-center space-y-2"
    >
      <CheckCircle className="w-8 h-8" />
      <span className="font-bold">التحقق</span>
    </button>
  </div>

  <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-8">
    <div className="text-center space-y-2">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Lock className="w-6 h-6 text-green-600" />
      </div>
      <p className="text-xs text-gray-600">آمن ومشفر</p>
    </div>
    <div className="text-center space-y-2">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <QrCode className="w-6 h-6 text-blue-600" />
      </div>
      <p className="text-xs text-gray-600">يعمل بدون إنترنت</p>
    </div>
    <div className="text-center space-y-2">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
        <Shield className="w-6 h-6 text-purple-600" />
      </div>
      <p className="text-xs text-gray-600">خصوصية كاملة</p>
    </div>
  </div>
</div>


);

const WalletView = () => (
<div className="p-6 space-y-6">
