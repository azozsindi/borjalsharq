import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldAlert, 
  Server,
  Zap,
  Activity
} from 'lucide-react';
import { runFirebaseDiagnostics, DiagnosticsResult } from '../services/firebaseDiagnostics';
import { firebaseConfig } from '../firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseHealthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticsResult | null>(null);
  const [copiedRules, setCopiedRules] = useState(false);

  const sampleRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() && (
        (request.auth.token.email != null &&
         request.auth.token.email.lower() == 'azozsindi23@gmail.com' &&
         request.auth.token.email_verified == true) ||
        exists(/databases/$(database)/documents/admins/$(request.auth.uid))
      );
    }

    function isValidId(id) {
      return id is string && id.size() > 0 && id.size() <= 64 && id.matches('^[a-zA-Z0-9_\\-]+$');
    }

    function isValidSiteSettings(data) {
      return data.keys().hasAll(['id']) &&
        data.keys().hasOnly(['id', 'logoUrl', 'updatedAt']) &&
        data.id is string && data.id.size() <= 32 &&
        (!('logoUrl' in data) || (data.logoUrl is string && data.logoUrl.size() <= 600000)) &&
        (!('updatedAt' in data) || (data.updatedAt is string && data.updatedAt.size() <= 50));
    }

    function isValidInquiry(data) {
      return data.keys().hasAll(['id', 'name', 'phone', 'service', 'createdAt']) &&
        data.keys().hasOnly(['id', 'name', 'phone', 'service', 'carModel', 'notes', 'createdAt']) &&
        data.id is string && isValidId(data.id) &&
        data.name is string && data.name.size() >= 2 && data.name.size() <= 100 &&
        data.phone is string && data.phone.size() >= 8 && data.phone.size() <= 20 &&
        data.service is string && data.service.size() <= 100 &&
        (!('carModel' in data) || (data.carModel is string && data.carModel.size() <= 100)) &&
        (!('notes' in data) || (data.notes is string && data.notes.size() <= 500)) &&
        data.createdAt is string && data.createdAt.size() <= 50;
    }

    // إعدادات الموقع والشعار: قراءة فردية للزوار وكتابة للمدير فقط
    match /settings/{settingId} {
      allow get: if true;
      allow list: if isAdmin();
      allow create, update: if isAdmin() && isValidSiteSettings(request.resource.data);
      allow delete: if isAdmin();
    }

    // استفسارات العملاء: إنشاء للزوار وقراءة وتعديل للمدير فقط (حماية البيانات)
    match /inquiries/{inquiryId} {
      allow get, list: if isAdmin();
      allow create: if isValidId(inquiryId) &&
                    isValidInquiry(request.resource.data) &&
                    request.resource.data.id == inquiryId;
      allow update: if isAdmin() &&
                    isValidId(inquiryId) &&
                    isValidInquiry(request.resource.data) &&
                    request.resource.data.id == resource.data.id;
      allow delete: if isAdmin() && isValidId(inquiryId);
    }

    // سجل المديرين
    match /admins/{adminId} {
      allow read, write: if isAdmin();
    }

    // فحص الاتصال
    match /test/{docId} {
      allow get: if true;
      allow list, write: if isAdmin();
    }

    // القاعدة الافتراضية الصارمة: منع أي وصول غير معرف
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`;

  const handleTest = async () => {
    setLoading(true);
    try {
      const res = await runFirebaseDiagnostics();
      setResult(res);
    } catch (err: any) {
      setResult({
        success: false,
        code: 'UNKNOWN',
        message: 'تعذر إجراء الفحص: ' + err.message,
        projectId: firebaseConfig.projectId,
        database: '(default)',
        testedAt: new Date().toLocaleTimeString('ar-SA')
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleTest();
    }
  }, [isOpen]);

  const copyRulesToClipboard = () => {
    navigator.clipboard.writeText(sampleRules);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                فاحص حالة الاتصال بـ Firebase
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  borjalsharq
                </span>
              </h2>
              <p className="text-xs text-zinc-400">التحقق المباشر من مزامنة قاعدة البيانات وقواعد الأمان</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Status Box */}
          <div className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                  مشروع Firebase المستهدف
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white font-mono">{firebaseConfig.projectId}</span>
                  <span className="text-xs text-zinc-500 font-mono">({firebaseConfig.authDomain})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTest}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'جارٍ الفحص...' : 'إعادة الفحص الآن'}
              </button>
            </div>

            {/* Test result status banner */}
            {loading ? (
              <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                <div>
                  <p className="text-sm font-semibold text-white">جارٍ الاتصال بمشروعك في فايربيس...</p>
                  <p className="text-xs text-zinc-400">يتم إرسال طلب تجريبي وقراءة الرد للتأكد من حالة الربط.</p>
                </div>
              </div>
            ) : result ? (
              <div className="mt-4 space-y-3">
                {result.success ? (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-emerald-300">الاتصال سليم ومصرّح 100%!</h4>
                        <p className="text-xs text-emerald-300/80 mt-0.5">{result.message}</p>
                      </div>
                    </div>
                    {result.latencyMs && (
                      <div className="flex items-center gap-4 text-xs text-emerald-400/90 pt-2 border-t border-emerald-500/20">
                        <span className="flex items-center gap-1 font-mono">
                          <Activity className="w-3.5 h-3.5" /> سرعة الاستجابة: {result.latencyMs}ms
                        </span>
                        <span>وقت الفحص: {result.testedAt}</span>
                      </div>
                    )}
                  </div>
                ) : result.code === 'PERMISSION_DENIED' ? (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-amber-300">
                          الربط واصل بنجاح، لكن "قواعد الأمان Rules" تمنع الوصول!
                        </h4>
                        <p className="text-xs text-amber-200/90 leading-relaxed">
                          التطبيق متصل بالفعل بمشروعك <strong className="font-mono text-white">borjalsharq</strong> وخوادم Google ترد، ولكن قاعدة البيانات في كونسول فايربيس ترفض الإذن (<code className="font-mono text-amber-300">PERMISSION_DENIED</code>).
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-rose-300">لم يتم الاتصال:</h4>
                        <p className="text-xs text-rose-200/80 mt-0.5">{result.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Quick Guide to Fix Permission Denied if needed */}
          <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              كيف تتأكد بنفسك في لوحة تحكم Firebase وتفعّل القواعد في دقيقة:
            </h3>

            <ol className="text-xs text-zinc-300 space-y-2.5 list-decimal list-inside pr-1 leading-relaxed">
              <li>
                افتح مشروعك مباشرة بالضغط هنا:{' '}
                <a 
                  href="https://console.firebase.google.com/project/borjalsharq-39deb/firestore/databases/-default-/rules" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  فتح صفحة القواعد (Rules) في كونسول فايربيس
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                تأكد أن القواعد تسمح بالقراءة والكتابة، انسخ هذا الكود بالضغط على زر النسخ:
              </li>
            </ol>

            <div className="relative mt-2">
              <pre className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 font-mono overflow-x-auto max-h-40 leading-snug">
                {sampleRules}
              </pre>
              <button
                type="button"
                onClick={copyRulesToClipboard}
                className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] transition-colors border border-zinc-700"
              >
                {copiedRules ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>نسخ القواعد</span>
                  </>
                )}
              </button>
            </div>

            <ol start={3} className="text-xs text-zinc-300 space-y-1.5 list-decimal list-inside pr-1">
              <li>
                في كونسول فايربيس، الصق الكود واضغط على زر <strong className="text-amber-400 font-medium">Publish (نشر)</strong> بالأعلى.
              </li>
              <li>
                ثم ارجع إلى هذه النافذة واضغط على زر <strong className="text-white font-medium">"إعادة الفحص الآن"</strong> وستظهر لك علامة <span className="text-emerald-400 font-bold">🟢 متصل بنجاح</span> فوراً!
              </li>
            </ol>
          </div>

          {/* Direct verification in Firestore Data tab */}
          <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">مشاهدة البيانات الحية في فايربيس (Data)</p>
                <p className="text-[11px] text-zinc-400">تحقق من المستندات المخزنة مباشرة في جدول Firestore</p>
              </div>
            </div>
            <a
              href="https://console.firebase.google.com/project/borjalsharq-39deb/firestore/databases/-default-/data"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
            >
              <span>فتح تبويب Data</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            معرف التطبيق: {firebaseConfig.appId}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
