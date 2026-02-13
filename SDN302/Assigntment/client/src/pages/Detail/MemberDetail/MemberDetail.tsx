import { useMemberDetail } from "../../../hooks/useMemberDetail";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Card, CardContent } from "../../../components/ui/card";

const MemberDetail = () => {
  const { member, loading, error } = useMemberDetail();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading member details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please login to view your details</p>
      </div>
    );
  }

  const initials = member.membername
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div className="relative flex items-center gap-6">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarFallback className="text-3xl bg-white text-orange-500 font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">
                {member.membername}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span
                className={`px-3 py-1 text-white text-xs font-bold rounded-full ${
                  member.isAdmin ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {member.isAdmin ? "ADMIN" : "MEMBER"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Personal Information
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">DATE OF BIRTH</div>
              <div className="text-lg font-semibold">
                {new Date(member.YOB).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">GENDER</div>
              <div className="text-lg font-semibold">
                {member.gender ? "Male" : "Female"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">EMAIL ADDRESS</div>
              <div className="text-lg font-semibold">{member.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDetail;
