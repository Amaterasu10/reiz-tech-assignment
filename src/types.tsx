export interface StateHolderProps {
  countriesData: CountriesData;
  isFetchingData: boolean;
}

export interface CountryData {
  name: string,
  region: string,
  area: number,
  independent: boolean
}

export interface GroupMenuProps {
  countriesData: CountriesData,
  rowsPerPage: RowsPerPage,
  currentPage: CurrentPage,
  totalPageCount: TotalPageCount,
  partitionedList: PartitionedList,
  listToRender: ListToRender,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setTotalPageCount: React.Dispatch<React.SetStateAction<number>>,
  setPartitionedList: React.Dispatch<React.SetStateAction<PartialCountryData[][]>>,
  setListToRender: React.Dispatch<React.SetStateAction<PartialCountryData[]>>
}

export interface DataTableProps {
  dataset: CountriesData, 
  currentPage: CurrentPage, 
  rowsPerPage: RowsPerPage, 
  totalPageCount:TotalPageCount,
  setCurrentPage: SetCurrentPage, 
}

export interface RowProps {
  data: PartialCountryData
}

export interface PageInputProps {
  totalPageCount: TotalPageCount,
  currentPage: CurrentPage,
  setCurrentPage: SetCurrentPage,
}

export type CountriesData = PartialCountryData[]

export type RowsPerPage = number

export type CurrentPage = number

export type TotalPageCount = number

export type PartitionedList = CountriesData[]

export type ListToRender = PartialCountryData[]

export type PartialCountryData = {
  [key: string]: string | number | undefined;
} & Partial<CountryData>;

export type SetCurrentPage = React.Dispatch<React.SetStateAction<number>>
export type SetTotalPageCount = React.Dispatch<React.SetStateAction<number>>
export type SetPartitionedList = React.Dispatch<React.SetStateAction<PartialCountryData[][]>>
export type SetListToRender = React.Dispatch<React.SetStateAction<PartialCountryData[]>>