import { FaClock, FaCalendarAlt, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: number;
}

interface AppointmentWidgetProps {
  appointments: Appointment[];
  onAddAppointment?: () => void;
  onCompleteAppointment?: (appointmentId: string) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

const AppointmentWidget = ({ 
  appointments, 
  onAddAppointment, 
  onCompleteAppointment, 
  onCancelAppointment 
}: AppointmentWidgetProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'مجدول';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <FaClock className="text-blue-600" />;
      case 'completed': return <FaCheck className="text-green-600" />;
      case 'cancelled': return <FaTimes className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="medical-card">
      <div className="medical-card-header flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <FaCalendarAlt className="mr-2 text-teal-600" />
          مواعيد اليوم
        </h3>
        {onAddAppointment && (
          <button
            onClick={onAddAppointment}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-2 rounded-full transition-colors"
            title="إضافة موعد جديد"
          >
            <FaPlus />
          </button>
        )}
      </div>
      
      <div className="medical-card-body">
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaCalendarAlt className="mx-auto text-4xl mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">لا توجد مواعيد اليوم</p>
            <p className="text-sm">يمكنك إضافة موعد جديد من الزر أعلاه</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {appointment.patientName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {appointment.type}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(appointment.status)}`}>
                    <span className="mr-1">{getStatusIcon(appointment.status)}</span>
                    {getStatusText(appointment.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1" />
                    <span>{appointment.time} ({appointment.duration} دقيقة)</span>
                  </div>

                  {appointment.status === 'scheduled' && (
                    <div className="flex space-x-2 space-x-reverse">
                      {onCompleteAppointment && (
                        <button
                          onClick={() => onCompleteAppointment(appointment.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="تم الانتهاء"
                        >
                          <FaCheck />
                        </button>
                      )}
                      {onCancelAppointment && (
                        <button
                          onClick={() => onCancelAppointment(appointment.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="إلغاء الموعد"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentWidget;
