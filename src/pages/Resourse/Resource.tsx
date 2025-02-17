import React from "react";
import { Card, Text, Grid, Badge, Center, Loader, Accordion } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./resource.module.scss";

// Fetch functions for character data, homeworld, films, and starships
const fetchCharacterData = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  return response.json();
};

const fetchHomeworld = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const fetchFilms = async (urls: string[]) => {
  const filmRequests = urls.map((url) => fetch(url).then((res) => res.json()));
  return Promise.all(filmRequests);
};

const fetchStarships = async (urls: string[]) => {
  const starshipRequests = urls.map((url) => fetch(url).then((res) => res.json()));
  return Promise.all(starshipRequests);
};

const Resource = () => {
  const { id } = useParams();

  // Use React Query hooks for fetching the data
  const { data: character, isLoading: isCharacterLoading, error: characterError } = useQuery(
    ["character", id],
    () => fetchCharacterData(id!),
    { enabled: !!id }
  );

  const { data: homeworld, isLoading: isHomeworldLoading } = useQuery(
    ["homeworld", character?.homeworld],
    () => fetchHomeworld(character?.homeworld),
    { enabled: !!character?.homeworld }
  );

  const { data: films, isLoading: areFilmsLoading } = useQuery(
    ["films", character?.films],
    () => fetchFilms(character?.films || []),
    { enabled: !!character?.films?.length }
  );

  const { data: starships, isLoading: areStarshipsLoading } = useQuery(
    ["starships", character?.starships],
    () => fetchStarships(character?.starships || []),
    { enabled: !!character?.starships?.length }
  );

  // Combine all loading states
  const isLoading = isCharacterLoading || isHomeworldLoading || areFilmsLoading || areStarshipsLoading;

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (characterError) {
    return <Text align="center">Error fetching character data...</Text>;
  }

  if (!character) {
    return <Text align="center">No character found</Text>;
  }

  return (
    <Center>
      <Card shadow="xl" padding="xl" className={styles.card}>
        <Text size="xl" fw={700} align="center" className={styles.title}>
          {character.name}
        </Text>

        {/* Grid Layout for Basic Details */}
        <Grid gutter="md" className={styles.details}>
          <Grid.Col span={6}>
            <Text fw={600}>Born:</Text>
            <Text c="dimmed">{character.birth_year}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Height:</Text>
            <Text c="dimmed">{character.height} cm</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Eye Color:</Text>
            <Badge color="blue">{character.eye_color}</Badge>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600}>Skin Color:</Text>
            <Badge color="green">{character.skin_color}</Badge>
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
              {films?.map((film, index) => (
                <Text key={index} c="dimmed">🎬 {film.title} ({film.release_date})</Text>
              ))}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="starships">
            <Accordion.Control>🚀 Starships</Accordion.Control>
            <Accordion.Panel>
              {starships?.length > 0 ? (
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
