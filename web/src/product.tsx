import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  NumberField,
  Show,
  SimpleShowLayout,
  EditButton,
  Edit,
  SimpleForm,
  NumberInput,
  Toolbar,
  SaveButton,
  Create,
} from "react-admin";

const ProductFilters: React.FunctionComponent<any> = (props) => (
  <Filter {...props}>
    <TextInput label="Code" source="code" />
  </Filter>
);

export const ProductList: React.FunctionComponent<unknown> = (props) => {
  return (
    <List {...props} filters={<ProductFilters />} exporter={false}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="code" />
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="price" />
        <NumberField source="stock" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const ProductTitle: React.FunctionComponent<any> = (props) => (
  <span>
    Product{" "}
    {props.record
      ? `"${props.record.name}"`
      : ""}
  </span>
);

export const ProductShow: React.FunctionComponent<any> = (props) => (
  <Show {...props} title={<ProductTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="code" />
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="price" />
      <NumberField source="stock" />
    </SimpleShowLayout>
  </Show>
);

const UserEditToolbar: React.FunctionComponent<any> = (props) => (
  <Toolbar {...props} >
      <SaveButton
        redirect="list"
        submitOnEnter={true}
      />
  </Toolbar>
);

export const ProductEdit: React.FunctionComponent<any> = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="price" />
      <NumberInput source="stock" />
    </SimpleForm>
  </Edit>
)

export const ProductCreate: React.FunctionComponent<any> = (props) => (
  <Create {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput source="code" />
        <TextInput source="name" />
        <TextInput source="description" />
        <NumberInput source="price" />
        <NumberInput source="stock" />
      </SimpleForm>
  </Create>
);
