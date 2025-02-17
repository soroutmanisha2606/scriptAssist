import React, { useEffect, useState } from "react";
import { Card, Text, Grid, Badge, Center, Loader, Accordion } from "@mantine/core";
import { useParams } from "react-router-dom";
import styles from "./resource.module.scss";

const Resource = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Character Data
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const character = await response.json();
        setData(character);
  
        // Create API calls for homeworld, films, and starships
        const homeworldRequest = fetch(character.homeworld).then((res) => res.json());
  
        const filmRequests = character.films.map((url) => fetch(url).then((res) => res.json()));
        const starshipRequests = character.starships.map((url) => fetch(url).then((res) => res.json()));
  
        // Wait for all requests to complete
        const [homeworldData, filmsData, starshipsData] = await Promise.all([
          homeworldRequest,
          Promise.all(filmRequests),
          Promise.all(starshipRequests),
        ]);
  
        // Set State
        setHomeworld(homeworldData);
        setFilms(filmsData);
        setStarships(starshipsData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (!data) {
    return <Text align="center">No data found</Text>;
  }

  return (
    <Center>
      <Card shadow="xl" padding="xl" className={styles.card}>
        <Text size="xl" fw={700} align="center" className={styles.title}>
          {data.name}
        </Text>

        {/* Grid Layout for Basic Details */}
        <Grid gutter="md" className={styles.details}>
          <Grid.Col span={6}>
            <Text fw={600}>Born:</Text>
            <Text c="dimmed">{data.birth_year}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Height:</Text>
            <Text c="dimmed">{data.height} cm</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Eye Color:</Text>
            <Badge color="blue">{data.eye_color}</Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Skin Color:</Text>
            <Badge color="green">{data.skin_color}</Badge>
          </Grid.Col>

          {/* Homeworld Section */}
          {homeworld && (
            <Grid.Col span={12}>
              <Text fw={600}>Homeworld:</Text>
              <Text c="dimmed">{homeworld.name} (Population: {homeworld.population})</Text>
            </Grid.Col>
          )}
        </Grid>

        {/* Accordion for Additional Details */}
        <Accordion variant="contained" className={styles.accordion}>
          <Accordion.Item value="films">
            <Accordion.Control>📽️ Films</Accordion.Control>
            <Accordion.Panel>
              {films.map((film, index) => (
                <Text key={index} c="dimmed">🎬 {film.title} ({film.release_date})</Text>
              ))}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="starships">
            <Accordion.Control>🚀 Starships</Accordion.Control>
            <Accordion.Panel>
              {starships.length > 0 ? (
                starships.map((ship, index) => (
                  <Text key={index} c="dimmed">🚀 {ship.name} (Model: {ship.model})</Text>
                ))
              ) : (
                <Text c="dimmed">No starships available</Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Center>
  );
};

export default Resource;
