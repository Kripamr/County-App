import { Fragment } from "react";
import { Link } from 'react-router-dom';
import classes from './PublicLayout.module.css';

const PublicLayout = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <Link to='/'>
                    <div className={classes.logo}>React Auth</div>
                </Link>
            </header>
            <main>{props.children}</main>
        </Fragment>
    );
}
export default PublicLayout;