import { Repository } from "./RepositoryList";

import "../styles/repositoryItem.scss";

interface RepositoryItemProps {
  repository: Repository;
}

function RepositoryItem(props: RepositoryItemProps) {
  return (
    <li>
      <div>
        <strong>{props.repository.name}</strong>
        <p>{props.repository.description}</p>
      </div>

      <a href={props.repository.html_url} target="_blank">
        <button>Acessar repositório</button>
      </a>
    </li>
  );
}

export { RepositoryItem };
