import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { perfumeAPI, type IPerfume } from "../../services";
import type { PaginatedResponse } from "../../services/brandAPI";

const AdminManagePerfumes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [perfumes, setPerfumes] = useState<IPerfume[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0,
  });
  const pageSize = 5;
  useEffect(() => {
    fetchPerfumes(currentPage);
  }, [currentPage]);
  const fetchPerfumes = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<IPerfume> =
        await perfumeAPI.getPerfumeWithPagination(page, pageSize);
      setPerfumes(response.data);
      setPagination(response.pagination);
      console.log("perfume data", response.data);
    } catch (err) {
      setError("Failed to fetch perfumes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between ">
        <div>
          {" "}
          <h1 className="text-3xl font-bold mb-2">Perfumes Manage</h1>
          <p className="text-gray-500">
            Update perfumes details and preferences.
          </p>
        </div>
        <div>
          <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-800 text-white rounded-15 px-7 py-5 shadow-md">
            <div className="bg-white/20 rounded-full p-1">
              <Plus className="h-5 w-5" />
            </div>
            <span className="font-medium">Add Perfume</span>
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-8">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading perfumes...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : perfumes.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No perfumes available
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Perfume Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Concentration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {perfumes.map((perfume) => {
                      return (
                        <tr
                          key={perfume._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="">
                              <img
                                src={perfume.uri}
                                alt={perfume.perfumeName}
                                className="w-15 h-15 "
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">
                              {perfume.perfumeName}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">
                              {perfume.brand.brandName}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-white bg-orange-500 flex justify-center w-24 rounded-full">
                              {perfume.concentration}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">
                              ${perfume.price.toLocaleString("en-US")}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.pageSize,
                    pagination.total,
                  )}{" "}
                  of {pagination.total} brands
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4"
                  >
                    Previous
                  </Button>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 ${
                        currentPage === page
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagePerfumes;
