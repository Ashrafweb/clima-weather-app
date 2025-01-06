import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";

export interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    []
  );
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: (search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };

      // Remove duplicates and keep only last 10 searches
      const filteredHistory = history.filter(
        (item: SearchHistoryItem) =>
          !(item.lat === search.lat && item.lon === search.lon)
      );
      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

      setHistory(newHistory);
      return Promise.resolve(newHistory);
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: () => {
      setHistory([]);
      return Promise.resolve([]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}

// import { useState, useEffect } from "react";

// interface SearchHistoryItem {
//   id: string;
//   query: string;
//   lat: number;
//   lon: number;
//   name: string;
//   country: string;
//   state?: string;
//   searchedAt: number;
// }

// export function useSearchHistory() {
//   const [history, setHistory] = useState<SearchHistoryItem[]>([]);

//   // Load history from localStorage on mount
//   useEffect(() => {
//     const savedHistory = localStorage.getItem("search-history");
//     if (savedHistory) {
//       setHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   // Save history to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("search-history", JSON.stringify(history));
//   }, [history]);

//   const addToHistory = (search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
//     const newSearch: SearchHistoryItem = {
//       ...search,
//       id: `${search.lat}-${search.lon}-${Date.now()}`,
//       searchedAt: Date.now(),
//     };

//     // Remove duplicates and keep only the last 10 searches
//     const filteredHistory = history.filter(
//       (item) => !(item.lat === search.lat && item.lon === search.lon)
//     );
//     const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

//     setHistory(newHistory);
//   };

//   const clearHistory = () => {
//     setHistory([]);
//   };

//   return {
//     history,
//     addToHistory,
//     clearHistory,
//   };
// }
