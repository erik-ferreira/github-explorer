import React, { useState, useEffect } from "react";

import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";

export interface Repository {
  name: string;
  description: string;
  html_url: string;
}

function RepositoryList() {
  const [buttonTypeSearchSelected, setButtonTypeSearchSelected] = useState<
    "user" | "org"
  >("org");
  const [search, setSearch] = useState("rocketseat");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  function handleToggleButtonTypeSelected(type: "user" | "org") {
    setButtonTypeSearchSelected(type);
  }

  function handleLoadListRepositories() {
    const apiUrl =
      buttonTypeSearchSelected === "org"
        ? `https://api.github.com/orgs/${search}/repos`
        : `https://api.github.com/users/${search}/repos`;

    fetch(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error("Não foi possível carregar a lista de repositórios");
        }
      })
      .then((data) => {
        setRepositories(data);
      })
      .catch((err) => {
        alert(err);
        setRepositories([]);
      });
  }

  useEffect(() => {
    handleLoadListRepositories();

    return () => {
      setButtonTypeSearchSelected("org");
      setSearch("rocketseat");
      setRepositories([]);
    };
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <strong>Pesquisar por:</strong>
      <div className="options-search-selected">
        <button
          type="button"
          className={buttonTypeSearchSelected === "user" ? "is-active" : ""}
          onClick={() => handleToggleButtonTypeSelected("user")}
        >
          Usuário
        </button>
        <button
          type="button"
          className={buttonTypeSearchSelected === "org" ? "is-active" : ""}
          onClick={() => handleToggleButtonTypeSelected("org")}
        >
          Organização
        </button>
      </div>

      <div className="block-input-search">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="button" onClick={handleLoadListRepositories}>
          Pesquisar
        </button>
      </div>

      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository?.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}

export { RepositoryList };
