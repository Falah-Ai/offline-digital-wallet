import React, { useState } from 'react';
import { Smartphone, Shield, CheckCircle, QrCode, User, FileText, Clock, AlertCircle, ChevronRight, Home } from 'lucide-react';

export default function DigitalWalletMVP() {
  const [activeView, setActiveView] = useState('home');
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const userData = {
    name: "أحمد محمد العتيبي",
    idNumber: "1088123456",
    dateOfBirth: "1990/05/15",
    nationality: "سعودي",
    gender: "ذكر",
    issueDate: "2020/01/01",
    expiryDate: "2030/01/01",
    photo: "👤"
  };

  const availableData = [
    { id: 'name', label: 'الاسم', value: userData.name },
    { id: 'id', label: 'رقم الهوية', value: userData.idNumber },
    { id: 'dob', label: 'تاريخ الميلاد', value: userData.dateOfBirth },
    { id: 'nationality', label: 'الجنسية', value: userData.nationality },
  ];

  const handleBiometricAuth = () => {
    setShowBiometric(true);
    setTimeout(() => {
      setUserAuthenticated(true);
      setShowBiometric(false);
      setActiveView('wallet');
    }, 2000);
  };

  const handleShare = () => {
    if (selectedData.length === 0) {
      alert('الرجاء اختيار البيانات المراد مشاركتها');
      return;
    }
    setShowQR(true);
    setTimeout(() => {
      setShowQR(false);
      alert('تمت المشاركة بنجاح! ✓');
      setSelectedData([]);
    }, 3000);
  };

  const handleVerify = () => {
    setVerificationResult('جاري التحقق…');
    setTimeout(() => {
      setVerificationResult('valid');
    }, 2000);
  };

  const HomeView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-white">
      <div className="text-center space-y-6 mb-12">
        <div className="w-28 h-28 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
          <Shield className="w-14 h-14 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المحفظة الرقمية</h1>
          <p className="text-gray-600">هويتك الوطنية في هاتفك</p>
          <div className="mt-2 text-sm text-emerald-700 font-medium">وزارة الداخلية</div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={handleBiometricAuth}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl shadow-lg transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold">الدخول إلى محفظتي</span>
          </div>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            setActiveView('verify');
          }}
          className="w-full bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 p-5 rounded-2xl shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-lg font-bold">التحقق من هوية</span>
          </div>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-md mt-12">
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <Shield className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-xs text-gray-600 font-medium">آمن ومشفر</p>
        </div>
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-xs text-gray-600 font-medium">بدون إنترنت</p>
        </div>
        <div className="text-center">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
            <User className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-xs text-gray-600 font-medium">خصوصية كاملة</p>
        </div>
      </div>
    </div>
  );

  const WalletView = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">هويتي الوطنية</h2>
        <button
          onClick={() => setActiveView('home')}
          className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-2 space-x-reverse"
        >
          <span>رجوع</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-1">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="emblem" className="w-8 h-8" />
              <div className="text-xs opacity-90">المملكة العربية السعودية</div>
            </div>
            <p className="text-lg font-bold">الهوية الوطنية الرقمية</p>
          </div>
          <div className="text-6xl opacity-90">{userData.photo}</div>
        </div>
        
        <div className="space-y-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div>
            <p className="text-xs opacity-80 mb-1">الاسم</p>
            <p className="font-bold text-xl">{userData.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs opacity-80 mb-1">رقم الهوية</p>
              <p className="font-bold text-lg">{userData.idNumber}</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">تاريخ الميلاد</p>
              <p className="font-bold text-lg">{userData.dateOfBirth}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-2 space-x-reverse text-sm">
            <Shield className="w-4 h-4" />
            <span>موثقة ومشفرة</span>
          </div>
          <span className="text-xs opacity-80">صالحة حتى {userData.expiryDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveView('share')}
          className="bg-white border-2 border-emerald-600 text-emerald-700 p-4 rounded-2xl hover:bg-emerald-50 transition flex flex-col items-center space-y-2 shadow-md"
        >
          <QrCode className="w-6 h-6" />
          <span className="font-bold">مشاركة البيانات</span>
        </button>
        <button
          onClick={() => setActiveView('details')}
          className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition flex flex-col items-center space-y-2 shadow-md"
        >
          <FileText className="w-6 h-6" />
          <span className="font-bold">التفاصيل الكاملة</span>
        </button>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
        <Shield className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-emerald-900 mb-1">محمية بالكامل</p>
          <p className="text-sm text-emerald-700">بياناتك مشفرة ومحفوظة بشكل آمن في جهازك فقط</p>
        </div>
      </div>
    </div>
  );

  const ShareView = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">مشاركة البيانات</h2>
        <button
          onClick={() => {
            setActiveView('wallet');
            setSelectedData([]);
          }}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          رجوع
        </button>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-amber-900 mb-1">اختر البيانات المراد مشاركتها</p>
          <p className="text-sm text-amber-700">شارك فقط المعلومات الضرورية</p>
        </div>
      </div>

      <div className="space-y-3">
        {availableData.map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
              selectedData.includes(item.id)
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse flex-1">
              <input
                type="checkbox"
                checked={selectedData.includes(item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedData([...selectedData, item.id]);
                  } else {
                    setSelectedData(selectedData.filter(id => id !== item.id));
                  }
                }}
                className="w-5 h-5 text-emerald-600 rounded"
              />
              <div>
                <p className="font-bold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.value}</p>
              </div>
            </div>
            {selectedData.includes(item.id) && (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            )}
          </label>
        ))}
      </div>

      {showQR && (
        <div className="bg-white border-4 border-emerald-600 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-48 h-48 bg-gray-900 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <QrCode className="w-32 h-32 text-white" />
          </div>
          <p className="font-bold text-emerald-600 text-lg animate-pulse">جاري المشاركة...</p>
        </div>
      )}

      <button
        onClick={handleShare}
        disabled={showQR}
        className="w-full bg-emerald-600 text-white p-5 rounded-2xl hover:bg-emerald-700 transition font-bold disabled:bg-gray-400 shadow-lg text-lg"
      >
        {showQR ? 'جاري المشاركة...' : 'إنشاء رمز QR للمشاركة'}
      </button>
    </div>
  );

  const DetailsView = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">التفاصيل الكاملة</h2>
        <button
          onClick={() => setActiveView('wallet')}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          رجوع
        </button>
      </div>

      <div className="space-y-3">
        {[
          { label: 'الاسم الكامل', value: userData.name },
          { label: 'رقم الهوية', value: userData.idNumber },
          { label: 'تاريخ الميلاد', value: userData.dateOfBirth },
          { label: 'الجنسية', value: userData.nationality },
          { label: 'الجنس', value: userData.gender },
          { label: 'تاريخ الإصدار', value: userData.issueDate },
          { label: 'تاريخ الانتهاء', value: userData.expiryDate },
        ].map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-600 mb-1">{item.label}</p>
            <p className="font-bold text-lg text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
        <div className="flex items-center space-x-2 space-x-reverse mb-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="font-bold text-emerald-900">الحالة: صالحة</p>
        </div>
        <p className="text-sm text-emerald-700">تم التحقق بواسطة وزارة الداخلية</p>
        <p className="text-xs text-emerald-600 mt-2">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
      </div>
    </div>
  );

  const VerifyView = () => (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">التحقق من الهوية</h2>
        <button
          onClick={() => {
            setActiveView('home');
            setVerificationResult(null);
          }}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          رجوع
        </button>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-blue-900 mb-1">للموظفين المخولين فقط</p>
          <p className="text-sm text-blue-700">هذه الأداة للتحقق من صحة الهوية الرقمية</p>
        </div>
      </div>

      {!verificationResult && (
        <>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center">
            <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2 font-medium">امسح رمز QR من هوية المواطن</p>
            <p className="text-sm text-gray-500">أو استخدم NFC</p>
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-emerald-600 text-white p-5 rounded-2xl hover:bg-emerald-700 transition font-bold shadow-lg text-lg"
          >
            بدء التحقق (Demo)
          </button>
        </>
      )}

      {verificationResult === 'جاري التحقق...' && (
        <div className="bg-white rounded-3xl p-12 text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-gray-800 text-lg">جاري التحقق من الهوية...</p>
        </div>
      )}

      {verificationResult === 'valid' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border-2 border-emerald-600 rounded-3xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <p className="font-bold text-3xl text-emerald-900 mb-2">✓ هوية صالحة</p>
            <p className="text-emerald-700">تم التحقق بنجاح من صحة الهوية</p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-3 border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-900">البيانات المشاركة:</h3>
            
            {[
              { label: 'الاسم', value: userData.name },
              { label: 'رقم الهوية', value: userData.idNumber },
              { label: 'الجنسية', value: userData.nationality },
            ].map((item, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">{item.label}:</span>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}

            <div className="bg-gray-50 rounded-xl p-3 mt-4">
              <p className="text-sm text-gray-600 flex items-center space-x-2 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>تم التحقق: {new Date().toLocaleString('ar-SA')}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setVerificationResult(null)}
            className="w-full bg-gray-600 text-white p-4 rounded-2xl hover:bg-gray-700 transition font-bold"
          >
            تحقق من هوية أخرى
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* Status Bar */}
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between text-xs font-medium">
          <span>{new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
          <span>📶 🔋 98%</span>
        </div>

        {/* Content */}
        <div className="pb-20 min-h-screen">
          {showBiometric && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-emerald-600 animate-pulse" />
                </div>
                <p className="font-bold text-xl mb-2 text-gray-900">جاري المصادقة</p>
                <p className="text-gray-600">يرجى استخدام بصمة الوجه أو الإصبع</p>
              </div>
            </div>
          )}

          {activeView === 'home' && <HomeView />}
          {activeView === 'wallet' && <WalletView />}
          {activeView === 'share' && <ShareView />}
          {activeView === 'details' && <DetailsView />}
          {activeView === 'verify' && <VerifyView />}
        </div>

        {/* Bottom Navigation */}
        {userAuthenticated && activeView !== 'home' && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveView('wallet')}
                className={`flex flex-col items-center space-y-1 transition ${
                  activeView === 'wallet' ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs font-medium">محفظتي</span>
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="flex flex-col items-center space-y-1 text-gray-400 hover:text-emerald-600 transition"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">الرئيسية</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
