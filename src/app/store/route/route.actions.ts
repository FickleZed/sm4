import { createAction, props } from "@ngrx/store";
import { Route } from "app/route";

export const setRoute = createAction(
    "[Route] Set Route",
    props<{ route: Route }>()
);

export type RouteActions = typeof setRoute;
