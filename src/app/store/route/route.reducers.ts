import { createReducer, on } from "@ngrx/store";
import { RouteState } from "./route-state";
import { setRoute, RouteActions } from "./route.actions";

export const initialState: RouteState = {
  route: "home"
};

const routeReducer = createReducer(
  initialState,
  on(setRoute, (state, { route }) => ({ ...state, route }))
);

export function reducer(state: RouteState | undefined, action: RouteActions) {
  return routeReducer(state, action);
}
