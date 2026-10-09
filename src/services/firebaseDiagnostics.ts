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
    // Step 1: Read Test (Public setting document)
    const siteDocRef = doc(db, 'settings', 'site');
    const snap = await getDoc(siteDocRef);
    const latencyMs = Date.now() - startTime;

    // Step 2: Write Probe (Verifies whether current session has admin write permission)
    let canWrite = false;
    try {
      const testDocRef = doc(db, 'settings', 'site_health_check');
      await setDoc(testDocRef, {
        lastTested: new Date().toISOString(),
        source: 'borjalsharq_diagnostic',
        status: 'active'
      }, { merge: true });
      canWrite = true;
    } catch {
      canWrite = false;
    }

    if (canWrite) {
      return {
        success: true,
        code: 'CONNECTED',
        message: 'تم الاتصال بنجاح مع صلاحية كاملة (قراءة + كتابة للإدارة)!',
        projectId,
        database,
        latencyMs,
        testedAt,
        details: 'قاعدة البيانات متصلة وجلسة الإدارة مصرح لها بالكتابة وتحديث البيانات.'
      };
    } else {
      return {
        success: true,
        code: 'CONNECTED',
        message: 'الاتصال يعمل وقراءة البيانات نشطة (قواعد الأمان تحمي الكتابة لغير المدير).',
        projectId,
        database,
        latencyMs,
        testedAt,
        details: 'الزوار يستطيعون قراءة محتوى الموقع والشعار بسرعة، بينما تمنع قواعد الأمان أي تعديل غير مصرح به.'
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
