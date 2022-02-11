import { useCallback, useState } from "react";
import ChartStatistics from "./Chart";
import "../styles/Statistics.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinSquintTears } from "@fortawesome/free-solid-svg-icons";

export default function Statistics({ showStatistics, colorsList }) {
  const [visibleChart, setVisibleChart] = useState(false);

  const ShowStatisticsButton = useCallback(() => {
    const handleShowChart = () => {
      setVisibleChart(!visibleChart);
    };

    return (
      <>
        {!visibleChart ? (
          <button
            type="button"
            alt="Button to show Statistics of colors"
            onClick={handleShowChart}
          >
            Get a surprise!!!
          </button>
        ) : null}

        {visibleChart ? (
          <div className="container-chart">
            <ChartStatistics colorsList={colorsList} />
          </div>
        ) : null}
      </>
    );
  });

  return (
    <div className="container-statistics">
      <h2>
        {!visibleChart ? (
          <div>
            <FontAwesomeIcon
              icon={faBomb}
              size="2x"
              beat
              className="icon bomb"
            />{" "}
            If you wait until second 0, you will see a surprise...
          </div>
        ) : (
          <div>
            <FontAwesomeIcon
              icon={faFaceGrinSquintTears}
              size="2x"
              beat
              className="icon"
            />
            SURPRISE !!! YOU FELL INTO THE TRAP !!!
          </div>
        )}
      </h2>
      {showStatistics ? ShowStatisticsButton() : null}
    </div>
  );
}
