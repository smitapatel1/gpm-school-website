import { useState, useEffect } from "react";
import { Trash2, Eye, CheckCircle, XCircle, Loader2, Download } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface Admission {
  id: string;
  studentName: string;
  parentName: string;
  class: string;
  phone: string;
  address: string;
  email?: string;
  studentPhotoUrl?: string;
  studentPhotoPath?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
}

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoModalAdmission, setPhotoModalAdmission] = useState<Admission | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "admissions"));
      const data: Admission[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Admission);
      });
      setAdmissions(data.sort((a, b) => b.createdAt?.toDate?.() - a.createdAt?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const openPhotoModal = (admission: Admission) => {
    setPhotoModalAdmission(admission);
    setShowPhotoModal(true);
  };

  const updateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "admissions", id), { status: newStatus });
      setAdmissions((prev) =>
        prev.map((adm) => (adm.id === id ? { ...adm, status: newStatus } : adm))
      );
    } catch (error) {
      console.error("Error updating admission:", error);
    }
  };

  const deleteAdmission = async (id: string) => {
    if (confirm("Are you sure you want to delete this admission?")) {
      try {
        await deleteDoc(doc(db, "admissions", id));
        setAdmissions((prev) => prev.filter((adm) => adm.id !== id));
      } catch (error) {
        console.error("Error deleting admission:", error);
      }
    }
  };

  const filteredAdmissions = admissions.filter(
    (adm) => filterStatus === "all" || adm.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? "bg-[#C62828] text-white"
                : "bg-white border border-[#D6D6D6] text-[#3E2723] hover:border-[#C62828]"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Admissions Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : filteredAdmissions.length === 0 ? (
        <div className="card-base p-8 text-center">
          <p className="text-[#6B7280]">No admissions found</p>
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D6D6D6] bg-[#FFFDF7]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2723]">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2723]">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2723]">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2723]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#3E2723]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map((admission) => (
                  <tr key={admission.id} className="border-b border-[#D6D6D6] hover:bg-[#FFFDF7]">
                    <td className="px-6 py-4 text-sm text-[#3E2723] font-medium">
                      <div className="flex items-center gap-3">
                        {admission.studentPhotoUrl && (
                          <img
                            src={admission.studentPhotoUrl}
                            alt={admission.studentName}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-[#C62828]"
                            onClick={() => openPhotoModal(admission)}
                            title="Click to view full photo"
                          />
                        )}
                        <span>{admission.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{admission.class}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{admission.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          admission.status
                        )}`}
                      >
                        {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {admission.studentPhotoUrl ? (
                        <button
                          onClick={() => openPhotoModal(admission)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View student photo"
                        >
                          <Eye size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedAdmission(admission)}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      )}
                        {admission.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(admission.id, "approved")}
                              className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(admission.id, "rejected")}
                              className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteAdmission(admission.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {showPhotoModal && photoModalAdmission?.studentPhotoUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">{photoModalAdmission.studentName}'s Photo</h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-[#6B7280] hover:text-[#3E2723] text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={photoModalAdmission.studentPhotoUrl}
                alt={photoModalAdmission.studentName}
                className="max-w-full max-h-96 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-[#3E2723] mb-4">Admission Details</h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Student Name</p>
                <p className="text-[#3E2723]">{selectedAdmission.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Parent Name</p>
                <p className="text-[#3E2723]">{selectedAdmission.parentName}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Class</p>
                <p className="text-[#3E2723]">{selectedAdmission.class}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Phone</p>
                <p className="text-[#3E2723]">{selectedAdmission.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Address</p>
                <p className="text-[#3E2723]">{selectedAdmission.address}</p>
              </div>
              {selectedAdmission.email && (
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold">Email</p>
                  <p className="text-[#3E2723]">{selectedAdmission.email}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-[#6B7280] font-semibold">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    selectedAdmission.status
                  )}`}
                >
                  {selectedAdmission.status.charAt(0).toUpperCase() +
                    selectedAdmission.status.slice(1)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAdmission(null)}
              className="w-full mt-6 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
