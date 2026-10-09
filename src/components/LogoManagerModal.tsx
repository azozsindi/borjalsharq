import React, { useState, useRef, useEffect } from 'react';
import { 
  Image, 
  Upload, 
  Check, 
  RefreshCw, 
  X, 
  AlertCircle, 
  Sparkles, 
  CloudCheck, 
  Link as LinkIcon,
  ShieldCheck,
  ShieldAlert,
  LogIn,
  LogOut
} from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { processUploadedLogoFile, saveLogoPermanently, resetLogoToDefault, DEFAULT_LOGO_URL } from '../services/logoService';
import { Logo } from './Logo';

const ADMIN_EMAIL = 'azozsindi23@gmail.com';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl?: string;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({
  isOpen,
  onClose,
  currentLogoUrl
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentLogoUrl || DEFAULT_LOGO_URL);
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentLogoUrl || DEFAULT_LOGO_URL);
      setSaveSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, currentLogoUrl]);

  if (!isOpen) return null;

  const isCurrentAdmin = Boolean(
    currentUser && currentUser.email && currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setErrorMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      setErrorMessage('تعذر تسجيل الدخول بحساب Google: ' + (err.message || 'خطأ غير متوقع'));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('يرجى اختيار ملف صورة صالح (PNG, JPG, SVG, WebP)');
      return;
    }

    try {
      setSelectedFile(file);
      setErrorMessage(null);
      const processed = await processUploadedLogoFile(file);
      setPreviewUrl(processed);
    } catch (err) {
      console.error('File process error:', err);
      setErrorMessage('تعذر قراءة ملف الصورة، يرجى تجربة صورة أخرى');
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleSaveLogo = async () => {
    if (!previewUrl) return;

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await saveLogoPermanently(previewUrl);
      setSaveSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Save logo error:', err);
      const isPermission = err?.code?.includes('permission-denied') || err?.message?.includes('permission');
      if (isPermission) {
        setErrorMessage('تم رفض الحفظ من قواعد الأمان (غير مصرح): يجب تسجيل الدخول بحساب المدير azozsindi23@gmail.com.');
      } else {
        setErrorMessage('تعذر الحفظ في خادم Firebase. تم الحفظ محلياً في متصفحك.');
      }
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    try {
      await resetLogoToDefault();
      setPreviewUrl(DEFAULT_LOGO_URL);
      setSelectedFile(null);
      setUrlInput('');
      setSaveSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Reset error:', err);
      const isPermission = err?.code?.includes('permission-denied') || err?.message?.includes('permission');
      if (isPermission) {
        setErrorMessage('تم رفض الاستعادة: غير مصرح لك بتعديل بيانات المتجر دون تسجيل دخول المدير.');
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#11131a] border border-amber-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden text-right"
        dir="rtl"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#d4af37]">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">تثبيت وتعديل شعار المتجر</h3>
              <p className="text-xs text-slate-400">حفظ الشعار في Cloud Firestore لمشروع borjalsharq-39deb</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Authentication & Security Status */}
        <div className="mt-4 mb-2 p-3 rounded-xl bg-zinc-950/80 border border-white/10 relative z-10 flex items-center justify-between gap-3">
          {currentUser ? (
            isCurrentAdmin ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  المدير المعتمد: <strong>{currentUser.email}</strong> (مصرح له بالكتابة ✓)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-rose-400">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  مسجل بـ {currentUser.email} (غير مصرح كمدير)
                </span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>يتطلب تسجيل دخول المدير لحفظ التعديلات في السحابة</span>
            </div>
          )}

          {currentUser ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-1 shrink-0 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>خروج</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isAuthLoading}
              className="text-[11px] font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 transition-all shadow-sm disabled:opacity-50"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isAuthLoading ? 'جاري الاتصال...' : 'دخول بحساب Google'}</span>
            </button>
          )}
        </div>

        {/* Preview Area */}
        <div className="my-5 relative z-10">
          <label className="block text-xs font-semibold text-slate-300 mb-2">معاينة الشعار الحالي:</label>
          <div className="flex items-center justify-center min-h-[120px] p-4 bg-[#0a0b0e] border border-white/10 rounded-xl">
            {previewUrl && previewUrl !== DEFAULT_LOGO_URL && previewUrl !== '/logo.svg' ? (
              <img
                src={previewUrl}
                alt="معاينة الشعار"
                className="max-h-24 max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                onError={() => {
                  setErrorMessage('تعذر تحميل معاينة هذا الشعار، يرجى التأكد من الرابط أو الملف');
                }}
              />
            ) : (
              <Logo size="md" />
            )}
          </div>
        </div>

        {/* Tabs for choosing method */}
        <div className="flex items-center gap-2 p-1 bg-[#171922] rounded-xl mb-4 relative z-10 border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-[#c5a059] text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>رفع ملف من جهازك</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'url'
                ? 'bg-[#c5a059] text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>رابط صورة مباشر</span>
          </button>
        </div>

        {/* Tab 1: Upload from Device */}
        {activeTab === 'upload' && (
          <div className="mb-5 relative z-10">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-5 px-4 border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {selectedFile ? `الملف المختار: ${selectedFile.name}` : 'اضغط لاختيار صورة الشعار من الجوال أو الكمبيوتر'}
              </span>
              <span className="text-[11px] text-slate-400">
                يدعم صيغ PNG, JPG, WebP, SVG مع ضغط ذكي تلقائي
              </span>
            </button>
          </div>
        )}

        {/* Tab 2: Direct Image URL */}
        {activeTab === 'url' && (
          <div className="mb-5 relative z-10 space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/logo.png"
                dir="ltr"
                className="flex-1 bg-[#0a0b0e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 text-xs font-semibold bg-[#202330] hover:bg-[#2a2e3f] text-slate-200 rounded-xl transition-colors shrink-0"
              >
                تطبيق
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              أدخل رابط صورة مباشر بصيغة png أو jpg أو svg
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success message */}
        {saveSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>تم حفظ وتثبيت الشعار بنجاح في Firebase! سيظهر الآن على جميع الأجهزة والرابط المنشور.</span>
          </div>
        )}

        {/* Explanatory note */}
        <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
          <p className="flex items-center gap-1.5 text-amber-300/90 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مزامنة سحابية دائمة:</span>
          </p>
          يتم حفظ الشعار مباشرة في قاعدة بيانات <strong className="text-white">borjalsharq</strong> على Cloud Firestore، لذلك سيظهر فوراً على الرابط المنشور <code className="text-[#e2c174] dir-ltr inline-block">borjalsharq.web.app</code> ولجميع الزوار على مختلف الهواتف والشاشات.
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 relative z-10">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
            title="إعادة الشعار إلى الشعار الملكي المذهب الافتراضي"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>استعادة الشعار المذهب</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#191b24] hover:bg-[#222533] rounded-xl transition-colors disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSaveLogo}
              disabled={isSaving || saveSuccess}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-[#c5a059] hover:bg-[#d4af37] rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري الحفظ في Firebase...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تم التثبيت!</span>
                </>
              ) : (
                <>
                  <CloudCheck className="w-3.5 h-3.5" />
                  <span>حفظ وتثبيت الشعار</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
