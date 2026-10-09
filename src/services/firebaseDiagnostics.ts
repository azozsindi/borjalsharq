import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, firebaseConfig } from '../firebase';

export interface DiagnosticsResult {
  success: boolean;
  code: 'CONNECTED' | 'PERMISSION_DENIED' | 'OFFLINE' | 'UNKNOWN';
  message: string;
  projectId: string;
  database: string;
  details?: string;
  latencyMs?: number;
  testedAt: string;
}

export async function runFirebaseDiagnostics(): Promise<DiagnosticsResult> {
  const startTime = Date.now();
  const testedAt = new Date().toLocaleTimeString('ar-SA');
  const projectId = firebaseConfig.projectId;
  const database = '(default)';

  try {
    const testDocRef = doc(db, 'settings', 'site_health_check');
    
    // Step 1: Attempt Write
    await setDoc(testDocRef, {
      lastTested: new Date().toISOString(),
      source: 'borjalsharq_diagnostic',
      app: 'برج الشارقة لزينة السيارات',
      status: 'active'
    }, { merge: true });

    // Step 2: Attempt Read
    const snap = await getDoc(testDocRef);
    const latencyMs = Date.now() - startTime;

    if (snap.exists()) {
      return {
        success: true,
        code: 'CONNECTED',
        message: 'تم الاتصال وقراءة/كتابة البيانات في قاعدة بيانات borjalsharq بنجاح تام!',
        projectId,
        database,
        latencyMs,
        testedAt,
        details: 'قاعدة البيانات متصلة وتستقبل التحديثات الفورية بشكل سليم 100%.'
      };
    } else {
      return {
        success: true,
        code: 'CONNECTED',
        message: 'الاتصال يعمل ولكن المستند لم يُرجع بيانات.',
        projectId,
        database,
        latencyMs,
        testedAt
      };
    }
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    const errMsg = error?.message || String(error);
    const errCode = error?.code || '';

    if (errCode.includes('permission-denied') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('permission')) {
      return {
        success: false,
        code: 'PERMISSION_DENIED',
        message: 'الاتصال بمشروع borjalsharq واصل، لكن قواعد الأمان (Firestore Rules) ترفض الإذن (Permission Denied).',
        projectId,
        database,
        latencyMs,
        testedAt,
        details: 'هذا يعني أن التطبيق مربوط بالمشروع الصحيح بالفعل، لكن صفحة القواعد (Rules) في كونسول فايربيس مقفلة وتمنع القراءة أو الكتابة.'
      };
    }

    if (errMsg.includes('offline') || errCode.includes('unavailable')) {
      return {
        success: false,
        code: 'OFFLINE',
        message: 'تعذر الوصول إلى خوادم فايربيس (الجهاز في وضع أوفلاين أو القواعد تمنع الوصول).',
        projectId,
        database,
        latencyMs,
        testedAt,
        details: errMsg
      };
    }

    return {
      success: false,
      code: 'UNKNOWN',
      message: 'حدث خطأ أثناء فحص الاتصال: ' + (errCode || errMsg),
      projectId,
      database,
      latencyMs,
      testedAt,
      details: errMsg
    };
  }
}
