import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

const ProtectedLayout = (props) => {
return(
    <Fragment>
        <MainNavigation/>
        <main>{props.children}</main>
    </Fragment>
    );
}
export default ProtectedLayout;