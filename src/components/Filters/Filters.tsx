import React from "react";
import styles from "./Filters.module.scss";
import useFilters from "./Filters.controller";

type Props = {
  types: string[];
  models: string[];
};

function Filters({ types, models }: Props) {
  const { changeHandler, resetHandler, selectedType, selectedModel } =
    useFilters();

  return (
    <div className={styles["filters"]}>
      {types && types.length > 0 && (
        <div className={styles["filter"]}>
          <p>Type:</p>
          {types.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name={"types"}
                value={type}
                checked={selectedType === type}
                onChange={(e) => changeHandler(e, "type")}
              />
              {type}
            </label>
          ))}
          <button onClick={() => resetHandler("type")}>reset type</button>
        </div>
      )}
      {models && models.length > 0 && (
        <div className={styles["filter"]}>
          <p>Model:</p>
          {models.map((model) => (
            <label key={model}>
              <input
                type="radio"
                name={"models"}
                value={model}
                checked={selectedModel === model}
                onChange={(e) => changeHandler(e, "model")}
              />
              {model}
            </label>
          ))}
          <button onClick={() => resetHandler("model")}>reset model</button>
        </div>
      )}
    </div>
  );
}

export default Filters;
