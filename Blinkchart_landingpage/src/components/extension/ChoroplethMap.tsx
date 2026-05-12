import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type GeoType = {
  rsmKey: string;
};

type GeographiesProps = {
  geographies: GeoType[];
};

export default function ChoroplethMap() {

  return (

    <div className="choropleth-chart">

      <ComposableMap
        projectionConfig={{
          scale: 120
        }}
      >

        <Geographies geography={geoUrl}>

          {({ geographies }: GeographiesProps) =>

            geographies.map((geo: GeoType) => (

              <Geography
                key={geo.rsmKey}
                geography={geo}

                style={{

                  default: {
                    fill: "#ffb067",
                    stroke: "#ffffff",
                    strokeWidth: 0.6,
                    outline: "none"
                  },

                  hover: {
                    fill: "#ff6a00",
                    stroke: "#ffffff",
                    strokeWidth: 0.6,
                    outline: "none"
                  },

                  pressed: {
                    fill: "#ff944d",
                    outline: "none"
                  }

                }}
              />

            ))

          }

        </Geographies>

      </ComposableMap>

    </div>

  );

}