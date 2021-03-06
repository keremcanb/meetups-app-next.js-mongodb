import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

const Layout = ({ children }) => (
  <div>
    <MainNavigation />
    {/* Wrap all pages */}
    <main className={classes.main}>{children}</main>
  </div>
);

export default Layout;
