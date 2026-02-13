import { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "../../ui/input";
import { perfumeAPI } from "../../../services";
import type { IPerfume } from "../../../types/type";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allPerfumes, setAllPerfumes] = useState<IPerfume[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch all perfumes on mount
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const data = await perfumeAPI.getAllPerfumes();
        setAllPerfumes(data);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
      }
    };
    fetchPerfumes();
  }, []);

  // Filter perfumes based on search query using useMemo
  const filteredPerfumes = useMemo(() => {
    if (searchQuery.trim() === "") {
      return [];
    }
    return allPerfumes.filter((perfume) =>
      perfume.perfumeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, allPerfumes]);

  // Calculate if dropdown should show
  const showDropdown = searchQuery.trim() !== "" && filteredPerfumes.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Clear search query instead of just hiding dropdown
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePerfumeClick = (perfumeId: string) => {
    setSearchQuery("");
    navigate(`/perfume/${perfumeId}`);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-xl">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search perfumes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white"
        />
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredPerfumes.length > 0 ? (
            <ul>
              {filteredPerfumes.map((perfume) => (
                <li
                  key={perfume._id}
                  onClick={() => handlePerfumeClick(perfume._id!)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={perfume.uri}
                      alt={perfume.perfumeName}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/48";
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {perfume.perfumeName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {perfume.brand?.brandName || "Unknown Brand"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-orange-600">
                      ${perfume.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              No perfumes found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
