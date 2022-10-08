import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import { categoriesReducer } from "./reducers/catgoriesReducer";
import {
  // productDetailsReducer,
  productListReducer,
} from "./reducers/ProductsReducers";

const reducer = combineReducers({
  productList: productListReducer,
  //   productDetails: productDetailsReducer,
  //   categoriesList: categoriesReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
