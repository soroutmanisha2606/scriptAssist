import React, { useEffect, useState } from "react";
import { Table, Container, Title, Loader, Center, TextInput, Button, Select } from "@mantine/core";
import styles from './resourceList.module.scss'
import { Link } from "react-router-dom";
// Define TypeScript Interface for API response
interface Character {
  url: any;
  name: string;
  mass: string;
  gender: string;
  skin_color: string;
  birth_year: string;
}

const ResourseList: React.FC = () => {
  const [data, setData] = useState<Character[]>([]);
  const [searchData, setSearchData] = useState<Character[]>([]);
  const [reset,setreset] = useState(false)
  const [filter, setFilter] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const jsonData = await response.json();
        setData(jsonData.results);
        if(reset){
          console.log(reset)
          setSearchData(jsonData.results);
        }
        setSearchData(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data)

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  const handleSearch = () => {
    let filteredResults = searchData;

    // Apply search filter (if name is entered)
    if (name.trim() !== "") {
      filteredResults = filteredResults.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Apply gender filter (if selected)
    if (filter && filter !== "All") {
      filteredResults = filteredResults.filter(
        (item) => item.gender.toLowerCase() === filter.toLowerCase()
      );
    }

    setData(filteredResults);
  };

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
          data={["All", "Male", "Female"]}
          value={filter}
          onChange={(value) => setFilter(value || "")} 
        />
        <Select
          placeholder="Sort By Ascending"
          data={["All", "Male", "Female"]}
          value={filter}
          onChange={(value) => setFilter(value || "")} 
        />
      <Button onClick={()=>handleSearch()}>Search</Button>
      <Button onClick={()=>setreset(true)}>Reset</Button>
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
  {data.map((character: Character,index:string) => {
    // Extract correct ID from the API URL
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
          <Link to={`/resource/${index+1}`}>View More</Link>
        </td>
      </tr>
    );
  })}
</tbody>

      </Table>
    </Container>
    </>
  );
};

export default ResourseList;
