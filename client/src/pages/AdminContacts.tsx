import { useState, useEffect } from "react";
import { Trash2, Eye, CheckCircle, Loader2, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: any;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "replied">("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "contactInquiries"));
      const data: ContactInquiry[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ContactInquiry);
      });
      setContacts(data.sort((a, b) => b.createdAt?.toDate?.() - a.createdAt?.toDate?.() || 0));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: "read" | "replied") => {
    try {
      await updateDoc(doc(db, "contactInquiries", id), { status: newStatus });
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "contactInquiries", id));
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const filteredContacts = contacts.filter(
    (c) => filterStatus === "all" || c.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "read":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "replied":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {["all", "new", "read", "replied"].map((status) => (
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

      {/* Contacts List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#C62828]" size={32} />
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="card-base p-8 text-center">
          <p className="text-[#6B7280]">No contact inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="card-base p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-[#3E2723]">{contact.name}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        contact.status
                      )}`}
                    >
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3">
                    <span className="font-semibold">Subject:</span> {contact.subject}
                  </p>
                  <p className="text-sm text-[#3E2723] mb-3 line-clamp-2">{contact.message}</p>
                  <div className="flex gap-4 text-sm text-[#6B7280]">
                    <span>📧 {contact.email}</span>
                    <span>📱 {contact.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  {contact.status === "new" && (
                    <button
                      onClick={() => updateStatus(contact.id, "read")}
                      className="p-2 hover:bg-yellow-50 rounded-lg text-yellow-600 transition-colors"
                      title="Mark as Read"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#3E2723]">Inquiry Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-[#6B7280] hover:text-[#3E2723]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Name</p>
                <p className="text-[#3E2723]">{selectedContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Email</p>
                <p className="text-[#3E2723]">{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Phone</p>
                <p className="text-[#3E2723]">{selectedContact.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Subject</p>
                <p className="text-[#3E2723]">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Message</p>
                <p className="text-[#3E2723] whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] font-semibold mb-1">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    selectedContact.status
                  )}`}
                >
                  {selectedContact.status.charAt(0).toUpperCase() +
                    selectedContact.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {selectedContact.status === "new" && (
                <button
                  onClick={() => {
                    updateStatus(selectedContact.id, "read");
                    setSelectedContact(null);
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 px-4 py-2 bg-[#C62828] text-white rounded-lg hover:bg-[#E53935] transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
