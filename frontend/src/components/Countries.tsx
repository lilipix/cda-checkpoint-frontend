import { queryCountries } from "@/api/countries";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { Link } from "react-router-dom";
import { getCountriesResponse } from "@/types";

const Countries = () => {
  const { data, loading, error } = useQuery<getCountriesResponse>(
    queryCountries,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const countries = data?.countries;
  return (
    <div className="flex flex-wrap justify-center gap-4 m-4">
      {countries?.map((country) => (
        <div key={country.id}>
          <Link to={`/countries/${country.code}`}>
            <Card className="h-[60px] w-auto flex justify-center items-center !gap-2 p-4">
              <CardTitle className="!text-sm">{country.name}</CardTitle>
              <CardContent>{country.emoji}</CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Countries;
