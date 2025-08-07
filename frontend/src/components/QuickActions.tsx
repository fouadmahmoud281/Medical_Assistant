import { ReactNode } from 'react';
import { 
  FaCalendarAlt, 
  FaPrescriptionBottleAlt, 
  FaChartBar, 
  FaUserPlus, 
  FaFileAlt, 
  FaStethoscope,
  FaAmbulance,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

interface QuickAction {
  id: string;
  title: string;
  icon: ReactNode;
  color: 'teal' | 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'orange';
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionsProps {
  onNewPatient?: () => void;
  onBookAppointment?: () => void;
  onCreatePrescription?: () => void;
  onViewReports?: () => void;
  onEmergencyCall?: () => void;
  onSendMessage?: () => void;
  onMedicalExam?: () => void;
  onViewAnalytics?: () => void;
}

const QuickActions = ({
  onNewPatient,
  onBookAppointment,
  onCreatePrescription,
  onViewReports,
  onEmergencyCall,
  onSendMessage,
  onMedicalExam,
  onViewAnalytics
}: QuickActionsProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200';
      case 'blue':
        return 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200';
      case 'green':
        return 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200';
      case 'purple':
        return 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200';
      case 'red':
        return 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200';
      case 'yellow':
        return 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'orange':
        return 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'new-patient',
      title: 'مريض جديد',
      icon: <FaUserPlus />,
      color: 'teal',
      onClick: onNewPatient || (() => console.log('New patient clicked')),
      disabled: !onNewPatient
    },
    {
      id: 'book-appointment',
      title: 'حجز موعد',
      icon: <FaCalendarAlt />,
      color: 'blue',
      onClick: onBookAppointment || (() => console.log('Book appointment clicked')),
      disabled: !onBookAppointment
    },
    {
      id: 'prescription',
      title: 'وصفة طبية',
      icon: <FaPrescriptionBottleAlt />,
      color: 'green',
      onClick: onCreatePrescription || (() => console.log('Create prescription clicked')),
      disabled: !onCreatePrescription
    },
    {
      id: 'reports',
      title: 'التقارير',
      icon: <FaFileAlt />,
      color: 'purple',
      onClick: onViewReports || (() => console.log('View reports clicked')),
      disabled: !onViewReports
    },
    {
      id: 'medical-exam',
      title: 'فحص طبي',
      icon: <FaStethoscope />,
      color: 'teal',
      onClick: onMedicalExam || (() => console.log('Medical exam clicked')),
      disabled: !onMedicalExam
    },
    {
      id: 'analytics',
      title: 'الإحصائيات',
      icon: <FaChartBar />,
      color: 'blue',
      onClick: onViewAnalytics || (() => console.log('View analytics clicked')),
      disabled: !onViewAnalytics
    },
    {
      id: 'emergency',
      title: 'طوارئ',
      icon: <FaAmbulance />,
      color: 'red',
      onClick: onEmergencyCall || (() => console.log('Emergency call clicked')),
      disabled: !onEmergencyCall
    },
    {
      id: 'message',
      title: 'رسالة',
      icon: <FaEnvelope />,
      color: 'yellow',
      onClick: onSendMessage || (() => console.log('Send message clicked')),
      disabled: !onSendMessage
    }
  ];

  return (
    <div className="medical-card">
      <div className="medical-card-header">
        <h3 className="text-lg font-semibold flex items-center">
          <FaStethoscope className="mr-2 text-teal-600" />
          إجراءات سريعة
        </h3>
      </div>
      
      <div className="medical-card-body">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`
                p-4 rounded-lg text-center transition-all duration-200 border
                ${getColorClasses(action.color)}
                ${action.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-md transform hover:-translate-y-0.5'
                }
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
              `}
              title={action.title}
            >
              <div className="text-2xl mb-2 flex justify-center">
                {action.icon}
              </div>
              <span className="text-sm font-medium block leading-tight">
                {action.title}
              </span>
            </button>
          ))}
        </div>

        {/* Additional Quick Actions Row */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onEmergencyCall || (() => console.log('Emergency hotline clicked'))}
              className="flex items-center justify-center p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors border border-red-200"
            >
              <FaPhone className="mr-2" />
              <span className="text-sm font-medium">خط الطوارئ</span>
            </button>
            <button
              onClick={onViewAnalytics || (() => console.log('Quick stats clicked'))}
              className="flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-200"
            >
              <FaChartBar className="mr-2" />
              <span className="text-sm font-medium">إحصائيات سريعة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
