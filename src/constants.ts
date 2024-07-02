export interface Project {
  id: string;
  name: string;
  productPage: string[];
  articlePageText: string;
  articlePage: string[];
  htmlEmail: string;
  pageLink: string;
  productImg: string;
  productImgAltText: string;
  [key: string]: string | string[];
}

export const PopUpVariant = {
  ADD_NEW_PROJECT: "ADD_NEW_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  CONFIRM_PROJECT: "CONFIRM_PROJECT",
};

export const SortProperties = {
  ID: "id",
  PRODUCT_PAGE: "productPage",
  ARTICLE_PAGE: "articlePage",
  NAME: "name",
  HTML_EMAIL: "htmlEmail",
  PAGE_LINK: "pageLink",
};

export const TABLE_HEADERS_PRODUCTS = [
  {
    title: "Name",
    sortProperty: SortProperties.NAME,
  },
  {
    title: "Product page",
    sortProperty: SortProperties.PRODUCT_PAGE,
  },
  {
    title: "Article page",
    sortProperty: SortProperties.ARTICLE_PAGE,
  },
  {
    title: "htmlEmail",
    sortProperty: SortProperties.HTML_EMAIL,
  },
  {
    title: "Page link",
    sortProperty: SortProperties.PAGE_LINK,
  },
];

export const NUM_OF_ROWS_BTNS = [
  {
    numOfRows: 10,
  },
  {
    numOfRows: 15,
  },
  {
    numOfRows: 20,
  },
];
