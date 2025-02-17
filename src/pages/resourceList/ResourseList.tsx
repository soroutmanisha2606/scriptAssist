import React, { useState } from "react";
import { Table, Container, Title, Loader, Center, TextInput, Button, Select, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import styles from './resourceList.module.scss';
import { Link } from "react-router-dom";

// Define TypeScript Interface for API response
interface Character {
  url: string;
  name: string;
  mass: string;
  gender: string;
  skin_color: string;
  birth_year: string;
}

// Fetch data function for React Query
const fetchData = async (): Promise<Character[]> => {
  const response = await fetch("https://swapi.dev/api/people/");
  const jsonData = await response.json();
  return jsonData.results;
};

const ResourseList: React.FC = () => {
  const [searchData, setSearchData] = useState<Character[]>([]);
  const [reset, setReset] = useState(false);
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  // Use useQuery hook to fetch data
  const { data, isLoading, error } = useQuery<Character[], Error>({
    queryKey: ["characters"],
    queryFn: fetchData,
  });

  // Handling loading state
  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // Handling error state
  if (error) {
    return (
      <Center style={{ height: "100vh" }}>
        <p>Error fetching data...</p>
      </Center>
    );
  }

  // Filter and sorting logic
  const handleSearch = () => {
    let filteredResults = data || [];

    if (name.trim() !== "") {
      filteredResults = filteredResults.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (filter && filter !== "All") {
      filteredResults = filteredResults.filter(
        (item) => item.gender.toLowerCase() === filter.toLowerCase()
      );
    }

    if (sortOrder) {
      filteredResults = filteredResults.sort((a, b) => {
        const massA = isNaN(parseFloat(a.mass)) ? 0 : parseFloat(a.mass);
        const massB = isNaN(parseFloat(b.mass)) ? 0 : parseFloat(b.mass);

        return sortOrder === "High to Low" ? massB - massA : massA - massB;
      });
    }

    setSearchData(filteredResults);
  };

  // Pagination logic
  const currentData = (searchData.length > 0 ? searchData : data).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className={styles.search_box}>
        {/* Search Input */}
        <TextInput
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Dropdown Filter */}
        <Select
          placeholder="Filter By Gender"
          data={["All", "Male", "Female", "n/a"]}
          value={filter}
          onChange={(value) => setFilter(value || "")}
        />

        {/* Dropdown for Sorting by Mass */}
        <Select
          placeholder="Sort by Mass"
          data={["", "Low to High", "High to Low"]}
          value={sortOrder}
          onChange={(value) => setSortOrder(value || "")}
        />

        <Button onClick={() => handleSearch()}>Search</Button>
        <Button onClick={() => setReset(true)}>Reset</Button>
      </div>

      <Container size="md" mt={20}>
        <Title align="center" order={2} mb={20}>
          Star Wars Characters
        </Title>

        <Table
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <thead style={{ backgroundColor: "#f4f4f4" }}>
            <tr>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Mass</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Gender</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Skin Color</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Birth Year</th>
              <th style={{ padding: "10px", textAlign: "left" }}>More Details</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((character, index) => {
              const id = character.url.split("/").filter(Boolean).pop();

              return (
                <tr
                  key={character.name}
                  style={{
                    backgroundColor: parseInt(id) % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <td style={{ padding: "10px" }}>{character.name}</td>
                  <td style={{ padding: "10px" }}>{character.mass}</td>
                  <td style={{ padding: "10px" }}>{character.gender}</td>
                  <td style={{ padding: "10px" }}>{character.skin_color}</td>
                  <td style={{ padding: "10px" }}>{character.birth_year}</td>
                  <td style={{ padding: "10px" }}>
                    <Link to={`/resource/${index + 1}`}>View More</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Pagination Component */}
        <Pagination
          page={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil((searchData.length > 0 ? searchData : data).length / itemsPerPage)}
          size="md"
          color="blue"
        />
      </Container>
    </>
  );
};

export default ResourseList;
