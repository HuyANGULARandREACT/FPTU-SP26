import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";
import type { IBrand } from "../../../services";
import { brandAPI, type PaginatedResponse } from "../../../services/brandAPI";
import CreateBrandDialog from "./createBrandDialog";
import UpdateBrandDialog from "./updateBrandDialog";

const AdminManageBrands = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0,
  });
  const pageSize = 5;
  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);

  const fetchBrands = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<IBrand> =
        await brandAPI.getBrandWithPagination(page, pageSize);
      setBrands(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError("Failed to fetch brands");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handelCreateBrand = async (data: { brandName: string }) => {
    try {
      await brandAPI.createBrand(data);
      await fetchBrands(currentPage);
    } catch (err) {
      console.error("Failed to create brand:", err);
      throw error;
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleDelete = async (id: string, brandName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${brandName}"? This action cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      await brandAPI.deleteBrand(id);
      await fetchBrands(currentPage);
    } catch (err) {
      console.error("Failed to delete perfume:", err);
      alert("Failed to delete perfume. Please try again.");
    }
  };
  const handleUpdateBrand = async (id: string, data: { brandName: string }) => {
    try {
      await brandAPI.updateBrand(id, data);
      await fetchBrands(currentPage);
    } catch (err) {
      console.error("Failed to update brand:", err);
      throw error;
    }
  };
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between ">
        <div>
          {" "}
          <h1 className="text-3xl font-bold mb-2">Brands Manage</h1>
          <p className="text-gray-500">
            Update brands details and preferences.
          </p>
        </div>
        <div>
          <CreateBrandDialog onSubmit={handelCreateBrand} />
        </div>
      </div>

      {/* Brands Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading brands...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : brands.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No brands available
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Brand Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Creation Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Updated Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {brands.map((brand) => {
                      return (
                        <tr
                          key={brand._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Brand Name with Logo */}
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">
                              {brand.brandName}
                            </p>
                          </td>

                          {/* Creation Date */}
                          <td className="px-6 py-4">
                            <p className="text-gray-700">
                              {brand.createdAt
                                ? new Date(brand.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-700">
                              {brand.updatedAt
                                ? new Date(brand.updatedAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <UpdateBrandDialog
                                brand={brand}
                                onSubmit={(data) =>
                                  handleUpdateBrand(brand._id as string, data)
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-50 hover:text-red-600"
                                onClick={() =>
                                  brand._id &&
                                  handleDelete(brand._id, brand.brandName)
                                }
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

              {/* Pagination */}
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

export default AdminManageBrands;
