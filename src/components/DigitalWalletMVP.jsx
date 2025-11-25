import React, { useState } from 'react';
import {
  Smartphone,
  Shield,
  CheckCircle,
  QrCode,
  User,
  Lock,
  FileText,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function DigitalWalletMVP() {
  const [activeView, setActiveView] = useState('home');
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  // current displayed user record (can be replaced from mock dataset)
  const [currentUserData, setCurrentUserData] = useState({
    name: 'أحمد محمد العتيبي',
    idNumber: '1088123456',
    dateOfBirth: '1990/05/15',
    nationality: 'سعودي',
    gender: 'ذكر',
    issueDate: '2020/01/01',
    expiryDate: '2030/01/01',
    photo: '👤',
  });

  // mock dataset state (public/data/absher_mock.json)
  const [mockRecords, setMockRecords] = useState(null);
  const [showDatasetBrowser, setShowDatasetBrowser] = useState(false);

  const availableData = [
    { id: 'name', label: 'الاسم', value: currentUserData.name },
    { id: 'id', label: 'رقم الهوية', value: currentUserData.idNumber },
    { id: 'dob', label: 'تاريخ الميلاد', value: currentUserData.dateOfBirth },
    { id: 'nationality', label: 'الجنسية', value: currentUserData.nationality },
  ];

  const handleBiometricAuth = () => {
    setShowBiometric(true);
    setTimeout(() => {
      setUserAuthenticated(true);
      setShowBiometric(false);
      setActiveView('wallet');
    }, 1200);
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
    }, 2000);
  };

  const handleVerify = () => {
    setVerificationResult('جاري التحقق...');
    setTimeout(() => {
      setVerificationResult('valid');
    }, 1500);
  };

  const loadMockDataset = async () => {
    try {
      const res = await fetch('/data/absher_mock.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch dataset');
      const data = await res.json();
      setMockRecords(data);
      setShowDatasetBrowser(true);
    } catch (err) {
      console.error('loadMockDataset error', err);
      alert('فشل تحميل مجموعة البيانات التجريبية. تأكد من وجود public/data/absher_mock.json');
    }
  };

  const importRecord = (record) => {
    setCurrentUserData({
      name: record.name,
      idNumber: record.national_id,
      dateOfBirth: record.dob,
      nationality: record.nationality,
      gender: record.gender,
      issueDate: record.issueDate,
      expiryDate: record.expiryDate,
      photo: record.photoEmoji || '👤',
    });
    setShowDatasetBrowser(false);
    setActiveView('wallet');
    setUserAuthenticated(true);
  };

  const HomeView = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-absher-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-absher-700">المحفظة الرقمية</h1>
        <p className="text-absher-600">هويتك الوطنية في هاتفك — سريع وآمن</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={handleBiometricAuth}
          className="bg-absher-500 text-white p-6 rounded-xl shadow-lg hover:bg-absher-600 transition flex flex-col items-center space-y-2"
        >
          <Smartphone className="w-8 h-8" />
          <span className="font-bold">محفظتي</span>
        </button>

        <button
          onClick={() => setActiveView('verify')}
          className="bg-sky-600 text-white p-6 rounded-xl shadow-lg hover:bg-sky-700 transition flex flex-col items-center space-y-2"
        >
          <CheckCircle className="w-8 h-8" />
          <span className="font-bold">التحقق</span>
        </button>
      </div>

      <div className="w-full max-w-md mt-4">
        <button
          onClick={loadMockDataset}
          className="w-full bg-yellow-500 text-white p-4 rounded-xl shadow-md hover:bg-yellow-600 transition font-bold"
        >
          استخدام بيانات تجريبية (Mock dataset)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-absher-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-absher-600" />
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">هويتي الوطنية</h2>
        <button onClick={() => setActiveView('home')} className="text-gray-600 hover:text-gray-800">
          ←رجوع
        </button>
      </div>

      <div className="bg-gradient-to-br from-absher-500 to-absher-700 rounded-3xl p-6 text-white shadow-2xl border border-white/5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs opacity-80 mb-1">المملكة العربية السعودية</p>
            <p className="text-lg font-bold">الهوية الوطنية الرقمية</p>
          </div>
          <div className="text-5xl">{currentUserData.photo}</div>
        </div>

        <div className="space-y-2 mt-6">
          <div>
            <p className="text-xs opacity-80">الاسم</p>
            <p className="font-bold text-lg">{currentUserData.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs opacity-80">رقم الهوية</p>
              <p className="font-bold">{currentUserData.idNumber}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">تاريخ الميلاد</p>
              <p className="font-bold">{currentUserData.dateOfBirth}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Shield className="w-4 h-4" />
            <span className="text-xs">موثقة ومشفرة</span>
          </div>
          <span className="text-xs opacity-80">صالحة حتى {currentUserData.expiryDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveView('share')}
          className="bg-sky-600 text-white p-4 rounded-xl hover:bg-sky-700 transition flex items-center justify-center space-x-2 space-x-reverse"
        >
          <QrCode className="w-5 h-5" />
          <span>مشاركة البيانات</span>
        </button>
        <button
          onClick={() => setActiveView('details')}
          className="bg-gray-700 text-white p-4 rounded-xl hover:bg-gray-800 transition flex items-center justify-center space-x-2 space-x-reverse"
        >
          <FileText className="w-5 h-5" />
          <span>التفاصيل الكاملة</span>
        </button>
      </div>

      <div className="bg-absher-50 border border-absher-100 rounded-xl p-4 flex items-start space-x-3 space-x-reverse">
        <Shield className="w-5 h-5 text-absher-600 mt-0.5" />
        <div className="flex-1">
            <p className="font-semibold text-absher-700 mb-1">محمية بالكامل</p>
          <p className="text-sm text-absher-600">بياناتك مشفرة ومحفوظة بشكل آمن في جهازك فقط</p>
        </div>
      </div>
    </div>
  );

  const ShareView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">مشاركة البيانات</h2>
        <button
          onClick={() => {
            setActiveView('wallet');
            setSelectedData([]);
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          ←رجوع
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3 space-x-reverse">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-yellow-900 mb-1">اختر البيانات المراد مشاركتها</p>
          <p className="text-sm text-yellow-700">شارك فقط المعلومات الضرورية</p>
        </div>
      </div>

      <div className="space-y-3">
        {availableData.map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
              selectedData.includes(item.id) ? 'border-absher-600 bg-absher-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="checkbox"
                checked={selectedData.includes(item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedData([...selectedData, item.id]);
                  } else {
                    setSelectedData(selectedData.filter((id) => id !== item.id));
                  }
                }}
                className="w-5 h-5 text-absher-600"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-600">{item.value}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {showQR && (
        <div className="bg-white border-4 border-absher-600 rounded-2xl p-8 text-center">
          <div className="w-48 h-48 bg-gray-900 rounded-xl mx-auto mb-4 flex items-center justify-center text-white">
            <QrCode className="w-32 h-32" />
          </div>
          <p className="font-bold text-absher-600 animate-pulse">جاري المشاركة...</p>
        </div>
      )}

      <button
        onClick={handleShare}
        disabled={showQR}
        className="w-full bg-absher-500 text-white p-4 rounded-xl hover:bg-absher-600 transition font-bold disabled:bg-gray-400"
      >
        {showQR ? 'جاري المشاركة...' : 'إنشاء رمز QR للمشاركة'}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>يمكن مشاركة البيانات أيضاً عبر:</p>
        <div className="flex justify-center space-x-4 space-x-reverse mt-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">NFC</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Bluetooth</span>
        </div>
      </div>
    </div>
  );

  const DetailsView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">التفاصيل الكاملة</h2>
        <button onClick={() => setActiveView('wallet')} className="text-gray-600 hover:text-gray-800">
          ←رجوع
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">الاسم الكامل</p>
          <p className="font-bold text-lg">{currentUserData.name}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">رقم الهوية</p>
          <p className="font-bold text-lg">{currentUserData.idNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">تاريخ الميلاد</p>
            <p className="font-bold">{currentUserData.dateOfBirth}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">الجنسية</p>
            <p className="font-bold">{currentUserData.nationality}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">الجنس</p>
            <p className="font-bold">{currentUserData.gender}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">تاريخ الإصدار</p>
            <p className="font-bold">{currentUserData.issueDate}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">تاريخ الانتهاء</p>
          <p className="font-bold">{currentUserData.expiryDate}</p>
        </div>
      </div>

      <div className="bg-absher-50 border border-absher-100 rounded-xl p-4">
        <div className="flex items-center space-x-2 space-x-reverse mb-2">
          <CheckCircle className="w-5 h-5 text-absher-600" />
          <p className="font-semibold text-absher-900">الحالة: صالحة</p>
        </div>
        <p className="text-sm text-absher-700">تم التحقق بواسطة وزارة الداخلية</p>
        <p className="text-xs text-absher-600 mt-2">آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</p>
      </div>
    </div>
  );

  const VerifyView = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">التحقق من الهوية</h2>
        <button
          onClick={() => {
            setActiveView('home');
            setVerificationResult(null);
          }}
          className="text-gray-600 hover:text-gray-800"
        >
          ←رجوع
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3 space-x-reverse">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-blue-900 mb-1">للموظفين المخولين فقط</p>
          <p className="text-sm text-blue-700">هذه الأداة للتحقق من صحة الهوية الرقمية</p>
        </div>
      </div>

      {!verificationResult && (
        <>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">امسح رمز QR من هوية المواطن</p>
            <p className="text-sm text-gray-500">أو استخدم NFC</p>
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition font-bold"
          >
            بدء التحقق (Demo)
          </button>
        </>
      )}

      {verificationResult === 'جاري التحقق...' && (
        <div className="bg-white border border-gray-300 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-gray-800">جاري التحقق من الهوية...</p>
        </div>
      )}

      {verificationResult === 'valid' && (
        <div className="space-y-4">
          <div className="bg-absher-50 border-2 border-absher-600 rounded-2xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-absher-600 mx-auto mb-4" />
            <p className="font-bold text-2xl text-absher-900 mb-2">✓ هوية صالحة</p>
            <p className="text-absher-700">تم التحقق بنجاح من صحة الهوية</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">البيانات المشاركة:</h3>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">الاسم:</span>
                <span className="font-bold">{currentUserData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">رقم الهوية:</span>
                <span className="font-bold">{currentUserData.idNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">الجنسية:</span>
                <span className="font-bold">{currentUserData.nationality}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mt-4">
              <p className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline ml-1" />
                تم التحقق: {new Date().toLocaleString('ar-SA')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setVerificationResult(null)}
            className="w-full bg-gray-600 text-white p-4 rounded-xl hover:bg-gray-700 transition font-bold"
          >
            تحقق من هوية أخرى
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between text-xs">
          <span>9:41</span>
          <span>📶 🔋</span>
        </div>

        <div className="pb-20">
          {showDatasetBrowser && mockRecords && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
              <div className="bg-white rounded-3xl w-full max-w-3xl p-6 shadow-2xl overflow-auto max-h-[80vh]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Dataset — سجلات تجريبية</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button onClick={() => setShowDatasetBrowser(false)} className="text-sm text-gray-500 hover:text-gray-800">إغلاق</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockRecords.map((r) => (
                    <div key={r.id} className="border rounded-xl p-4 bg-gray-50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">{r.photoEmoji || '👤'}</div>
                            <div className="text-sm">
                              <div className="font-semibold">{r.name}</div>
                              <div className="text-xs text-gray-500">{r.national_id}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">{new Date(r.lastChecked).toLocaleString('ar-SA')}</div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1">
                          <div>تاريخ الميلاد: {r.dob}</div>
                          <div>الجنسية: {r.nationality}</div>
                          <div>صلاحية: {r.expiryDate}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <button onClick={() => importRecord(r)} className="bg-absher-500 text-white px-3 py-2 rounded-lg hover:bg-absher-600 transition">استيراد</button>
                        <div className="text-xs text-gray-500">مصادقة: {r.verifiedBy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showBiometric && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4">
                <div className="w-20 h-20 bg-absher-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-absher-600 animate-pulse" />
                </div>
                <p className="font-bold text-xl mb-2">جاري المصادقة</p>
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

        {userAuthenticated && activeView !== 'home' && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveView('wallet')}
                className={`flex flex-col items-center space-y-1 ${
                  activeView === 'wallet' ? 'text-absher-600' : 'text-gray-400'
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs">محفظتي</span>
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="flex flex-col items-center space-y-1 text-gray-400"
              >
                <User className="w-6 h-6" />
                <span className="text-xs">الرئيسية</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
