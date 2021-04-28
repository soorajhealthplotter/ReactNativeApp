import React from "react";
import { View, Text } from "react-native";
import { Colors, DataTable, IconButton } from "react-native-paper";

const Company = () => {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Company Name</DataTable.Title>
          <DataTable.Title numeric>Add Executive</DataTable.Title>
          <DataTable.Title numeric>Show Executive</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Health Guru</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Healthplotter</DataTable.Cell>
          <DataTable.Cell numeric>
            {" "}
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {" "}
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => console.log("Pressed")}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label='1-2 of 6'
        />
      </DataTable>
    </View>
  );
};

export default Company;
