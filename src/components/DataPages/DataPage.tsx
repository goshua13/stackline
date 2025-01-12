import { fetchSalesData } from "../../redux/dataSlice";
import { AppDispatch, AppState } from "../../redux/store";
import { LineChart } from "@mantine/charts";
import { Paper, Flex, Table, Text, Grid } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SideBar from "../SideBar/SideBar";

// TODO: Could've seperated these into seperate components but hit the 2 hrs limit
const DataPage = () => {
  // Mimic pagination in api.. ran out of time. and filters ?page_size=10&page=1
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: AppState) => state.data);

  useEffect(() => {
    dispatch(fetchSalesData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = data?.sales.reduce(
    (
      acc: Record<string, { retailSales: number; wholesaleSales: number }>,
      sale: Sale
    ) => {
      const month = new Date(sale.weekEnding).toLocaleString("en-US", {
        month: "short",
      });

      if (!acc[month]) {
        acc[month] = { retailSales: 0, wholesaleSales: 0 };
      }

      acc[month].retailSales += sale.retailSales;
      acc[month].wholesaleSales += sale.wholesaleSales;

      return acc;
    },
    {}
  );

  // Transform the grouped data into an array for the chart
  const chartDataArray = Object.entries(chartData).map(([month, sales]) => ({
    date: month,
    retailSales: sales.retailSales,
    wholesaleSales: sales.wholesaleSales,
  }));

  const tableRows = data?.sales.slice(0, 12).map((sale: Sale) => (
    <Table.Tr key={sale.weekEnding}>
      <Table.Td>{sale.weekEnding}</Table.Td>
      <Table.Td>{sale.retailSales}</Table.Td>
      <Table.Td>{sale.wholesaleSales}</Table.Td>
      <Table.Td>{sale.unitsSold}</Table.Td>
      <Table.Td>{sale.retailerMargin}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Grid>
      <Grid.Col order={{ base: 12, sm: 4, lg: 3 }} span={4}>
        <Paper shadow="sm" h="100%" bg="#fff" w="100%">
          <SideBar data={data} />
        </Paper>
      </Grid.Col>

      <Grid.Col order={{ base: 12, sm: 8, lg: 9 }} span={8}>
        <Flex direction="column" rowGap="sm">
          <Paper shadow="sm" p="md" h="100%" bg="#fff">
            <Text inherit component="span">
              Retail Sales
            </Text>
            <LineChart
              h={300}
              data={chartDataArray}
              dataKey="date"
              series={[
                { color: "indigo.6", name: "retailSales" },
                {
                  color: "blue.6",
                  name: "wholesaleSales",
                },
              ]}
              curveType="natural"
            />
          </Paper>
          <Paper shadow="sm" p="md" h="100%" bg="#fff">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Week Ending</Table.Th>
                  <Table.Th>Retail Sales</Table.Th>
                  <Table.Th>Wholesale Sales</Table.Th>
                  <Table.Th>Units Sold</Table.Th>
                  <Table.Th>Retailer Margin</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{tableRows}</Table.Tbody>
            </Table>
          </Paper>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default DataPage;
