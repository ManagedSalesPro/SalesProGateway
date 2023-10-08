// app/clientsearch/page.js
import SearchBar from '@/components/SearchBar';
import FilterOptions from '@/components/FilterOptions';
import SearchResults from '@/components/SearchResults';
import apiClient from '@/libs/api';

export default function ClientSearch() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query, filters) => {
    const data = await apiClient.get(`/api/clientsearch`, {
      params: {
        query,
        ...filters
      }
    });
    setResults(data);
  };

  return (
    <div className="client-search-container">
      <ClientSearchNavBar />
      <SearchBar onSearch={handleSearch} />
      <FilterOptions onFilter={(filters) => handleSearch('', filters)} />
      <SearchResults results={results} />
      
      <style jsx>{`
        .client-search-container {
          /* Styling for the client search container */
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 80%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
