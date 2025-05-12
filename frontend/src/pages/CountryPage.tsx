import { queryCountry } from "@/api/country";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getCountryResponse } from "@/types";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const CountryPage = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery<getCountryResponse>(queryCountry, {
    variables: { code },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const country = data?.country;
  if (!country) return <div>No country found</div>;

  return (
    <div className="flex justify-center gap-4 mt-10">
      <div>
        <Card
          key={country.name}
          className="flex justify-center items-center sm:w-auto md:w-xl"
        >
          <CardTitle className="text-4xl">{country.emoji}</CardTitle>
          <CardContent className="flex flex-col gap-4 text-center">
            <h1 className="text-xl font-bold">{country.name}</h1>
            <p className="text-sm">Code : {country.code}</p>
            {country.continent?.name && (
              <p className="text-sm">Continent : {country.continent.name}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountryPage;
