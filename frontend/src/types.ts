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

export type Countries = {
  countries: Omit<Country, "continent">[];
};
