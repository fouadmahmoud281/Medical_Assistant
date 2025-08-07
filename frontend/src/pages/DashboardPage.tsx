import { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaHeartbeat, 
  FaChartBar, 
  FaClock, 
  FaUserMd, 
  FaPhone, 
  FaPlus,
  FaEdit,
  FaEye,
  FaSearch,
  FaBell,
  FaStethoscope,
  FaPrescriptionBottleAlt,
  FaAmbulance,
  FaUserInjured
} from 'react-icons/fa';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  condition: string;
  status: 'stable' | 'critical' | 'recovering';
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: number;
}

interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  pendingReports: number;
  emergencyCases: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todayAppointments: 0,
    pendingReports: 0,
    emergencyCases: 0
  });

  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  // Mock data initialization
  useEffect(() => {
    // Simulate API call for dashboard stats
    setStats({
      totalPatients: 1247,
      todayAppointments: 18,
      pendingReports: 7,
      emergencyCases: 3
    });

    // Mock recent patients data
    setRecentPatients([
      {
        id: '1',
        name: 'أحمد محمد علي',
        age: 45,
        gender: 'ذكر',
        phone: '01234567890',
        lastVisit: '2024-01-15',
        condition: 'ضغط الدم المرتفع',
        status: 'stable'
      },
      {
        id: '2',
        name: 'فاطمة حسن',
        age: 32,
        gender: 'أنثى',
        phone: '01098765432',
        lastVisit: '2024-01-14',
        condition: 'السكري',
        status: 'recovering'
      },
      {
        id: '3',
        name: 'محمود عبد الله',
        age: 28,
        gender: 'ذكر',
        phone: '01156789012',
        lastVisit: '2024-01-13',
        condition: 'التهاب المفاصل',
        status: 'critical'
      }
    ]);

    // Mock today's appointments
    setTodayAppointments([
      {
        id: '1',
        patientName: 'سارة أحمد',
        time: '09:00',
        type: 'فحص دوري',
        status: 'scheduled',
        duration: 30
      },
      {
        id: '2',
        patientName: 'علي محمد',
        time: '10:30',
        type: 'استشارة',
        status: 'completed',
        duration: 45
      },
      {
        id: '3',
        patientName: 'نور الدين',
        time: '14:00',
        type: 'متابعة',
        status: 'scheduled',
        duration: 30
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'recovering': return 'text-yellow-600 bg-yellow-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'stable': return 'مستقر';
      case 'critical': return 'حرج';
      case 'recovering': return 'في تحسن';
      case 'scheduled': return 'مجدول';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                <FaUserMd className="text-teal-600 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الطبيب</h1>
                <p className="text-gray-600">مرحباً بك، د. أحمد محمد</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن مريض..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  dir="rtl"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full">
                <FaBell className="text-xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="medical-card">
            <div className="medical-card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المرضى</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalPatients}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-600 text-sm font-medium">+12% من الشهر الماضي</span>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="medical-card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">مواعيد اليوم</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.todayAppointments}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-teal-600 text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-blue-600 text-sm font-medium">3 مواعيد متبقية</span>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="medical-card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">التقارير المعلقة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingReports}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaPrescriptionBottleAlt className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-yellow-600 text-sm font-medium">يتطلب مراجعة</span>
              </div>
            </div>
          </div>

          <div className="medical-card">
            <div className="medical-card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">حالات طارئة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.emergencyCases}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaAmbulance className="text-red-600 text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-red-600 text-sm font-medium">تتطلب اهتمام فوري</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <div className="lg:col-span-2">
            <div className="medical-card">
              <div className="medical-card-header flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaUserInjured className="mr-2 text-teal-600" />
                  المرضى الحديثون
                </h3>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  عرض الكل
                </button>
              </div>
              <div className="medical-card-body">
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <FaUser className="text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.age} سنة • {patient.gender}</p>
                          <p className="text-sm text-gray-500">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {getStatusText(patient.status)}
                        </span>
                        <div className="flex space-x-1 space-x-reverse">
                          <button className="p-1 text-gray-400 hover:text-teal-600">
                            <FaEye />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-teal-600">
                            <FaEdit />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-teal-600">
                            <FaPhone />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div>
            <div className="medical-card">
              <div className="medical-card-header flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaClock className="mr-2 text-teal-600" />
                  مواعيد اليوم
                </h3>
                <button className="text-teal-600 hover:text-teal-700">
                  <FaPlus />
                </button>
              </div>
              <div className="medical-card-body">
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        <span>{appointment.time} ({appointment.duration} دقيقة)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="medical-card mt-6">
              <div className="medical-card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaStethoscope className="mr-2 text-teal-600" />
                  إجراءات سريعة
                </h3>
              </div>
              <div className="medical-card-body">
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-teal-50 hover:bg-teal-100 rounded-lg text-center transition-colors">
                    <FaPlus className="mx-auto text-teal-600 mb-2" />
                    <span className="text-sm font-medium text-teal-700">مريض جديد</span>
                  </button>
                  <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                    <FaCalendarAlt className="mx-auto text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-blue-700">حجز موعد</span>
                  </button>
                  <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                    <FaPrescriptionBottleAlt className="mx-auto text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-700">وصفة طبية</span>
                  </button>
                  <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                    <FaChartBar className="mx-auto text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-700">التقارير</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <div className="medical-card">
            <div className="medical-card-header flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center">
                <FaChartBar className="mr-2 text-teal-600" />
                إحصائيات الأداء
              </h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="year">هذا العام</option>
              </select>
            </div>
            <div className="medical-card-body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
                    <FaHeartbeat className="text-teal-600 text-2xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">94%</h4>
                  <p className="text-gray-600">معدل رضا المرضى</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <FaClock className="text-blue-600 text-2xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">15 دقيقة</h4>
                  <p className="text-gray-600">متوسط وقت الانتظار</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <FaUserMd className="text-green-600 text-2xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">87%</h4>
                  <p className="text-gray-600">معدل الحضور</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
