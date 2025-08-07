import { FaUser, FaPhone, FaEye, FaEdit, FaCalendarAlt } from 'react-icons/fa';

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

interface PatientCardProps {
  patient: Patient;
  onView?: (patientId: string) => void;
  onEdit?: (patientId: string) => void;
  onCall?: (phone: string) => void;
}

const PatientCard = ({ patient, onView, onEdit, onCall }: PatientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'recovering': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'stable': return 'مستقر';
      case 'critical': return 'حرج';
      case 'recovering': return 'في تحسن';
      default: return status;
    }
  };

  return (
    <div className="medical-card hover:shadow-lg transition-shadow duration-200">
      <div className="medical-card-body">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
              <FaUser className="text-teal-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
              <p className="text-sm text-gray-600">{patient.age} سنة • {patient.gender}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
            {getStatusText(patient.status)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaPhone className="mr-2 text-teal-500" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="mr-2 text-teal-500" />
            <span>آخر زيارة: {patient.lastVisit}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">الحالة الطبية:</p>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">{patient.condition}</p>
        </div>

        <div className="flex justify-end space-x-2 space-x-reverse pt-3 border-t border-gray-100">
          {onView && (
            <button
              onClick={() => onView(patient.id)}
              className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
              title="عرض التفاصيل"
            >
              <FaEye />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(patient.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="تعديل البيانات"
            >
              <FaEdit />
            </button>
          )}
          {onCall && (
            <button
              onClick={() => onCall(patient.phone)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="اتصال"
            >
              <FaPhone />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
