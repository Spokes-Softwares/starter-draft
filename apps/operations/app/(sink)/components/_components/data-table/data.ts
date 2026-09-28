export type ExampleDataShape = {
  id: string;
  companyName: string;
  displayName: string;
  numberOfHubs: number;
  numberOfAssets: number;
};

export const ExampleData = [
  {
    id: "123454678910",
    companyName: "Neilson Active Holidays LTD",
    displayName: "Neilson",
    numberOfHubs: 12,
    numberOfAssets: 5643,
  },
  {
    id: "10987654321",
    companyName: "Sunsail Holidays",
    displayName: "Sunsail",
    numberOfHubs: 4,
    numberOfAssets: 1560,
  },
] satisfies ExampleDataShape[];
