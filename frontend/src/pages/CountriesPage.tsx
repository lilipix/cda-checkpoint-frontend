import { queryCountries } from "@/api/countries";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Countries } from "@/types";

const CountriesPage = () => {
  const { data, loading, error } = useQuery<Countries>(queryCountries, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const countries = data?.countries;
  return (
    <div className="flex flex-wrap justify-center gap-4 m-4">
      {countries?.map((country) => (
        <div>
          <Card
            key={country.name}
            className="h-[60px] w-auto flex justify-center items-center !gap-2 p-4"
          >
            <CardTitle className="!text-sm">{country.name}</CardTitle>
            <CardContent>{country.emoji}</CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CountriesPage;
