// you can put your types here
export type Country = {
  id: string;
  name: string;
  emoji: string;
  code: string;
  continent?: {
    name: string;
  };
};

export type getCountryResponse = {
  country: Country;
};

export type getCountriesResponse = {
  countries: Omit<Country, "continent">[];
};
