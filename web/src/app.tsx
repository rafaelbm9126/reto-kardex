import React from "react";
import { Admin, Resource } from "react-admin";
import { ComposeData } from "./service";
import { ProductList, ProductShow, ProductEdit, ProductCreate } from "./product";
import { Menu } from "./menu";
import { Routes } from './customRoutes';
import PeopleIcon from "@material-ui/icons/Category";


export const App: React.FunctionComponent<unknown> = () => {
  return (
    <Admin customRoutes={Routes} dataProvider={ComposeData()} menu={Menu}>
      <Resource
        name="product"
        list={ProductList}
        show={ProductShow}
        edit={ProductEdit}
        create={ProductCreate}
        icon={PeopleIcon}
      />
    </Admin>
  );
};
