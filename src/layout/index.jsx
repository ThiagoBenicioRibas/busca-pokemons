import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

function Layout({ children, termoBusca, aoMudarBusca, onSearch }) {
  return (
    <>
      <Header
        termoBusca={termoBusca}
        aoMudarBusca={aoMudarBusca}
        onSearch={onSearch}
      />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
